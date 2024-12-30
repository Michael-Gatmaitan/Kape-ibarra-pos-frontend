"use client";
import React from 'react';
import { Button } from '../ui/button';
import { useSidebar } from '../ui/sidebar';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';

const ToggleSidebarInSidebar = () => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button className="hidden md:flex absolute right-0 translate-x-[70%] w-12 h-12 items-center" size="icon" onClick={() => toggleSidebar()}>
      {open ? <PanelRightOpen /> : <PanelRightClose />}
    </Button>
  );
};

export default ToggleSidebarInSidebar;