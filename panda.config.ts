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
    "html": {
      scrollBehavior: "smooth",
    },
    "body": {
      bg: "sz.bg",
    },
    // スクロールバーのスタイル
    "::-webkit-scrollbar": {
      width: "10px",
      height: "10px",
    },
    "::-webkit-scrollbar-thumb": {
      bg: "sz.primary/30",
      _hover: {
        bg: "sz.primary/50",
      },
    },
    "::-webkit-scrollbar-thumb:active": {
      bg: "sz.primary/60",
      transition: "background-color 0.3s ease-in-out",
    },
    ".markdown-content": {
      "h1, h2, h3, h4, h5, h6": {
        fontWeight: "bold",
        my: "5",
        scrollMarginTop: "28",
      },
      "h1": {
        fontSize: "4xl",
        borderBottomWidth: "2",
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
        borderWidth: "1",
        borderColor: "sz.border",
      },
      "kbd": {
        display: "inline-block",
        px: "2",
        py: "1",
        fontSize: "sm",
        fontFamily: "monospace",
        fontWeight: "semibold",
        lineHeight: "1",
        color: "sz.text.main",
        bg: "sz.bg-on",
        borderWidth: "1",
        borderColor: "sz.border",
        borderBottomWidth: "2",
        borderRadius: "md",
        shadow: "sm",
        whiteSpace: "nowrap",
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
      "ol": {
        my: "2",
        pl: "6",
        "li": {
          listStyleType: "decimal",
          "&:has(input[type='checkbox'])": {
            listStyleType: "none",
            ml: "-6"
          },
        },
      },
      "table": {
        width: "full",
        "thead": {
          "tr": {
            bgColor: "sz.bg-on",
            borderBottomWidth: "1",
            borderBottomColor: "sz.border",
            "th": {
              p: "3",
              fontWeight: "bold",
              textAlign: "left",
            }
          }
        },
        "tbody": {
          "tr": {
            bgColor: "sz.bg",
            borderBottomWidth: "1",
            borderBottomColor: "sz.border",
            "td": {
              p: "2",
            }
          }
        },
      },

      "blockquote": {
        bgColor: "sz.bg-on",
        borderLeftWidth: "4",
        borderLeftColor: "sz.primary/60",
        my: "8",
        px: "4",
        py: "2",
        shadow: "md",
        fontStyle: "italic",
      },
      "details": {
        mt: "4",
        mb: "6",
        "summary": {
          mb: "3",
          cursor: "pointer",
          fontWeight: "normal",
        }
      },
      "hr": {
        borderColor: "sz.border",
        my: "8",
      },
      "mark": {
        bg: "sz.primary/20",
        px: "1",
        py: "0.25",
        borderRadius: "sm",
      },
      "img": {
        rounded: "lg",
        my: "4",
        w: "auto",
        h: "auto",
        maxH: "600px"
      },

      // rehype-autolink-headingsのアンカーリンク
      ".heading-anchor": {
        marginRight: ".5rem",
        backgroundImage: "linear-gradient(to right in oklch, {colors.s-primary}, {colors.s-secondary})",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        transition: "opacity 0.2s ease-in-out",
        _hover: {
          backgroundImage: "linear-gradient(to right in oklch, {colors.s-primary/60}, {colors.s-secondary/60})",
        },
      },

      // Expressiveのコードブロック
      ".expressive-code": {
        my: "4",
      },

      // リンクの埋め込み
      ".link-card": {
        my: "6",
        border: "1px solid",
        borderColor: "sz.border",
        rounded: "md",
        maxH: "200px",
        transition: "background-color 0.1s ease",
        bgColor: "sz.bg",
        overflow: "hidden",
        "&:hover": {
          bgColor: "sz.bg-on.500",
        },
        _sm: {
          flexDirection: "column",
          maxH: "none",
          width: "100%",
          maxW: "100%",
        },
        "a": {
          display: "block",
          height: "100%",
          width: "100%",
          color: "sz.text.main",
          transition: "color 0.2s ease",
          "&:hover": {
            textDecoration: "none",
          },
        }
      },
      ".link-card-content": {
        display: "flex",
        p: "4",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: "1",
        _sm: {
          w: "full",
        },
        "h4": {
          m: "0 0 0.5rem 0",
          fontSize: "1.1rem",
          fontWeight: "bold",
          lineHeight: "1.4",
          color: "sz.text.main",
        },
      },
      ".link-card-site": {
        display: "flex",
        fontSize: "0.8rem",
      },
      ".link-card-grid": {
        ".link-card-grid-container": {
          display: "flex",
          flexDirection: "row",
          gap: "0.5rem",
          overflow: "hidden",
          height: "100%",
          _sm: {
            flexDirection: "column",
          },
        },
        ".link-card-image-container": {
          display: "flex",
          flexShrink: "0",
          width: "auto",
          height: "200px",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          _sm: {
            width: "100%",
            height: "250px",
          },
          "img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            margin: "0",
            borderRadius: "0",
          },
        },
        ".no-image": {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bg: "sz.bg-on",
          color: "sz.border",
          fontSize: "0.8rem",
        },
      },
    },
    "img.emoji": {
      display: "inline",
      height: "1em",
      width: "1em",
      verticalAlign: "-0.1em",
      rounded: "0",
      my: "0",
    },
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
    },
    twemoji: {
      src: "src('/fonts/twemoji.woff2') format('woff2')",
      fontWeight: "400",
      fontStyle: "normal",
      fontDisplay: "swap",
    }
  },
  globalVars: {
    "--ibm-plex-sans-jp": '"IBM Plex Sans JP", -apple-system, system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif',
    "--moralerspace-neon": '"Moralerspace Neon", -apple-system, system-ui, sans-serif',
  },
  
  conditions: {
    sm: "@media (max-width: 640px)",
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
          // Callout colors
          "callout-blue": { value: "#3951e2" },
          "callout-cyan": { value: "#0096d4" },
          "callout-green": { value: "#00a87a" },
          "callout-orange": { value: "#ff8365" },
          "callout-red": { value: "#ff4991" },
          "callout-purple": { value: "#d13ac2" },
          "callout-gray": { value: "#aca9bb" },
        }
      },
      semanticTokens: {
        colors: {
          "sz.primary": { value: "{colors.s-primary}" },
          "sz.secondary": { value: "{colors.s-secondary}" },
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
