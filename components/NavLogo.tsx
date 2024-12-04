"use client";

import { useTheme } from 'next-themes';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const NavLogo = () => {
  const [logo, setLogo] = useState('/assets/logo-light.png');

  const { theme } = useTheme();

  useEffect(() => {
    console.log(theme);
    setLogo(`/assets/logo-${theme}.png`);
  }, [theme]);

  return (
    <div className="logo w-8 absolute left-[50%] translate-x-[-50%]">
      <Image src={logo} width={34} height={36} alt="logo" />
    </div>
  )
}

export default NavLogo
