import { themes as defaultThemes, tokens } from "@tamagui/themes";
import { createTamagui } from "tamagui";

export const themes = {
  ...defaultThemes,
  disabled: {
    background: "#cccccc",
    color: "#666666",
    borderColor: "#cccccc",
    hoverBackground: "#dddddd",
    pressBackground: "#bbbbbb",
  },
};

const config = createTamagui({
  themes,
  tokens,
  shorthands: {
    p: "padding",
    m: "margin",
    bg: "backgroundColor",
  },
});

export type AppConfig = typeof config;

export default config;
