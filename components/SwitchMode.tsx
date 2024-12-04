"use client"
import { useTheme } from 'next-themes'
import React from 'react'
import { Switch } from './ui/switch';
import { Label } from './ui/label';

const SwitchMode = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className='flex items-center space-x-2'>
      <Switch
        id="theme"
        checked={theme === "light"}
        onCheckedChange={(e) => {
          setTheme(e.valueOf() ? "light" : "dark");
        }}
      />
      <Label htmlFor="theme">Switch mode</Label>
    </div>
  )
}

export default SwitchMode
