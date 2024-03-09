import { RouterProvider } from "react-router-dom";
import router from "@/pages/router/Router";
import "./index.css";
import { ThemeProvider } from "./pages/shared/ThemeProvider";
import { APP_THEME_STORAGE_KEY, LIGHT_THEME } from "./utils/constants";
import { Provider } from "react-redux";
import store from "@/lib/redux";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider
        defaultTheme={LIGHT_THEME}
        storageKey={APP_THEME_STORAGE_KEY}
      >
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </Provider>
  );
}
