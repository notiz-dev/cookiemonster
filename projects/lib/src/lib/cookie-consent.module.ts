import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieConsentOptions, COOKIECONSENT } from './cookie-consent.types';
import { CookieConsentService } from './cookie-consent.service';
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
          provide: COOKIECONSENT,
          useValue: options,
        },
      ],
    };
  }
}
