import Dashboard from "./Dashboard/page";
import { ThemeSwitcher } from "./components";
export default function Home() {
  return (
    <div className="flex flex-col h-screen gap-5 lg:w-[80%] mx-auto">
      <nav className="bg-[##f8fafc] border-gray-200 dark:bg-[#0d1117]">
        <div className="flex flex-wrap justify-between items-center w-full p-4 ">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Gumlet Assignment
          </span>
          <div className="flex items-center">
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <Dashboard />
    </div>
  );
}
