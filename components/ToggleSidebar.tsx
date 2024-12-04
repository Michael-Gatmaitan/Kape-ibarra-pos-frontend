'use client';
import { useEffect } from 'react';
import { useSidebar } from './ui/sidebar';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

const ToggleSidebar = () => {
  const { toggleSidebar } = useSidebar();
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return (
    <Button onClick={() => toggleSidebar()} variant='outline'>
      <Menu />
    </Button>
  )
}

export default ToggleSidebar
