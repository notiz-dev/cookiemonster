import { isPlatformBrowser } from "@angular/common";
import {
  ComponentRef,
  EmbeddedViewRef,
  OnDestroy,
  PLATFORM_ID,
} from "@angular/core";
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
} from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { map, takeUntil, tap } from "rxjs/operators";
import { BannerComponent } from "./banner/banner.component";
import {
  COOKIECONSENT,
  CookieConsentOptions,
  CookieSelection,
} from "./cookie-consent.types";

@Injectable({
  providedIn: "root",
})
export class CookieConsentService implements OnDestroy {
  private destroy$ = new Subject();
  private ref: ComponentRef<BannerComponent>;
  selection$ = new BehaviorSubject<CookieSelection>(null);
  constructor(
    @Inject(COOKIECONSENT) private options: CookieConsentOptions,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const state = JSON.parse(localStorage.getItem(COOKIECONSENT.toString()));
    this.selection$.next(state);
    if (!state) {
      this.showConsent();
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.ref) {
      this.ref.destroy();
    }
    this.selection$.complete();
  }

  showConsent() {

    if (this.ref) {
      this.ref.destroy();
    }
    this.ref = this.componentFactoryResolver
      .resolveComponentFactory(BannerComponent)
      .create(this.injector);
    this.ref.instance.options = this.options;
    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.ref.hostView);

    // 3. Get DOM element from component
    const domElem = (this.ref.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);

    this.ref.instance.select$
      .pipe(
        tap((selection) => this.saveSelection(selection)),
        tap(() => this.ref.destroy()),
        tap(() => (this.ref = null)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private saveSelection(selection: CookieSelection) {
    localStorage.setItem(COOKIECONSENT.toString(), JSON.stringify(selection));
    this.selection$.next(selection);
  }

  accepted$(cookie: string) {
    return this.selection$.pipe(map((s) => !!(s && s[cookie])));
  }

  updateOptions(options: Partial<CookieConsentOptions>) {
    if (this.ref) {
      this.ref.destroy();
    }
    this.options = { ...this.options, ...options };
    if (this.ref) {
      this.ref = null;
      this.showConsent();
    }
  }

  deleteConsent() {
    this.saveSelection(null);
  }
}
