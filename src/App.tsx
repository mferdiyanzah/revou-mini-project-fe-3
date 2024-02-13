import { Switch } from "antd";
import "./App.css";
import Register from "./pages/register/index.tsx";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./config/i18n.ts";

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  return (
    <main className="my-0 mx-auto w-4/6 h-screen items-center gap-2 flex justify-center sm:p-10 p-4 relative">
      <Register />
      <Switch
        checkedChildren="ID"
        unCheckedChildren="EN"
        onChange={(checked) => {
          i18n.changeLanguage(checked ? "id" : "en");
        }}
        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600"
      />
    </main>
  );
}

export default App;
