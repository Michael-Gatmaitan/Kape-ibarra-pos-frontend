"use client";
import React, { useEffect, useState } from 'react'
import socket from '../lib/socket';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';

import { ChartContainer, ChartLegend, ChartLegendContent, type ChartConfig } from '../components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartTooltip, ChartTooltipContent } from '../components/ui/chart';


const chartData = [
  { month: "January", coffee: 186, nonCoffee: 80 },
  { month: "February", coffee: 305, nonCoffee: 200 },
  { month: "March", coffee: 237, nonCoffee: 120 },
  { month: "April", coffee: 73, nonCoffee: 190 },
  { month: "May", coffee: 209, nonCoffee: 130 },
  { month: "June", coffee: 214, nonCoffee: 140 },
]

const chartConfig = {
  coffee: {
    label: "Coffee",
    color: "#2563eb",
  },
  nonCoffee: {
    label: "Non-coffee",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const SocketSample = () => {

  const [num, setNum] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {

    socket.on('count', (data) => {
      console.log("Hillo", data);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  console.log(date);

  return (
    <div className='w-full h-[calc(100vh-16px)] flex justify-center items-center'>
      {/* <Button onClick={() => {
        setNum(prev => prev + 1);
        socket.emit('count', num, (response) => {
          console.log(response);
        });
      }}>Counter {num}</Button>

      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        fromDate={new Date()}
        className="rounded-md border"
      /> */}

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full max-w-[600px]">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="coffee" fill="var(--color-coffee)" radius={4} />
          <Bar dataKey="nonCoffee" fill="var(--color-nonCoffee)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default SocketSample