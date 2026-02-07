import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/**/*.{js,jsx,ts,tsx,astro}",
    "./pages/**/*.{js,jsx,ts,tsx,astro}",
  ],

  // Files to exclude
  exclude: [],

  globalCss: {
    html: {
      scrollBehavior: "smooth",
    },
    body: {
      color: "sz.text.main !important",
      bg: "sz.bg !important",
      fontFamily: "var(--ibm-plex-sans-jp) !important",
      fontFeatureSettings: "'plat'",
    },
    // スクロールバーのスタイル
    "::-webkit-scrollbar": {
      width: "10px",
      height: "10px",
    },
    "::-webkit-scrollbar-thumb": {
      bg: "sz.primary/30",
      "&:hover": {
        bg: "sz.primary/50",
      },
    },
    ".markdown-content": {
      color: "sz.text.main",
      "h1, h2, h3, h4, h5, h6": {
        fontWeight: "bold",
        my: "5",
        scrollMarginTop: "28",
        display: "flex",
      },
      h1: {
        fontSize: "3xl",
        borderBottomWidth: "2",
        borderBottomColor: "sz.border",
        pb: "1",
        _lg: {
          fontSize: "4xl",
        },
      },
      h2: {
        fontSize: "2xl",
        borderBottomWidth: "1",
        borderBottomColor: "sz.border",
        mt: "10",
        pb: "1",
        _lg: {
          fontSize: "3xl",
        },
        _sm: {
          mt: "8",
        },
      },
      h3: {
        fontSize: "xl",
        _lg: {
          fontSize: "2xl",
        },
      },
      h4: {
        fontSize: "lg",
        _lg: {
          fontSize: "xl",
        },
      },
      h5: {
        fontSize: "base",
        _lg: {
          fontSize: "lg",
        },
      },
      h6: {
        fontSize: "sm",
        _lg: {
          fontSize: "base",
        },
      },
      a: {
        color: "sz.primary",
        _hover: {
          textDecoration: "underline",
          "&:has(.heading-anchor)": {
            textDecoration: "none",
          },
        },
      },

      p: {
        my: "2",
        fontSize: "base",
        wordBreak: "keep-all",
        overflowWrap: "anywhere",
        _lg: {
          fontSize: "lg",
        },
        color: "sz.text.main",
        code: {
          fontSize: "base",
        },
      },
      code: {
        px: "1",
        py: "0.25",
        bg: "sz.bg-on",
        rounded: "md",
        borderWidth: "1",
        borderColor: "sz.border",
      },
      kbd: {
        display: "inline-block",
        px: "2",
        py: "1",
        fontSize: "sm",
        fontFamily: "var(--moralerspace-neon)",
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

      ul: {
        my: "2",
        pl: "6",
        li: {
          listStyleType: "disc",
          "&:has(input[type='checkbox'])": {
            listStyleType: "none",
            ml: "-6",
          },
        },
        ul: {
          li: {
            listStyleType: "circle",
            ul: {
              listStyleType: "square",
              "> li": {
                listStyleType: "square",
                ml: "2",
              },
            },
          },
        },
      },
      ol: {
        my: "2",
        pl: "6",
        li: {
          listStyleType: "decimal",
          "&:has(input[type='checkbox'])": {
            listStyleType: "none",
            ml: "-6",
          },
        },
      },
      "table:not(.github-gist-embed-container table)": {
        width: "full",
        thead: {
          tr: {
            bgColor: "sz.bg-on",
            borderBottomWidth: "1",
            borderBottomColor: "sz.border",
            th: {
              p: "3",
              fontWeight: "bold",
              textAlign: "left",
            },
          },
        },
        tbody: {
          tr: {
            bgColor: "sz.bg",
            borderBottomWidth: "1",
            borderBottomColor: "sz.border",
            td: {
              p: "2",
            },
          },
        },
      },

      blockquote: {
        bgColor: "sz.bg-on",
        borderLeftWidth: "4",
        borderLeftColor: "sz.primary/60",
        my: "8",
        px: "4",
        py: "2",
        shadow: "md",
        fontStyle: "italic",
      },
      details: {
        mt: "4",
        mb: "6",
        summary: {
          mb: "3",
          cursor: "pointer",
          fontWeight: "normal",
        },
      },
      hr: {
        borderColor: "sz.border",
        my: "8",
      },
      mark: {
        bg: "sz.primary/20",
        color: "sz.text.main",
        px: "1",
        py: "0.25",
        borderRadius: "sm",
      },
      img: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        rounded: "lg",
        my: "4",
        mx: "auto",
        w: "auto",
        h: "auto",
        maxH: "600px",
      },
      video: {
        my: "4",
      },
      ".caption": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1",
        fontSize: "base",
        fontWeight: "bold",
        color: "sz.text.sub",
        svg: {
          flexShrink: "0",
          w: "4",
          h: "4",
        },
      },
      ".caption-table": {
        mt: "8",
        _sm: {
          mt: "4",
        },
      },
      ".caption-image": {
        mb: "8",
        _sm: {
          mb: "4",
        },
      },
      ".link-card": {
        my: "4", // remark-breaksで使うなら上のMarginだけにしたほうがいいかも
        // mb: "-4",  // rehype-breaksによる余分なスペースを相殺
        borderWidth: "1",
        borderColor: "sz.border",
        borderRadius: "lg",
        overflow: "hidden",
        maxH: "200px",
        transition: "background-color 0.1s ease",
        bg: "sz.bg",
        _hover: {
          bg: "sz.bg-on.500",
        },
        _sm: {
          flexDirection: "column",
          maxH: "none",
          w: "full",
          maxW: "full",
        },
        a: {
          display: "flex",
          textDecoration: "row",
          w: "full",
          h: "full",
          color: "sz.text.main",
          transition: "color 0.2s ease",
          _sm: {
            flexDirection: "column",
          },
          _hover: {
            textDecoration: "none",
          },
          ".link-card-image": {
            display: "flex",
            flexShrink: "0",
            w: "auto",
            h: "200px",
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            _sm: {
              w: "full",
              h: "200px",
            },
            img: {
              w: "full",
              h: "full",
              objectFit: "cover",
              objectPosition: "center",
              m: "0",
              rounded: "0",
              maxH: "250px",
            },
          },
        },
        ".link-card-content": {
          display: "flex",
          px: "4",
          pt: "4",
          pb: "3.5",
          flexDirection: "column",
          justifyContent: "flex-start",
          flex: "1",
          minW: "0",
          maxW: "100%",
          overflow: "hidden",
          wordBreak: "break-word",
          _sm: {
            w: "full",
          },
          ".link-card-title": {
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
            "-webkit-line-clamp": "3",
            textOverflow: "hidden",
            overflow: "hidden",
            m: "0",
            mb: "2",
            fontSize: "16px",
            fontWeight: "bold",
            lineHeight: "1.4",
            color: "sz.text.main",
            _sm: {
              "-webkit-line-clamp": "2",
              mb: "1",
            },
          },
          ".link-card-description": {
            mb: "2",
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
            textOverflow: "hidden",
            overflow: "hidden",
            fontSize: "12px",
            "-webkit-line-clamp": "2",
            _sm: {
              "-webkit-line-clamp": "1",
            },
          },
          ".link-card-site-wrapper": {
            mt: "auto",
            display: "flex",
            alignItems: "flex-start",
            gap: "2",
            img: {
              m: "0",
              rounded: "0",
            },
          },
        },
        ".link-card-favicon": {
          w: "4",
          h: "4",
          objectFit: "contain",
          flexShrink: "0",
        },
        ".link-card-favicon-fallback": {
          w: "4",
          h: "4",
          flexShrink: "0",
          color: "sz.text.sub",
        },
        ".link-card-site": {
          display: "flex",
          fontSize: "xs",
          color: "sz.text.sub",
          fontFamily: "var(--moralerspace-neon)",
        },
      },
      ".link-card-grid": {
        ".link-card-grid-container": {
          display: "flex",
          flexDirection: "row",
          gap: "2",
          overflow: "hidden",
          height: "full",
          _sm: {
            flexDirection: "column",
          },
        },
        ".link-card-image-container": {
          display: "flex",
          flexShrink: "0",
          w: "auto",
          h: "200px",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          _sm: {
            w: "full",
            h: "250px",
          },
          img: {
            w: "full",
            h: "full",
            objectFit: "cover",
            objectPosition: "center",
            m: "0",
            rounded: "0",
          },
        },
        ".no-image": {
          w: "full",
          h: "full",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bg: "sz.bg-on",
          color: "sz.border",
          fontSize: "0.8rem",
        },
      },

      ".youtube-embed": {
        my: "4",
        display: "flex",
        justifyContent: "center",
        aspectRatio: "16 / 9",
        maxW: "full",
      },

      ".spotify-embed iframe": {
        w: "full",
        h: "full",
        aspectRatio: "2 / 1",
        minW: "300px",
        maxW: "800px",
      },

      ".twitter-embed-container": {
        m: "1rem 0",
        display: "flex",
        justifyContent: "center",
        ".twitter-tweet": {
          m: "0",
          maxW: "550px",
          w: "full",
        },
      },

      ".google-slides-wrapper": {
        display: "flex",
        justifyContent: "center",
        m: "1.5rem 0",
        w: "full",
      },

      ".google-slides-container": {
        w: "full",
        position: "relative",
        paddingBottom: "58.23%", // 12:7 aspect ratio (7 / 12 * 100)
        maxW: "960px",
        h: "0",
        overflow: "hidden",
        bgColor: "sz.bg-on",
        iframe: {
          position: "absolute",
          top: "0",
          left: "0",
          w: "full",
          h: "full",
          border: "0",
          rounded: "8px",
        },
      },

      ".github-gist-embed-container": {
        m: "1.5rem 0",
        w: "full",
        overflowX: "auto",
        ".gist": {
          m: "0",
        },
        ".github-meta": {
          fontFamily: "inherit",
        },
      },
      "iframe[src*='open.spotify.com']": {
        w: "full",
        h: "full",
        aspectRatio: "2 / 1",
        minW: "300px",
        maxW: "800px",
        border: "0",
        rounded: "8px",
        p: "0.5rem 0",
      },
      ".hatena-blog-embed, .note-embed, .twitter-embed": {
        display: "flex",
        justifyContent: "center",
      },
      ".speaker-deck-embed": {
        my: "4",
      },

      // rehype-autolink-headingsのアンカーリンク
      ".heading-anchor-container": {
        display: "flex",
        alignItems: "center",
        ".heading-anchor": {
          marginRight: ".5rem",
          backgroundImage:
            "linear-gradient(to right in oklch, {colors.sz.primary}, {colors.sz.secondary})",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          transition: "background-image 0.2s ease-in-out",
          _hover: {
            backgroundImage:
              "linear-gradient(to right in oklch, {colors.sz.primary/60}, {colors.sz.secondary/60})",
          },
        },
      },
      ".heading-1": {
        fontSize: "2xl",
        _lg: {
          fontSize: "3xl",
        },
      },
      ".heading-2": {
        fontSize: "xl",
        _lg: {
          fontSize: "2xl",
        },
      },
      ".heading-3": {
        fontSize: "lg",
        _lg: {
          fontSize: "xl",
        },
      },
      ".heading-4": {
        fontSize: "base",
        _lg: {
          fontSize: "lg",
        },
      },
      ".heading-5": {
        fontSize: "sm",
        _lg: {
          fontSize: "base",
        },
      },
      ".heading-6": {
        fontSize: "xs",
        _lg: {
          fontSize: "sm",
        },
      },

      // Expressiveのコードブロック
      ".expressive-code": {
        my: "4",
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
      },
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
    },
  },
  globalVars: {
    "--ibm-plex-sans-jp":
      '"IBM Plex Sans JP", -apple-system, system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif',
    "--moralerspace-neon":
      '"Moralerspace Neon", -apple-system, system-ui, sans-serif',
  },

  conditions: {
    sm: "@media (max-width: 640px)",
    md: "@media (max-width: 768px) and (min-width: 641px)",
    lg: "@media (min-width: 769px)",
    dark: "[data-theme='dark'] &",
    light: "[data-theme='light'] &",
  },

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          "s-primary": { value: "#3951E2" },
          "s-primary-dark": { value: "#5a73f5" },
          "s-secondary": { value: "#6bbaa3" },
          "s-secondary-dark": { value: "#7ecbb3" },
          "s-bg": { value: "#faf8ff" },
          "s-bg-dark": { value: "#1a1625" },
          "s-bg-on": { value: "#F0F0F0" },
          "s-bg-on-dark": { value: "#2a2433" },
          "s-border": { value: "#D1D5DC" },
          "s-border-dark": { value: "#3d3a4a" },
          "s-text-main": { value: "#474554" },
          "s-text-main-dark": { value: "#e8e6f0" },
          "s-text-sub": { value: "#6b6878" },
          "s-text-sub-dark": { value: "#a19daf" },
          // Callout colors
          "callout-blue": { value: "#3951e2" },
          "callout-cyan": { value: "#0096d4" },
          "callout-green": { value: "#00a87a" },
          "callout-orange": { value: "#ff8365" },
          "callout-red": { value: "#ff4991" },
          "callout-purple": { value: "#d13ac2" },
          "callout-gray": { value: "#aca9bb" },
        },
      },
      semanticTokens: {
        colors: {
          "sz.primary": {
            value: {
              base: "{colors.s-primary}",
              _dark: "{colors.s-primary-dark}",
            },
          },
          "sz.secondary": {
            value: {
              base: "{colors.s-secondary}",
              _dark: "{colors.s-secondary-dark}",
            },
          },
          "sz.gradient": {
            25: {
              value: {
                base: "color-mix(in oklch, {colors.s-primary} 25%, {colors.s-secondary} 75%)",
                _dark:
                  "color-mix(in oklch, {colors.s-primary-dark} 25%, {colors.s-secondary-dark} 75%)",
              },
            },
            50: {
              value: {
                base: "color-mix(in oklch, {colors.s-primary} 50%, {colors.s-secondary} 50%)",
                _dark:
                  "color-mix(in oklch, {colors.s-primary-dark} 50%, {colors.s-secondary-dark} 50%)",
              },
            },
            75: {
              value: {
                base: "color-mix(in oklch, {colors.s-primary} 75%, {colors.s-secondary} 25%)",
                _dark:
                  "color-mix(in oklch, {colors.s-primary-dark} 75%, {colors.s-secondary-dark} 25%)",
              },
            },
            100: {
              value: {
                base: "{colors.s-primary}",
                _dark: "{colors.s-primary-dark}",
              },
            },
          },
          "sz.bg": {
            value: {
              base: "{colors.s-bg}",
              _dark: "{colors.s-bg-dark}",
            },
          },
          "sz.bg-on": {
            DEFAULT: {
              value: {
                base: "{colors.s-bg-on}",
                _dark: "{colors.s-bg-on-dark}",
              },
            },
            100: {
              value: {
                base: "#f1f1f1",
                _dark: "#2e2838",
              },
            },
            500: {
              value: {
                base: "#f4f2f5",
                _dark: "#34304a",
              },
            },
            800: {
              value: {
                base: "#f5f3f7",
                _dark: "#3a3650",
              },
            },
          },
          "sz.text.main": {
            value: {
              base: "{colors.s-text-main}",
              _dark: "{colors.s-text-main-dark}",
            },
          },
          "sz.text.sub": {
            value: {
              base: "{colors.s-text-sub}",
              _dark: "{colors.s-text-sub-dark}",
            },
          },
          "sz.icon": {
            value: {
              base: "#000000",
              _dark: "#ffffff",
            },
          },
          "sz.border": {
            value: {
              base: "{colors.s-border}",
              _dark: "{colors.s-border-dark}",
            },
          },
          "sz.purple": {
            value: {
              base: "#9b5de5",
              _dark: "#b678f6",
            },
          },
          "sz.yellow": {
            value: {
              base: "#f1d85b",
              _dark: "#f4f472",
            },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
  jsxFramework: "react",
});
