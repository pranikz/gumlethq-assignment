import { switchThemeDuration } from "./constants";
import Dashboard from "./Dashboard/page";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <Dashboard />
    </div>
  );
}
