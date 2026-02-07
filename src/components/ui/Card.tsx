import { cva } from "styled-system/css";
import { styled as s } from "styled-system/jsx";

const cardRecipes = cva({
  base: {
    gradientTo: "sz.bg-on",
    borderRadius: "2xl",
    w: "full",
    shadow: "md",
    overflow: "hidden",
    borderWidth: "1px",
    borderColor: "sz.border/40",
    backdropFilter: "blur(10px)",
    transition: "all 0.4s",
    _md: {
      maxW: "450px",
    },
    _hover: {
      shadow: "2xl",
    },
  },
  variants: {
    maxW: {
      full: {
        _md: { maxW: "full" },
      },
      "450px": {
        _md: { maxW: "450px" },
      },
    },
  },
});

export const Card = s("article", cardRecipes, {
  defaultProps: {
    className: "group",
  },
});
