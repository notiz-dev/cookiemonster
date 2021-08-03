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

3. Cookie Consent checks the browser [LocalStorage](#cookie-consent), if the consent is not saved it will open up automatically.

4. Use `CookieConsentService` to show and delete the consent, access the cookie selection or pick out one cookie:

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

  cookieSelection$(): Observable<CookieSelection> {
    return this.cookies.cookieSelection$();
  }

  cookieSelectionSnapshot(): CookieSelection {
    return this.cookies.cookieSelectionSnapshot();
  }

  acceptedCookie$(): Observable<boolean> {
    return this.cookies.accepted$('necessary');
  }

  acceptedCookieSnapshot(): boolean {
    return this.cookies.acceptedSnapshot('statistics');
  }
}
```

## Cookie Consent

The cookie consent is saved to the browser LocalStorage as JSON Object. Access the cookie consent in the LocalStorage by reading it with the default key `COOKIE_CONSENT`.

```ts
import { COOKIE_CONSENT_STORAGE_KEY } from @garygrossgarten/cookie-monster;

readCookieConsent() {
  // default key is COOKIE_CONSENT_STORAGE_KEY = "COOKIE_CONSENT"
  const cookieConsentJSON = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  const cookieConsent = JSON.parse(cookieConsentJSON);

  // access cookieConsent
}
```

`CookieConsentOptions` allows you to change the LocalStorage key for the cookie consent by using `cookieConsentLocalStorageKey`:

```ts
// cookie.config.ts
import { CookieConsentOptions } from '@garygrossgarten/cookie-monster';

export const cookieConfig: CookieConsentOptions = {
  title: 'We use cookies 🍪',
  cookieConsentLocalStorageKey: 'cookiemonster'
  ...
};
```

## Theme

Change the theme with the CSS variables below.

```css
cc-banner {
  --cc-background: theme(colors.gray.100);
  --cc-background-shade: theme(colors.gray.300);
  --cc-title-color: theme(colors.gray.900);
  --cc-color: theme(colors.gray.700);
  --cc-link-color: theme(colors.gray.600);
  --cc-primary: theme(colors.indigo.500);
  --cc-primary-hover: theme(colors.indigo.600);
  --cc-primary-color: theme(colors.gray.50);
  --cc-secondary: var(--colors.gray.300);
  --cc-secondary-hover: theme(colors.gray.200);
  --cc-secondary-color: theme(colors.gray.800);
}
```

If you are using Tailwind in your project include the Cookie Banner in the purge list:

```js
//tailwind.config.js
module.exports = {
  purge: [
    './src/**/*.{html,ts}', // your purge config
    './node_modules/@garygrossgarten/cookie-monster/esm2015/**/*.js', // 👈 cookie banner component
  ],
  theme: {},
};
```

## Development

Start the demo project

```bash
ng s demo
```