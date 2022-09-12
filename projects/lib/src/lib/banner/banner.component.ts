import { Component, HostBinding, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  Cookie,
  CookieConsentOptions,
  CookieSelection,
} from '../cookie-consent.types';
import { loadCookieSelection } from '../utils/localstorage';

@Component({
  selector: 'cc-banner',
  template: ` <div
    class="cc-banner w-full max-w-5xl space-y-3 rounded-md p-4 shadow-lg"
  >
    <div class="flex items-center justify-between">
      <h3 class="cc-title text-lg font-semibold">{{ options?.title }}</h3>

      <button
        (click)="acceptAll()"
        [disabled]="!expanded"
        [ngClass]="{ 'opacity-0': !expanded }"
        type="button"
        class="cc-button cc-button-primary hidden items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:outline-none md:inline-flex"
      >
        {{ options?.acceptAllLabel }}
      </button>
    </div>
    <p class="cc-message max-w-4xl">{{ options?.message }}</p>
    <div class="sm: flex flex-wrap space-x-2">
      <a
        *ngFor="let link of options?.links"
        class="cc-link inline-flex items-center space-x-1"
        [href]="link.url"
        target="_blank"
        rel="noopener"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        <span class="text-sm">{{ link.label }}</span></a
      >
    </div>

    <form
      [attr.hidden]="!expanded"
      class="duration-400 ease cc-form block overflow-hidden transition-all"
      [ngClass]="{
        'max-h-0': !expanded,
        'max-h-[9999px]': expanded
      }"
      [formGroup]="formGroup!"
    >
      <div
        class="cc-cookie-list space-y-4 py-4 lg:grid lg:grid-cols-2 lg:space-y-0"
      >
        <button
          type="button"
          [disabled]="cookie.disabled"
          (click)="toggle.writeValue(!toggle.value)"
          [ngClass]="{
            'hover:bg-gray-200': !cookie.disabled,
            'cursor-not-allowed': cookie.disabled
          }"
          *ngFor="let cookie of cookies"
          class="cc-cookie-item flex max-w-2xl cursor-pointer items-start space-x-4 rounded-md px-2 py-1 focus:outline-none"
        >
          <cc-toggle
            #toggle
            class="mt-2"
            [formControlName]="cookie.name"
          ></cc-toggle>
          <div
            class="flex flex-grow flex-col text-left "
            id="availability-label"
          >
            <span class="cc-cookie-item-title text-sm font-medium">{{
              cookie.title
            }}</span>
            <span class="cc-cookie-item-label text-sm">{{ cookie.label }}</span>
          </div>
        </button>
      </div>
      <button
        type="button"
        (click)="expanded = false"
        class="cc-show-less flex items-center space-x-4 hover:opacity-80 focus:outline-none"
      >
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ options?.showLessLabel }}</span>
      </button>
    </form>
    <div
      class="cc-button-container sticky bottom-0 flex flex-col space-y-3 border-t py-2 md:flex-row md:space-y-0 md:space-x-3"
    >
      <button
        (click)="acceptAll()"
        type="button"
        class="cc-button cc-button-primary inline-flex items-center justify-center rounded-md border border-transparent py-3 text-sm font-medium shadow-sm focus:outline-none md:px-4 md:py-2"
      >
        {{ options?.acceptAllLabel }}
      </button>
      <button
        (click)="secondaryAction()"
        type="button"
        class="cc-button cc-button-secondary inline-flex items-center justify-center rounded-md border py-3 text-sm font-medium focus:outline-none md:px-4 md:py-2"
      >
        {{ expanded ? options?.acceptSelectionLabel : options?.showMoreLabel }}
      </button>
    </div>
  </div>`,
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @HostBinding('class') class =
    'fixed max-h-screen overflow-y-auto bottom-0 left-0 right-0 p-1 md:p-4 cc-banner-container';
  select$ = new Subject<CookieSelection>();
  formGroup: UntypedFormGroup | null = null;
  expanded = false;
  cookies: (Cookie & { name: string })[] = [];
  public options: CookieConsentOptions | null = null;
  constructor() {}

  ngOnInit(): void {
    const cookies: { [name: string]: UntypedFormControl } = {};
    const state: CookieSelection =
      loadCookieSelection(this.options!.cookieConsentLocalStorageKey!) || {};
    Object.keys(this.options!.cookies).forEach((c) => {
      const cookie = this.options!.cookies[c]!;
      cookies[c] = new UntypedFormControl({
        value: state[c] || cookie?.value || false,
        disabled: cookie?.disabled,
      });
      this.cookies.push({ ...cookie, name: c });
    });
    this.formGroup = new UntypedFormGroup(cookies);
  }

  acceptAll() {
    const result: CookieSelection = {};
    this.cookies.forEach((c) => {
      result[c.name] = true;
    });
    this.select$.next(result);
  }

  secondaryAction() {
    if (this.expanded) {
      const result: CookieSelection = {};
      Object.keys(this.formGroup!.controls).forEach(
        (c) => (result[c] = this.formGroup!.get(c)!.value)
      );
      this.select$.next(result);
    } else {
      this.expanded = true;
    }
  }
}
