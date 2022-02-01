import { isPlatformBrowser } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  ComponentRef,
  EmbeddedViewRef,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { BannerComponent } from './banner/banner.component';
import {
  COOKIE_CONSENT_OPTIONS,
  CookieConsentOptions,
  CookieSelection,
  CookieSelectionOption,
} from './cookie-consent.types';
import { loadCookieSelection } from './utils/localstorage';

@Injectable({
  providedIn: 'root',
})
export class CookieConsentService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private ref: ComponentRef<BannerComponent> | null = null;
  private _cookieSelection$ = new BehaviorSubject<CookieSelection | null>(null);

  get cookieSelection$(): Observable<CookieSelection | null> {
    return this._cookieSelection$.asObservable();
  }

  get cookieSelectionSnapshot(): CookieSelection | null {
    return this._cookieSelection$.getValue();
  }

  // TODO refactor ComponentFactoryResolver, ViewContainerRef doesn't work in service
  constructor(
    @Inject(COOKIE_CONSENT_OPTIONS) private options: CookieConsentOptions,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const state = loadCookieSelection(
      this.options.cookieConsentLocalStorageKey!
    );
    this._cookieSelection$.next(state);
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
    this._cookieSelection$.complete();
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
        tap(() => this.ref?.destroy()),
        tap(() => (this.ref = null)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private saveSelection(selection: CookieSelection | null) {
    localStorage.setItem(
      this.options.cookieConsentLocalStorageKey!,
      JSON.stringify(selection)
    );
    this._cookieSelection$.next(selection);
  }

  accepted$(cookie: CookieSelectionOption): Observable<boolean> {
    return this._cookieSelection$.pipe(map((s) => !!(s && s[cookie])));
  }

  acceptedSnapshot(cookie: CookieSelectionOption) {
    const consent = this._cookieSelection$.getValue();
    return !!(consent && consent[cookie]);
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
