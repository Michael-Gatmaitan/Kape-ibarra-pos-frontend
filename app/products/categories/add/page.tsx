"use client";
import React, { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client';
import { Button } from '../../../../components/ui/button';
import { apiUrl } from '../../../../lib/apiUrl';

const socket: Socket = io('http://localhost:9999');

const Page = () => {
  const [c, sc] = useState(0);

  useEffect(() => {
    socket.on('newCategory', (param) => {
      console.log("New category triggered", param);
      sc(p => p + 1);
    });

    return () => {
      socket.off('newCategory');
    }
  }, []);

  return (
    <div>
      <Button onClick={async () => {
        await fetch(`${apiUrl}/product/categories/add`, {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({ categoryName: "TANGINAAA" })
        })
      }}>Add {c}</Button>
    </div>
  )
}

export default Page
