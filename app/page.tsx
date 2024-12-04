import { ISale } from "..";
import { apiUrl } from "../lib/apiUrl";
import { getCookieToken } from "../lib/cookieToken";
import SocketSample from "./SocketSample";

export default async function Home() {

  const token = await getCookieToken()
  console.log(token);

  const salesReq = await fetch(`${apiUrl}/sale`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  const sales: ISale[] = await salesReq.json();

  return <div>
    <div className="w-full h-24">
      {/* {token ? token.toString() : "Undefined token"}
      <ModeToggle /> */}
      <SocketSample />

      {sales.map(sale => (
        <div key={sale.id}>{sale.dailySales}</div>
      ))}
    </div>
  </div>
}
