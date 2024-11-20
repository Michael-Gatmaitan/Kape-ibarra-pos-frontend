'use client';

import React from 'react'
import { useSidebar } from './ui/sidebar';
import { Button } from './ui/button';

const ToggleSidebar = () => {
  const { open, setOpen } = useSidebar();
  return (
    <Button onClick={() => setOpen(!open)}>
      Toggle sidebar
    </Button>
  )
}

export default ToggleSidebar
