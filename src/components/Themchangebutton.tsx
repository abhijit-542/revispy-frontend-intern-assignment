"use client";

import { Moon, SunDim } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const Themechangerbutton = () => {
  const { theme, setTheme } = useTheme();

  const themeswitch = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      onClick={themeswitch}
      className="bg-transparent h-[1.2rem] w-[1.2rem] p-0  hover:bg-transparent focus-visible:outline-none focus-visible:ring-0"
    >
      <SunDim className="h-full w-full scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-foreground" />
      <Moon className="absolute h-full w-full scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-foreground" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default Themechangerbutton;
