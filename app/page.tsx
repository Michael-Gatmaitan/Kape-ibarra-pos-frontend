// import { SidebarTrigger } from "../components/ui/sidebar";

import { ModeToggle } from "../components/ModeToggle";
import SocketSample from "./SocketSample";

export default function Home() {


  return <div>
    <div className="w-full h-24 bg-red-700">
      <ModeToggle />
      <SocketSample />
    </div>
  </div>
}
