import { InjectionToken } from '@angular/core';

export interface CookieConsentOptions {
  title: string;
  message: string;
  acceptAllLabel: string;
  acceptSelectionLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
  links: Link[];
  cookieConsentLocalStorageKey?: string | undefined;
  cookies: Cookies;
}

export interface Cookies {
  necessary?: Cookie;
  functional?: Cookie;
  statistics?: Cookie;
  marketing?: Cookie;
  [key: string]: Cookie | undefined;
}

export interface Cookie {
  title: string;
  label: string;
  value?: boolean;
  disabled?: boolean;
}

export interface Link {
  label: string;
  url: string;
}

export const COOKIE_CONSENT_STORAGE_KEY = 'COOKIE_CONSENT';

export const USER_OPTIONS = new InjectionToken<CookieConsentOptions>(
  'USER_OPTIONS'
);
export const COOKIE_CONSENT_OPTIONS = new InjectionToken<CookieConsentOptions>(
  'COOKIE_CONSENT_OPTIONS'
);

export interface CookieSelection {
  necessary?: boolean;
  functional?: boolean;
  statistics?: boolean;
  marketing?: boolean;
  [key: string]: boolean | undefined;
}

export type CookieSelectionOption =
  | 'necessary'
  | 'functional'
  | 'statistics'
  | 'marketing'
  | string;

export function cookieConsentOptionsFactory(options: CookieConsentOptions) {
  if (!options.cookieConsentLocalStorageKey) {
    options.cookieConsentLocalStorageKey = COOKIE_CONSENT_STORAGE_KEY;
  }
  return options;
}
