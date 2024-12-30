"use client";
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../ui/carousel';
// import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image';

const testimonials = [
  {
    img: "/img/testimony/leny.jpg",
    text: "truuu sanay rin kasi ko mag bake and fav ko ang banana cake!! at pagdating sa ganyan maarte ko sa lasa hahahaha kadalasan kasi sa iba sobrang tatamis jusko nakakaumay pero yung sayo ayos lang yung tamis hindi siya nakakaumay.",
    name: "Leny"
  },
  {
    img: "/img/testimony/lor.jpg",
    text: "Sobrang sarap ng brownies mo beh like di sha nakakaumay, talagang iisa ka pa ulet sobrang perfect moist texture pag kinagat,, YUMMY🥹🥹🥹 very very recommended!!!",
    name: "Lorraine"
  },
  {
    img: "/img/testimony/trixie.jpg",
    text: "Ubos kaya agad HAHAHA dapat pla yung 12pcs nalang inorder🤣 Kaya pla dami umoorder eh!! Halatang hindi tinipid sa ingredients, ang sarapppp!🥹 Sa susunod ulit revo, thank youuu!!",
    name: "Trixie"
  },
  {
    img: "/img/testimony/unknown.jpg",
    text: "Ansarap nung brownies legitt!! Ung mga classmates ko gusto na umorder. Sinabe ko na sa kanila name mo sa fb, at fb page mo.",
    name: "Tammy"
  },
  {
    img: "/img/testimony/rodolfo.jpg",
    text: "Totoo yung Balita sa School! Solid naman yung pagaantay ko Sulit at masarap and worth it yung price dahil Hinde tinipid sa Ingredients nagustuhan ng mga classmates ko and Fam ko🤟🏻✨😋😋",
    name: "Rodolfo"
  },
  {
    img: "/img/testimony/unknown.jpg",
    text: "Sarap tol yung chocolate nya hindi nakakaumay sulit na sulit kaso hindi ko nasulit gusto ng gf ko hays, order ulit ako sarap😉❤️",
    name: "Sherwin"
  },
  {
    img: "/img/testimony/unknown.jpg",
    text: "Hi po, sulit po ang byahe ng banana muffin from Bulacan to QC! Hehehe sarap po! 😊 thanks po. Sa uulitin po! Hehe",
    name: "Clarisse"
  },
  {
    img: "/img/testimony/unknown.jpg",
    text: "di siya nakakasawa kainin 🙌 100/10 🙌",
    name: "Yvanna"
  },
];

const TestimonyCarousel = () => {
  return (
    <Carousel
      // plugins={[
      //   Autoplay({
      //     delay: 2000,
      //   }),
      // ]}
      className='grid mt-3 lg:mt-4'
      opts={{ loop: true }}
    >
      <CarouselContent>
        {testimonials.map((testimonial, i) => (
          <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
            <div>
              <Testimonial {...testimonial} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='relative'>
        <CarouselPrevious className='absolute left-[2rem] transform -translate-y-1/2 z-10' />
        <CarouselNext className='absolute right-[2rem] transform -translate-y-1/2 z-10' />
      </div>

    </Carousel>
  )
}

export const Testimonial = ({ img, text, name }: { img: string, text: string, name: string }) => {
  return (
    <div className="grid gap-2 lg:gap-3 rounded-md overflow-hidden bg-card p-5 lg:p-6">
      <div className="flex gap-2">
        <div className="rounded-full overflow-hidden h-14 w-14 lg:h-20 lg:w-20 flex justify-center items-center">
          <Image src={img} alt={img} width={60} height={60} className='h-14 w-14 lg:h-20 lg:w-20 object-cover' />
        </div>

        <div className="flex flex-col justify-start gap-1">
          <div className="font-playfair text-2xl lg:text-3xl font-medium">{name}</div>
          <div className="text-sm lg:text-base opacity-60 font-medium">Customer</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-base lg:text-xl opacity-70">&quot;{text}&quot;</div>
      </div>
    </div>
  )
}

export default TestimonyCarousel
