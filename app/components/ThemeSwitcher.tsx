"use client";

import { useState } from "react";
import { setThemeCookie } from "../actions";
import cn from "../utils/cn";
import Button from "./Button";
import DarkIcon from "../icons/Dark";
import LightIcon from "../icons/Light";

export default function ThemeSwitcher({
  defaultTheme,
  className,
}: {
  defaultTheme: string;
  className?: string;
}) {
  const [theme, setTheme] = useState(defaultTheme);

  function handleTheme() {
    const next = theme === "dark" ? "light" : "dark";

    document.body.classList.toggle("dark");

    setTheme(next);
    setThemeCookie(next);
  }
  return (
    <Button.outline
      className={cn("rounded-full", className)}
      onClick={() => handleTheme()}
    >
      {theme === "dark" ? <DarkIcon /> : <LightIcon />}
    </Button.outline>
  );
}
