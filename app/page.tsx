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

  const saleData = sales.map(sale => {
    const date = new Date(sale.date);
    return {
      month: `${date.getMonth() + 1} / ${date.getDate()} / ${date.getFullYear()}`,
      sale: sale.dailySales
    }
  });

  console.log(saleData);

  return (
    <SocketSample saleData={saleData} />
  )
}
