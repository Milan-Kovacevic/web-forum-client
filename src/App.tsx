import { RouterProvider } from "react-router-dom";
import router from "@/routing/Router";
import "./index.css";
import { ThemeProvider } from "./pages/shared/ThemeProvider";
import { APP_THEME_STORAGE_KEY, LIGHT_THEME } from "./utils/constants";

export default function App() {
  return (
    <ThemeProvider
      defaultTheme={LIGHT_THEME}
      storageKey={APP_THEME_STORAGE_KEY}
    >
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}
