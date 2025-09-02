"use client";

import { ReactNode, useEffect } from "react";
import { useAppSelector } from "@/redux/store";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const { mode } = useAppSelector((s) => s.theme);

  useEffect(() => {
    const html = document.documentElement;
    if (mode === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
  }, [mode]);

  return <>{children}</>;
}
