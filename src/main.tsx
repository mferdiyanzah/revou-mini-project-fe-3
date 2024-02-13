import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#002c8c",
        borderRadius: 4,
      },
    }}
  >
    <App />
  </ConfigProvider>
);
