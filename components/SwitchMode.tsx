"use client"
import { useTheme } from 'next-themes'
import React from 'react'
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import ToggleSidebarInSidebar from './sidebar-items/ToggleSidebarInSidebar';

const SwitchMode = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className='flex items-center space-x-2 relative'>
      <Switch
        id="theme"
        checked={theme === "light"}
        onCheckedChange={(e) => {
          setTheme(e.valueOf() ? "light" : "dark");
        }}
      />
      <Label htmlFor="theme">Switch mode</Label>

      <ToggleSidebarInSidebar />
    </div>
  )
}

export default SwitchMode
