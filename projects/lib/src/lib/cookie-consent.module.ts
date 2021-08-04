import { CookieConsentService } from './cookie-consent.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CookieConsentOptions,
  cookieConsentOptionsFactory,
  COOKIE_CONSENT_OPTIONS,
  USER_OPTIONS,
} from './cookie-consent.types';
import { BannerModule } from './banner/banner.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BannerModule],
})
export class CookieConsentModule {
  constructor(private cookieConsent: CookieConsentService) {}
  static forRoot(
    options: CookieConsentOptions
  ): ModuleWithProviders<CookieConsentModule> {
    return {
      ngModule: CookieConsentModule,
      providers: [
        {
          provide: USER_OPTIONS,
          useValue: options,
        },
        {
          provide: COOKIE_CONSENT_OPTIONS,
          useFactory: cookieConsentOptionsFactory,
          deps: [USER_OPTIONS],
        },
      ],
    };
  }
}
