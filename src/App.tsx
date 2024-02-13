import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { resources } from "./config/i18n.ts";
import router from "./config/routes.tsx";

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
