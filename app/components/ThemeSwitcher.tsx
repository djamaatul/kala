"use client";

import { useState } from "react";
import { setThemeCookie } from "../actions";

export default function ThemeSwitcher({
  defaultTheme,
}: {
  defaultTheme: string;
}) {
  const [theme, setTheme] = useState(defaultTheme);

  function handleTheme() {
    const next = theme === "dark" ? "light" : "dark";

    document.body.classList.toggle("dark");

    setTheme(next);
    setThemeCookie(next);
  }
  return (
    <button
      className="bg-secondary relative px-6 py-3 flex items-center"
      onClick={() => handleTheme()}
    >
      <div
        className={`absolute top-0 h-full w-1/2 bg-white/50 ${
          theme === "dark" ? "right-0" : "left-0 "
        }`}
      ></div>
    </button>
  );
}
