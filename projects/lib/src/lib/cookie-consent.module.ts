import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CookieConsentOptions,
  COOKIE_CONSENT_OPTIONS,
} from './cookie-consent.types';
import { BannerModule } from './banner/banner.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BannerModule],
})
export class CookieConsentModule {
  constructor() {}
  static forRoot(
    options: CookieConsentOptions
  ): ModuleWithProviders<CookieConsentModule> {
    return {
      ngModule: CookieConsentModule,
      providers: [
        {
          provide: COOKIE_CONSENT_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
