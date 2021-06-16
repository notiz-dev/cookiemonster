# CookieConsent

A customizable Cookie Consent Banner 🍪 for Angular. Built with Tailwind CSS. GDPR & EU ready! (⚠️ WIP)

Consent is saved to the Browsers LocalStorage.

## Getting started

1. Install motion package

```bash
npm i @garygrossgarten/cookie-monster
```

2. Import `CookieConsentModule` into your component module

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { CookieConsentModule } from '@garygrossgarten/cookie-monster';
import { cookieConfig } from './cookie.config';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CookieConsentModule.forRoot(cookieConfig)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

and create your own `CookieConsentOptions` and fill in your text, links and cookie options.

```ts
// cookie.config.ts
import { CookieConsentOptions } from '@garygrossgarten/cookie-monster';

export const cookieConfig: CookieConsentOptions = {
  title: 'We use cookies 🍪',
  message: `We use cookies to improve your experience and for marketing.`,
  links: [
    { label: 'Cookie policy', url: 'http://localhost.4200/cookie-policy' },
    { label: 'Privacy Policy', url: 'http://localhost.4200/privacy-policy' },
  ],
  acceptAllLabel: 'Accept all',
  acceptSelectionLabel: 'Accept selection',
  showMoreLabel: 'More options',
  showLessLabel: 'Show less',
  cookies: {
    necessary: {
      title: 'Necessary Cookies',
      label: 'These cookies are needed for the site to function correctly.',
      value: true,
      disabled: true,
    },
    functional: {
      title: 'Functional cookies',
      label:
        'Functional cookies make it possible to save information that changes the way the website appears or acts.',
    },
    statistics: {
      title: 'Statistics',
      label:
        'Statistical cookies help the website owner understand how visitors interact with the website by collecting and reporting information.',
    },
    marketing: {
      title: 'Marketing',
      label:
        "Marketing / targeting cookies are usually used to show you ads that match your interests. When you visit another website, your browser's cookie is recognized and selected ads are displayed to you based on the information stored in this cookie (Art. 6 para. 1 p. 1 a) DSGVO).",
    },
  },
};
```

3. Cookie Consent checks the browser LocalStorage, if the consent is not saved it will open up automatically.

4. Use `CookieConsentService` to reopen and delete the consent

```ts
import { Component } from '@angular/core';
import { CookieConsentService } from '@garygrossgarten/cookie-monster';

@Component({
  selector: 'app-root',
  templateUrl: '...',
})
export class AppComponent {
  constructor(public cookies: CookieConsentService) {}

  showCookieConsent() {
    this.cookies.showConsent();
  }

  deleteCookieConsent() {
    this.cookies.deleteConsent();
  }
}
```
