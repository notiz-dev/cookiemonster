import { InjectionToken } from "@angular/core";

export interface CookieConsentOptions {
  title: string;
  message: string;
  acceptAllLabel: string;
  acceptSelectionLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
  links: Link[];
  cookies: {
    necessary?: Cookie;
    functional?: Cookie;
    statistics?: Cookie;
    marketing?: Cookie;
    [key: string]: Cookie;
  };
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

export const COOKIECONSENT = new InjectionToken<CookieConsentOptions>(
  "COOKIECONSENT"
);

export interface CookieSelection {
  necessary?: boolean;
  functional?: boolean;
  statistics?: boolean;
  marketing?: boolean;
  [key: string]: boolean;
}
