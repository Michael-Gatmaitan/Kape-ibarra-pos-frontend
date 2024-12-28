"use client";
import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '../../ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image';
import { Card, CardContent } from '../../ui/card';

const testimonials = [
  {
    img: "/img/home/testimonials/testimonial1.jpg",
    text: "I love the taste of their coffee, it's so good and the aroma is so relaxing.",
    name: "John Doe"
  },
  {
    img: "/img/home/testimonials/testimonial2.jpg",
    text: "The coffee is so good, I can't stop drinking it. I love it!",
    name: "Jane Doe"
  },
  {
    img: "/img/home/testimonials/testimonial3.jpg",
    text: "I'm a coffee lover and I can say that their coffee is one of the best I've tasted.",
    name: "Juan Dela Cruz"
  },
  {
    img: "/img/home/testimonials/testimonial4.jpg",
    text: "I love their coffee, it's so good and the aroma is so relaxing.",
    name: "Jane Dela Cruz"
  },
  {
    img: "/img/home/testimonials/testimonial5.jpg",
    text: "The coffee is so good, I can't stop drinking it. I love it!",
    name: "John Dela Cruz"
  },
  {
    img: "/img/home/testimonials/testimonial6.jpg",
    text: "I'm a coffee lover and I can say that their coffee is one of the best I've tasted.",
    name: "Juan Doe"
  },
];

const TestimonyCarousel = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {testimonials.map((testimonial, i) => (
          <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
            <div>
              {/* <Testimonial {...testimonial} /> */}
              <Card>
                {/* <CardHeader>
                  <CardTitle>{testimonial.name}</CardTitle>
                </CardHeader> */}
                <CardContent className="flex items-center justify-center p-6">
                  {testimonial.text}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <div className='hidden lg:block'>
        <CarouselPrevious />
        <CarouselNext />
      </div> */}
    </Carousel>
  )
}

export const Testimonial = ({ img, text, name }: { img: string, text: string, name: string }) => {
  return (
    <div className="grid gap-2 lg:gap-3 rounded-md overflow-hidden bg-card p-5 lg:p-6">
      <div className="flex gap-2">
        <div className="rounded-full overflow-hidden bg-red-500 h-14 w-14 lg:h-20 lg:w-20 flex justify-center items-center">
          <Image src={img} alt={img} width={60} height={60} />
        </div>

        <div className="flex flex-col justify-start gap-1">
          <div className="font-playfair text-2xl lg:text-3xl font-medium">{name}</div>
          <div className="text-sm lg:text-base opacity-60 font-medium">Customer</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-base lg:text-xl">{text}</div>
      </div>
    </div>
  )
}

export default TestimonyCarousel
