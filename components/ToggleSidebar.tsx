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
    <div className="flex items-center lg:hidden">
      <Button onClick={() => toggleSidebar()} variant='ghost' className='p-0 rounded-none m-0'>
        <Menu size={40} />
      </Button>
    </div>
  )
}

export default ToggleSidebar
