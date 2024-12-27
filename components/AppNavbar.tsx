import React from 'react'
import Link from 'next/link';
import { Button } from './ui/button';
import { getUserPayloadServer } from '../actions/serverActions';
import NavLogo from './NavLogo';
// import { Menu } from 'lucide-react';
import ToggleSidebar from './ToggleSidebar';

const AppNavbar = async () => {
  const payload = await getUserPayloadServer();

  // ${sidebarState ? 'md:translate-x-64' : 'md:translate-x-0'}
  return (
    // md:hidden
    <nav className={`sticky block inset-x-0 top-0 border-b
    mx-4 lg:mx-8 xl:mx-12 2xl:mx-36
    bg-background md:py-2 z-50`}>
      <div className="w-full max-w-7xl relative">
        <div className="flex justify-between h-14 items-center">

          <ToggleSidebar />
          {/* // ) : <div />} */}

          <Link href="/" className="flex-1 flex justify-center lg:flex-none">
            <NavLogo />
          </Link>

          <div className="items-center gap-2 hidden md:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href='/'>
                Home
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href='/menu'>
                Shop
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href='/about'>
                Coffee
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href='/contact'>
                About
              </Link>
            </Button>
          </div>

          {/* {!payload?.person?.id ? ( */}
          {!payload?.person?.id ? (
            <div className="items-center gap-2 hidden md:flex">

              <Button variant="outline" size="sm" asChild>
                <Link href='/login'>
                  Log in
                </Link>
              </Button>
              <Button variant='secondary' size="sm" asChild>
                <Link href='/customer-signup'>
                  Sign up
                </Link>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  )
}

export default AppNavbar
