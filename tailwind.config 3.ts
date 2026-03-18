const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: ["col-span-2", "fixed", "inset-0", "overflow-hidden"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        ui: ["var(--font-ui)", "-apple-system", "sans-serif"],
      },
    },
  },
};

export default config;
