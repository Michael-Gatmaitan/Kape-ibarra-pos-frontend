"use client";
import React from 'react'
import { useSidebar } from './ui/sidebar'
import Link from 'next/link';
import { Button } from './ui/button';
import { useUserPayload } from '../lib/customHooks';
import { Menu } from 'lucide-react';


const AppNavbar = () => {
  const { toggleSidebar } = useSidebar();
  const payload = useUserPayload();

  return (
    <nav className="fixed block bg-card inset-x-0 top-0 z-[100] border-b shadow-sm md:hidden">
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="flex justify-between h-14 items-center">

          {/* <nav className="hidden md:flex gap-4"
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Services
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Contact
            </Link>
          </nav> */}

          <Button onClick={() => toggleSidebar()} variant='outline'>
            <Menu />
          </Button>

          {!payload?.person?.id ? (
            <div className="flex items-center gap-4">

              <Button variant="outline" size="sm" asChild>
                <Link href='/'>
                  Log in
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href='/'>
                  Sign up
                </Link>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  )
  // return (
  //   // <div className='flex justify-end top-0 p-4 px-[-16px] lg:px-[-48px] xl:px-[-160px] fixed border backdrop-blur-sm bg-slate-400 bg-opacity-50 z-50 w-full'>
  //   <div className='w-full fixed top-0 flex justify-center border-b bg-white z-50 mx-[-16px] lg:mx-[-48px] xl:mx-[-160px]'>
  //     {/* lg:hidden */}
  //     <button onClick={toggleSidebar} className="block p-1 rounded-sm hover:bg-slate-500 transition bg-transparent
  //     absolute left-0 top-1/2 translate-y-[-50%] mx-4
  //     ">
  //       {open ? <X /> : <Menu />}
  //     </button>

  //     {/* <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'> */}
  //     <div className="">
  //       <Image src="/img/KapeIbarraLogo.png" alt="kape_ibarra" width={200} height={200} />
  //     </div>
  //   </div>
  //   // <div className='w-full fixed top-0'>hahahhhaha</div>
  // )
}

export default AppNavbar
