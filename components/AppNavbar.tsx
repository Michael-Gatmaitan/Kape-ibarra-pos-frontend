import React from 'react'
import Link from 'next/link';
import { Button } from './ui/button';
import ToggleSidebar from './ToggleSidebar';
// import { cookies } from 'next/headers';
// import { verifySession } from '../lib/session';
import { getUserPayloadServer } from '../actions/serverActions';
// import { cookies } from 'next/headers';


const AppNavbar = async () => {
  // const token = cookies().get('token')?.value;
  // const payload = await verifySession(token);
  const payload = await getUserPayloadServer();

  return (
    <nav className="fixed block bg-card inset-x-0 top-0 z-[100] border-b shadow-sm md:hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">

          {/* <Button onClick={() => toggleSidebar()} variant='outline'>
            <Menu />
          </Button> */}
          <ToggleSidebar />

          {/* {!payload?.person?.id ? ( */}
          {!payload?.person?.id ? (
            <div className="flex items-center gap-4">

              <Button variant="outline" size="sm" asChild>
                <Link href='/'>
                  Log in
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href='/'>
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
