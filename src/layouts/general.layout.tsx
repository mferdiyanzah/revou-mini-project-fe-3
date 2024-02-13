import { Outlet } from "react-router-dom";
import LanguageSwitcher from "../components/language-switcher";

const GeneralLayout = () => {
  return (
    <main className="my-0 mx-auto w-4/6 h-screen items-center gap-2 flex justify-center sm:p-10 p-4 relative">
      <Outlet />
      <LanguageSwitcher />
    </main>
  );
};

export default GeneralLayout;
