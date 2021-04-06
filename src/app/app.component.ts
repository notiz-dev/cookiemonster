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
      (click)="updateOptions()"
    >
      update options
    </button>

    <button
      type="button"
      class="ml-4 inline-flex capitalize items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      (click)="cookies.deleteConsent()"
    >
      delete consent
    </button>
    
    <button
      type="button"
      class="ml-4 inline-flex capitalize items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      (click)="toggleTheme()"
    >
      toggle theme
    </button>
    <ul>
      <li>Functional: {{ cookies.accepted$("functional") | async }}</li>
      <li>Statistics: {{ cookies.accepted$("statistics") | async }}</li>
    </ul>

    <pre>

    {{ (cookies.selection$ | async) || "no consent yet" | json }}

    </pre
    >
  `
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

  toggleTheme(){
    document.body.classList.toggle('custom-theme')
  }
}
