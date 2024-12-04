'use client';

import { useSidebar } from './ui/sidebar';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';

const ToggleSidebar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button onClick={() => toggleSidebar()} variant='outline'>
      <Menu />
    </Button>
  )
}

export default ToggleSidebar
