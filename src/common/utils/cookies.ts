import Cookies from "js-cookie";
import { CookieOptions } from "../models/cookie-option";

// Client-side cookie functions
export const setCookieClient = (
  key: string,
  value: string,
  options: CookieOptions = {}
) => {
  const { maxAge, path = "/" } = options;

  Cookies.set(key, value, {
    expires: maxAge ? maxAge / (60 * 60 * 24) : undefined,
    path,
  });
};

export const getCookieClient = (key: string): string | null => {
  const cookieValue = Cookies.get(key);
  if (cookieValue) {
    return cookieValue;
  }
  return null;
};

export const deleteCookieClient = (key: string, path = "/") => {
  Cookies.remove(key, { path });
};
