import { Component, HostBinding } from "@angular/core";
import { CookieConsentService } from "lib";

@Component({
  selector: "app-root",
  template: `
    <button
      type="button"
      class="inline-flex capitalize items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      (click)="cookies.showConsent()"
    >
      reopen cookie consent
    </button>

    <button
      type="button"
      class="ml-4 inline-flex capitalize items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      (click)="cookies.deleteConsent()"
    >
      delete consent
    </button>
    <div class="flex flex-row space-x-3 items-center">
      <button
        (click)="theme()"
        class="inline-flex h-6 w-10 rounded-full overflow-hidden focus:outline-none"
      >
        <span class="bg-gray-800 flex-grow h-full"></span>
        <span class="bg-green-500 flex-grow h-full"></span>
      </button>
      <button
        (click)="theme('indigo-light')"
        class="inline-flex h-6 w-10 rounded-full overflow-hidden focus:outline-none"
      >
        <span class="bg-gray-100 flex-grow h-full"></span>
        <span class="bg-indigo-500 flex-grow h-full"></span>
      </button>
      <button
        (click)="theme('orange-dark')"
        class="inline-flex h-6 w-10 rounded-full overflow-hidden focus:outline-none"
      >
        <span class="bg-gray-800 flex-grow h-full"></span>
        <span class="bg-yellow-600 flex-grow h-full"></span>
      </button>
      <button
        (click)="theme('blue')"
        class="inline-flex h-6 w-10 rounded-full overflow-hidden focus:outline-none"
      >
        <span class="bg-blue-200 flex-grow h-full"></span>
        <span class="bg-blue-800 flex-grow h-full"></span>
      </button>
    </div>
    <ul>
      <li>Functional: {{ cookies.accepted$("functional") | async }}</li>
      <li>Statistics: {{ cookies.accepted$("statistics") | async }}</li>
    </ul>

    <pre>

    {{ (cookies.selection$ | async) || "no consent yet" | json }}

    </pre
    >
  `,
})
export class AppComponent {
  @HostBinding("class") class = "block p-8 space-y-6";
  constructor(public cookies: CookieConsentService) {}

  updateOptions() {
    this.cookies.updateOptions({
      title: "Gimme Cookies...",
      cookies: {
        necessary: {
          title: "Wow",
          label: "We need this",
          disabled: true,
          value: true,
        },
      },
    });
  }

  theme(theme: string = "") {
    document.body.className = theme;
  }
}
