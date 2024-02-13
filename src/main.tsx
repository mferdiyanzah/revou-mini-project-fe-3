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
      components: {
        Switch: {
          handleSize: 24,
          trackHeight: 28,
          trackMinWidth: 48,
          innerMaxMargin: 30,
        },
      },
    }}
  >
    <App />
  </ConfigProvider>
);
