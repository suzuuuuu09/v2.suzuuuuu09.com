import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx,astro}", "./pages/**/*.{js,jsx,ts,tsx,astro}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          "s-primary": { value: "#3951E2" },
          "s-bg": { value: "#faf8ff" },
          "s-bg-on": { value: "#F0F0F0" },
        }
      },
      semanticTokens: {
        colors: {
          "s.brand": { value: "{colors.s-primary}" },
          "s.bg": { value: "{colors.s-bg}" },
          "s.bg-on": {
            DEFAULT: { value: "{colors.s-bg-on}" },
            100: { value: "#f1f1f1" },
            500: { value: "#f4f2f5" },
            800: { value: "#f5f3f7" },
          },
          "s.text.main": { value: "#474554" }
        },
      }
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
  jsxFramework: "react",
});
