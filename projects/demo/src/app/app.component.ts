import { Component, HostBinding } from '@angular/core';
import { CookieConsentService } from '@notiz/cookie-monster';

@Component({
  selector: 'app-root',
  template: `
    <button
      type="button"
      class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium capitalize text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      (click)="cookies.showConsent()"
    >
      reopen cookie consent
    </button>

    <button
      type="button"
      class="ml-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium capitalize text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      (click)="cookies.deleteConsent()"
    >
      delete consent
    </button>
    <div class="flex flex-row items-center space-x-3">
      <button
        (click)="theme()"
        class="inline-flex h-6 w-10 overflow-hidden rounded-full focus:outline-none"
      >
        <span class="h-full flex-grow bg-gray-800"></span>
        <span class="h-full flex-grow bg-green-500"></span>
      </button>
      <button
        (click)="theme('indigo-light')"
        class="inline-flex h-6 w-10 overflow-hidden rounded-full focus:outline-none"
      >
        <span class="h-full flex-grow bg-gray-100"></span>
        <span class="h-full flex-grow bg-indigo-500"></span>
      </button>
      <button
        (click)="theme('orange-dark')"
        class="inline-flex h-6 w-10 overflow-hidden rounded-full focus:outline-none"
      >
        <span class="h-full flex-grow bg-gray-800"></span>
        <span class="h-full flex-grow bg-yellow-600"></span>
      </button>
      <button
        (click)="theme('blue')"
        class="inline-flex h-6 w-10 overflow-hidden rounded-full focus:outline-none"
      >
        <span class="h-full flex-grow bg-blue-200"></span>
        <span class="h-full flex-grow bg-blue-800"></span>
      </button>
    </div>
    <ul>
      <li>Functional: {{ cookies.accepted$('functional') | async }}</li>
      <li>Statistics: {{ cookies.accepted$('statistics') | async }}</li>
    </ul>

    <pre>

    {{ (cookies.cookieSelection$ | async) || 'no consent yet' | json }}

    </pre
    >
  `,
})
export class AppComponent {
  @HostBinding('class') class = 'block p-8 space-y-6';
  constructor(public cookies: CookieConsentService) {}

  updateOptions() {
    this.cookies.updateOptions({
      title: 'Gimme Cookies...',
      cookies: {
        necessary: {
          title: 'Wow',
          label: 'We need this',
          disabled: true,
          value: true,
        },
      },
    });
  }

  theme(theme: string = '') {
    document.body.className = theme;
  }
}
