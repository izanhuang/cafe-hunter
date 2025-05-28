import { themes, tokens } from "@tamagui/themes";
import { createTamagui } from "tamagui";

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
