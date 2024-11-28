// import { SidebarTrigger } from "../components/ui/sidebar";

import { cookies } from "next/headers";
import { ModeToggle } from "../components/ModeToggle";
import SocketSample from "./SocketSample";

export default function Home() {

  const token = cookies().get('token')?.value;
  console.log(token);

  return <div>
    <div className="w-full h-24">
      {/* {token ? token.toString() : "Undefined token"}
      <ModeToggle /> */}
      <SocketSample />
    </div>
  </div>
}
