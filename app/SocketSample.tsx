"use client";
import React, { useEffect, useState } from 'react'
import socket from '../lib/socket';
import { Button } from '../components/ui/button';

const SocketSample = () => {

  const [num, setNum] = useState(0);

  useEffect(() => {

    socket.on('count', (data) => {
      console.log("Hillo", data);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div>
      <Button onClick={() => {
        setNum(prev => prev + 1);
        socket.emit('count', num, (response) => {
          console.log(response);
        });
      }}>Counter {num}</Button>
    </div>
  )
}

export default SocketSample
