"use client";
import React from 'react'
import { useSidebar } from './ui/sidebar'

const AppNavbar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className='w-full top-0 mx-[-16px] lg:mx-[-48px] xl:mx-[-160px] fixed h-24 border backdrop-blur-sm bg-slate-400 bg-opacity-50 z-50'>
      <button onClick={toggleSidebar}>Toggle sidebar</button>
    </div>
    // <div className='w-full fixed top-0'>hahahhhaha</div>
  )
}

export default AppNavbar
