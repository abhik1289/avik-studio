"use client";

import { Monitor, MoonStar, SunMedium } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

function subscribe() {
  return () => {};
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const activeTheme = mounted ? resolvedTheme : undefined;

  function handleToggle() {
    setTheme(activeTheme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className="h-10 rounded-full border-border/60 bg-background/70 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      aria-label={
        activeTheme
          ? `Switch to ${activeTheme === "dark" ? "light" : "dark"} mode`
          : "Toggle theme"
      }
    >
      {activeTheme ? (
        activeTheme === "dark" ? (
          <MoonStar className="size-4" />
        ) : (
          <SunMedium className="size-4" />
        )
      ) : (
        <Monitor className="size-4" />
      )}
      <span>
        {activeTheme ? (activeTheme === "dark" ? "Dark" : "Light") : "Theme"}
      </span>
    </Button>
  );
}
