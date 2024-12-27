// import { ISale } from "..";
// import { apiUrl } from "../lib/apiUrl";
// import { getCookieToken } from "../lib/cookieToken";
// import SocketSample from "./SocketSample";

import Image from "next/image";
import { Button } from "../components/ui/button";

export default async function Home() {

  // const token = await getCookieToken()
  // console.log(token);

  // const salesReq = await fetch(`${apiUrl}/sale`, {
  //   method: "GET",
  //   headers: {
  //     'Content-Type': 'application/json',
  //     authorization: token
  //   }
  // });

  // const sales: ISale[] = await salesReq.json();

  // const saleData = sales.map(sale => {
  //   const date = new Date(sale.date);
  //   return {
  //     month: `${date.getMonth() + 1} / ${date.getDate()} / ${date.getFullYear()}`,
  //     sale: sale.dailySales
  //   }
  // });

  // console.log(saleData);

  const coffeesSrc = [
    "/img/home/coffees/coffees2.jpg",
    "/img/home/coffees/coffees3.jpg",
    "/img/home/coffees/coffees4.jpg",
    "/img/home/coffees/coffees5.jpg",
  ]

  return (
    // <SocketSample saleData={saleData} />
    <div>
      {/* Header */}
      <div className="flex align-center flex-col gap-3 text-center">
        <div className="font-playfair font-bold text-4xl lg:text-6xl">Kape saglit then,<br />laban ulit</div>
        <div className="opacity-60 font-medium text-[14px] lg:text-[24px]">Kape ibarra est. 2024</div>

        <Button className="w-max self-center mt-7 lg:mt-10">Order yours now</Button>
      </div>

      {/* Couple coffee */}
      <div className="flex justify-center mt-12">
        <Image src="/img/home/couple_of_coffees.png" alt="couple_coffees" width={1000} height={1000} className="w-full max-w-[750px]" />
      </div>

      {/* Coffees */}
      <div className="grid gap-2 lg:gap-3 grid-cols-2 lg:grid-cols-4 mt-20">
        {coffeesSrc.map((src, i) => (
          <div key={i} className="rounded-md overflow-hidden">
            <Image src={src} alt={src} width={1000} height={1000} />
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid gap-2 lg:gap-3 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-home_card gap-2 lg:gap-3">
          <Card text="Creative combinations" img="/img/home/cards/comb.jpg" />
          <Card text="Coffees are made from real coffee beans" img="/img/home/cards/bg.jpeg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-home_card_reverse gap-2 lg:gap-3">
          <Card text="Over thousand of total orders in just 2024" />
          <Card text="Special Events" img="/img/home/cards/cart.jpg" />
        </div>
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3 mt-24">
        <Card text="B6 L3 Sampaguita st. Residencia Regina, Loma De Gato" img="/img/home/loc_bg.jpeg" />
        <div className="relative h-[230px] md:h-[300px] lg:h-[350px] bg-black rounded-md overflow-hidden">
          <iframe className="w-full h-full absolute top-0 left-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.5215080395733!2d121.01044762606172!3d14.795960822261907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ae41f66bc613%3A0x39fa535a7946c737!2sResidencia%20Regina%2C%20Loma%20de%20Gato!5e0!3m2!1sen!2sph!4v1734630200909!5m2!1sen!2sph"
            style={{ border: 0, width: '1fr' }}
            width="425" height="350"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          >
          </iframe>
        </div>
      </div>
    </div>
  )
}

const Card = ({ img, text }: { img?: string, text: string }) => {
  return (
    <div
      style={img ? { backgroundImage: `url(${img})` } : null}
      className="bg-black bg-cover bg-center rounded-md h-[230px] md:h-[300px] lg:h-[350px] overflow-hidden relative shadow-sm group"
    >
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out transform group-hover:scale-110" style={img ? { backgroundImage: `url(${img})` } : null}></div>
      <div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-60 text-white flex justify-center items-center text-center font-playfair font-bold text-2xl lg:text-3xl p-11">
        {text}
      </div>
    </div>
  )
}
