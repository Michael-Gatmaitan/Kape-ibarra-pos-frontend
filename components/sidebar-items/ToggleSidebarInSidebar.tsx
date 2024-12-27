"use client";
import React from 'react';
import { Button } from '../ui/button';
import { useSidebar } from '../ui/sidebar';

const ToggleSidebarInSidebar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button className="hidden md:block absolute right-0 translate-x-[70%] w-12 h-12 bg-red-700" onClick={() => toggleSidebar()}>ASD</Button>
  );
};

export default ToggleSidebarInSidebar;