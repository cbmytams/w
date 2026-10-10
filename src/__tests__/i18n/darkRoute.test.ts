import { DARK_ROUTE_SCRIPT } from "@/i18n/dark-route-script";

function isDark(pathname: string) {
  const classes = new Set<string>();
  const documentElement = {
    classList: { add: (name: string) => classes.add(name) },
  };
  new Function("location", "document", DARK_ROUTE_SCRIPT)(
    { pathname },
    { documentElement }
  );
  return classes.has("dark");
}

describe("DARK_ROUTE_SCRIPT", () => {
  it.each([
    "/",
    "/en",
    "/es",
    "/zh",
    "/contact/brands",
    "/en/contact",
    "/zh/contact/talents",
  ])("darkens %s", (pathname) => expect(isDark(pathname)).toBe(true));

  it.each(["/legal/mentions", "/en/legal/privacy", "/engine"])(
    "leaves %s light",
    (pathname) => expect(isDark(pathname)).toBe(false)
  );
});
