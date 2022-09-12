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
    class="rounded-md w-full max-w-5xl shadow-lg space-y-3 p-4 cc-banner"
  >
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-semibold cc-title">{{ options?.title }}</h3>

      <button
        (click)="acceptAll()"
        [disabled]="!expanded"
        [ngClass]="{ 'opacity-0': !expanded }"
        type="button"
        class="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none cc-button cc-button-primary"
      >
        {{ options?.acceptAllLabel }}
      </button>
    </div>
    <p class="max-w-4xl cc-message">{{ options?.message }}</p>
    <div class="flex flex-wrap sm: space-x-2">
      <a
        *ngFor="let link of options?.links"
        class="inline-flex items-center space-x-1 cc-link"
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
      class="block transition-all duration-400 ease overflow-hidden cc-form"
      [ngClass]="{
        'max-h-0': !expanded,
        'max-h-[9999px]': expanded
      }"
      [formGroup]="formGroup!"
    >
      <div
        class="space-y-4 lg:space-y-0 py-4 lg:grid lg:grid-cols-2 cc-cookie-list"
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
          class="flex items-start space-x-4 max-w-2xl cursor-pointer px-2 py-1 rounded-md cc-cookie-item focus:outline-none"
        >
          <cc-toggle
            #toggle
            class="mt-2"
            [formControlName]="cookie.name"
          ></cc-toggle>
          <div
            class="flex-grow flex flex-col text-left "
            id="availability-label"
          >
            <span class="text-sm font-medium cc-cookie-item-title">{{
              cookie.title
            }}</span>
            <span class="text-sm cc-cookie-item-label">{{ cookie.label }}</span>
          </div>
        </button>
      </div>
      <button
        type="button"
        (click)="expanded = false"
        class="flex items-center space-x-4 cc-show-less focus:outline-none hover:opacity-80"
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
      class="sticky bottom-0 border-t py-2 flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-3 cc-button-container"
    >
      <button
        (click)="acceptAll()"
        type="button"
        class="inline-flex justify-center items-center md:px-4 py-3 md:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none cc-button cc-button-primary"
      >
        {{ options?.acceptAllLabel }}
      </button>
      <button
        (click)="secondaryAction()"
        type="button"
        class="inline-flex justify-center items-center md:px-4 py-3 md:py-2 border text-sm font-medium rounded-md focus:outline-none cc-button cc-button-secondary"
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
