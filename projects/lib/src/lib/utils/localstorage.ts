import { CookieSelection } from '../cookie-consent.types';

export function loadCookieSelection(
  cookieConsentLocalStorageKey: string
): CookieSelection | null {
  const consentString = loadCookieSelectionFromStorage(
    cookieConsentLocalStorageKey
  );
  if (consentString) {
    return JSON.parse(consentString);
  }
  return null;
}

function loadCookieSelectionFromStorage(
  cookieConsentLocalStorageKey: string
): string | null {
  return localStorage.getItem(cookieConsentLocalStorageKey);
}
