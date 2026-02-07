import { cva } from "styled-system/css";
import { styled as s } from "styled-system/jsx";

export const awardGridRecipes = cva({
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
    gap: "6",
  },
});

export const AwardGrid = s("div", awardGridRecipes);
