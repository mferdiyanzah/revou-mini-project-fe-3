import { Outlet } from "react-router-dom";
import LanguageSwitcher from "../components/language-switcher";

const GeneralLayout = () => {
  return (
    <main className="my-0 mx-auto xl:w-4/6 w-screen h-screen items-center gap-2 flex justify-center p-5 relative">
      <Outlet />
      <LanguageSwitcher />
    </main>
  );
};

export default GeneralLayout;
