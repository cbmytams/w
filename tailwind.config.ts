const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: ["col-span-2", "fixed", "inset-0", "overflow-hidden"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        ui: ["var(--font-ui)", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
    },
  },
};

export default config;
