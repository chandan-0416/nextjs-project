// "use client";

// import { useContext, useEffect, useState } from "react";

// import { Moon, Sun } from "lucide-react";
// import { ThemeContext } from "./ThemeProvider";

// export default function ThemeIconToggle() {
//   const { theme, setTheme } = useContext(ThemeContext);
//   const [mounted, setMounted] = useState(false);

//   // Prevent hydration mismatch
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   // Detect what theme should currently show
//   const isDark =
//     theme === "dark" ||
//     (theme === "system" &&
//       window.matchMedia("(prefers-color-scheme: dark)").matches);

//   const toggleTheme = () => {
//     if (isDark) setTheme("light");
//     else setTheme("dark");
//   };

//   return (
//     <button
//       onClick={toggleTheme}
//       aria-label="Toggle Theme"
//       className="p-2 rounded-full border border-gray-300 dark:border-gray-600
//                  bg-white dark:bg-gray-900 transition-all duration-300 hover:scale-110"
//     >
//       {isDark ? (
//         <Sun className="h-6 w-6 text-yellow-400 transition-all duration-500 rotate-180" />
//       ) : (
//         <Moon className="h-6 w-6 text-gray-700 dark:text-gray-200 transition-all duration-500" />
//       )}
//     </button>
//   );
// }


"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeIconToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button onClick={() => setTheme(nextTheme)} className="p-2 rounded-full border">
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
