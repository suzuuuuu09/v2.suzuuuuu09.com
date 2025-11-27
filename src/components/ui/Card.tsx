import { cva } from "styled-system/css";
import { styled as s } from "styled-system/jsx";

const cardRecipes = cva({
  base: {
    gradientTo: "sz.bg-on",
    borderRadius: "2xl",
    shadow: "sm",
    overflow: "hidden",
    borderWidth: "1px",
    borderColor: "sz.border/20",
    backdropFilter: "blur(10px)",
    transition: "all 0.4s",
    _md: {
      maxW: "450px",
      w: "full",
    },
    _hover: {
      shadow: "xl",
    },
  },
})

export const Card = s('article', cardRecipes, {
  defaultProps: {
    className: 'group'
  }
})