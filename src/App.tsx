import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "@/routing/Router";
import "./index.css";
import { ThemeProvider } from "./pages/shared/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
      </React.StrictMode>
    </ThemeProvider>
  );
}
