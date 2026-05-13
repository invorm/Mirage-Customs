import { useEffect, useState } from "react";

export function useTheme() {
  const [theme] = useState<"light" | "dark">("light");
  const [forcedTheme, setForcedTheme] = useState<"light" | "dark" | null>(null);

  const activeTheme = forcedTheme || theme;

  useEffect(() => {
    const root = document.documentElement;
    if (activeTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [activeTheme]);

  return { theme: activeTheme, setForcedTheme };
}
