import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FocusDash — focus timers in your browser",
    short_name: "FocusDash",
    description:
      "Pomodoro, Flowtime, stopwatch and multi-countdown timers that run entirely in your browser. Nothing you time ever leaves your device.",
    start_url: "/en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
