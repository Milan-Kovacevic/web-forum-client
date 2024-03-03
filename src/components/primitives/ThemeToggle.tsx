import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useTheme } from "@/pages/shared/ThemeProvider";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">(
    LIGHT_THEME
  );
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(currentTheme);
  }, [currentTheme]);

  const handleSetTheme = () => {
    if (currentTheme == LIGHT_THEME) {
      setCurrentTheme(DARK_THEME);
    } else {
      setCurrentTheme(LIGHT_THEME);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => handleSetTheme()}
            size="sm"
            variant="ghost"
            className="w-9 px-0 transition-all"
            aria-label="Toggle italic"
          >
            {currentTheme == "light" ? (
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            ) : (
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Change Theme (currently {currentTheme})</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
