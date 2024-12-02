import { getCookieToken } from "../lib/cookieToken";
import SocketSample from "./SocketSample";

export default async function Home() {

  const token = await getCookieToken()
  console.log(token);

  return <div>
    <div className="w-full h-24">
      {/* {token ? token.toString() : "Undefined token"}
      <ModeToggle /> */}
      <SocketSample />
    </div>
  </div>
}
