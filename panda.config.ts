import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx,astro}", "./pages/**/*.{js,jsx,ts,tsx,astro}"],

  // Files to exclude
  exclude: [],
  
  globalCss: {
    ":root": {
      fontFamily: "var(--ibm-plex-sans-jp)",
    },
    "body": {
      bg: "sz.bg",
    },
    ".markdown-content": {
      "h1, h2, h3, h4, h5, h6": {
        fontWeight: "bold",
        my: "5",
        scrollMarginTop: "28",
      },
      "h1": {
        fontSize: "4xl",
        borderBottom: "2",
        borderBottomColor: "sz.border",
        pb: "1",
      },
      "h2": {
        fontSize: "3xl",
        borderBottomWidth: "1",
        borderBottomColor: "sz.border",
        pb: "1",
      },
      "h3": {
        fontSize: "2xl",
      },
      "h4": {
        fontSize: "xl",
      },
      "h5": {
        fontSize: "lg",
      },
      "h6": {
        fontSize: "md",
      },
      "a": {
        color: "sz.primary",
        _hover: {
          textDecoration: "underline",
          "&:has(.heading-anchor)": {
            textDecoration: "none",
          },
        }
      },

      "p": {
        my: "2",
        "code": {
          fontSize: "base",
        }
      },
      "code": {
        px: "1",
        py: "0.25",
        bg: "sz.bg-on",
        borderRadius: "md",
      },

      "ul": {
        my: "2",
        pl: "6",
        "li": {
          listStyleType: "disc",
          "&:has(input[type='checkbox'])": {
            listStyleType: "none",
            ml: "-6"
          },
        },
        "ul": {
          "li": {
            listStyleType: "circle",
            "ul": {
              listStyleType: "square",
              "> li": {
                listStyleType: "square",
                ml: "2",
              }
            }
          }
        }
      },

      ".heading-anchor": {
        marginRight: ".5rem",
        backgroundImage: "linear-gradient(to right in oklch, {colors.s-primary/60}, {colors.s-secondary/60})",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        transition: "opacity 0.2s ease-in-out",
        _hover: {
          backgroundImage: "linear-gradient(to right in oklch, {colors.s-primary}, {colors.s-secondary})",
        },
      }
    }
  },

  // フォントの設定
  globalFontface: {
    "IBM Plex Sans JP": [
      {
        src: "url('/fonts/IBMPlexSansJP-Regular.ttf') format('truetype')",
        fontWeight: "400",
        fontStyle: "normal",
        fontDisplay: "swap",
      },
      {
        src: "url('/fonts/IBMPlexSansJP-Bold.ttf') format('truetype')",
        fontWeight: "700",
        fontStyle: "normal",
        fontDisplay: "swap",
      }
    ],
    "Moralerspace Neon": {
      src: "url('/fonts/MoralerspaceNeon-Regular.ttf') format('truetype')",
      fontWeight: "400",
      fontStyle: "normal",
      fontDisplay: "swap",
    }
  },
  globalVars: {
    "--ibm-plex-sans-jp": '"IBM Plex Sans JP", -apple-system, system-ui, sans-serif',
    "--moralerspace-neon": '"Moralerspace Neon", -apple-system, system-ui, sans-serif',
  },

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          "s-primary": { value: "#3951E2" },
          "s-secondary": { value: "#6bbaa3" },
          "s-bg": { value: "#faf8ff" },
          "s-bg-on": { value: "#F0F0F0" },
        }
      },
      semanticTokens: {
        colors: {
          "sz.primary": { value: "{colors.s-primary}" },
          "sz.bg": { value: "{colors.s-bg}" },
          "sz.bg-on": {
            DEFAULT: { value: "{colors.s-bg-on}" },
            100: { value: "#f1f1f1" },
            500: { value: "#f4f2f5" },
            800: { value: "#f5f3f7" },
          },
          "sz.text.main": { value: "#474554" },
          "sz.border": { value: "{colors.gray.300}" },
        },
      }
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
  jsxFramework: "react",
});
