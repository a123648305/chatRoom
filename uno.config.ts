// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";
export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      bdColor: "#e6e6e6",
    },
  },
  presets: [presetUno(), presetAttributify(), presetRemToPx()],
});
