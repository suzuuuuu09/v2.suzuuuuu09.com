import { styled as s } from "styled-system/jsx";
import { token } from "styled-system/tokens";
import Giscus from "@giscus/react";
import { useState, useEffect } from "react";

type Theme = "light" | "dark";

const title = "Discussion";

function DiscussionIcon({
  primaryColor,
  secondaryColor,
}: Readonly<{
  primaryColor: string;
  secondaryColor: string;
}>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient
          id="discussionGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
      </defs>
      <path
        fill="url(#discussionGradient)"
        d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"
      />
    </svg>
  );
}

export default function Discussion() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // 初期テーマの取得
    const currentTheme =
      document.documentElement.dataset.theme ||
      localStorage.getItem("theme") ||
      "light";
    setTheme(currentTheme as Theme);

    const handleThemeChange = (e: CustomEvent<{ theme: string }>) => {
      setTheme(e.detail.theme as Theme);
    };

    globalThis.addEventListener(
      "themeChange",
      handleThemeChange as EventListener,
    );

    return () => {
      globalThis.removeEventListener(
        "themeChange",
        handleThemeChange as EventListener,
      );
    };
  }, []);

  const primaryColor = token("colors.sz.primary");
  const secondaryColor = token("colors.sz.secondary");

  return (
    <>
      <s.h2
        id={title}
        display="flex"
        alignItems="center"
        fontWeight="bold"
        fontSize="2xl"
        my="5"
        scrollMarginTop="28"
        borderBottomWidth="1"
        borderBottomColor="sz.border"
        mt="20"
        pb="1"
        _lg={{ fontSize: "3xl" }}
        _sm={{ mt: "8" }}
      >
        <s.a
          href={`#${title}`}
          marginRight=".5rem"
          display="inline-flex"
          alignItems="center"
          transition="opacity 0.2s ease-in-out"
          _hover={{
            opacity: 0.6,
          }}
        >
          <DiscussionIcon
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        </s.a>
        {title}
      </s.h2>
      <s.section>
        <Giscus
          id="discussion"
          repo="suzuuuuu09/v2.suzuuuuu09.com"
          repoId="R_kgDOQI0AsA"
          category="General"
          categoryId="DIC_kwDOQI0AsM4C16w9"
          mapping="pathname"
          term="Welcome to giscus!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme={theme === "light" ? "light" : "dark"}
          lang="ja"
          loading="lazy"
        />
      </s.section>
    </>
  );
}
