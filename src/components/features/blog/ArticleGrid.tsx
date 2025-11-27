import { cva } from "styled-system/css"
import { styled as s } from "styled-system/jsx"

export const articleGridRecipes = cva({
  base: {
    display: "grid",
    gridTemplateColumns: {
      base: "repeat(1, minmax(0, 1fr))",
      md: "repeat(2, minmax(0, 1fr))",
    },
    gap: "6",
    _md: {
      justifyItems: "center",
      alignItems: "center",
    },
  },
})

export const ArticleGrid = s("div", articleGridRecipes);