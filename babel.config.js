module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "@tamagui/babel-plugin",
        {
          config: "./tamagui.config.ts",
          importsWhitelist: ["constants.js", "colors.js"],
          logTimings: true,
        },
      ],
      ["transform-inline-environment-variables", { include: "TAMAGUI_TARGET" }],
      "react-native-reanimated/plugin",
    ],
  };
};
