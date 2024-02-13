import { Switch } from "antd";
import i18n from "i18next";

const LanguageSwitcher = () => {
  return (
    <Switch
      checkedChildren="ID"
      unCheckedChildren="EN"
      onChange={(checked) => {
        i18n.changeLanguage(checked ? "id" : "en");
      }}
      className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600"
    />
  );
};

export default LanguageSwitcher;
