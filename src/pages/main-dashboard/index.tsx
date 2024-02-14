import { Space } from "antd";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const MainDashboard = () => {
  const { t } = useTranslation();
  const [user] = useLocalStorage("fullName", "");
  const navigate = useNavigate();

  if (!user) navigate("/register");

  const onClickLogout = () => {
    localStorage.removeItem("fullName");
    localStorage.removeItem("registerData");
    navigate("/register");
  };

  return (
    <Space direction="vertical" size="large" className="w-full">
      <div>
        <h3 className="mb-4 text-2xl font-semibold">{t("greetingMessage")}</h3>
        <p className="text-lg">
          {t("helloMessage")} {user}!
        </p>
        <button
          onClick={onClickLogout}
          className="px-5 py-2 mt-8 text-white rounded-md text-sm bg-blue-900"
        >
          {t("logout")}
        </button>
      </div>
    </Space>
  );
};

export default MainDashboard;
