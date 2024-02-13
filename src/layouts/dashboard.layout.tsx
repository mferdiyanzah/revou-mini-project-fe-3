import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import LanguageSwitcher from "../components/language-switcher";

const DashboardLayout = () => {
  return (
    <Layout className="h-screen">
      <Layout.Header className="bg-white shadow-md flex items-center justify-between pl-4">
        <h1 className="font-bold text-4xl text-blue-900">SINAU</h1>
        <LanguageSwitcher />
      </Layout.Header>
      <Layout.Content className="p-4">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default DashboardLayout;
