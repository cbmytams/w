import { defaultLocale, locales } from "./config";

const LOCALE_PREFIX = locales.filter((l) => l !== defaultLocale).join("|");

// String.raw keeps the regex backslashes; a plain template literal eats them
// and the inline script then fails to parse.
export const DARK_ROUTE_SCRIPT = String.raw`try{var p=location.pathname.replace(/^\/(${LOCALE_PREFIX})(?=\/|$)/,"")||"/";if(p==="/"||p.startsWith("/contact")){document.documentElement.classList.add("dark")}}catch(e){}`;
