"use client";
import React from 'react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { logout } from '../../lib/session';
import { useAppDispatch } from '../../lib/hooks';
import { setLoggedIn } from '../../lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    dispatch(setLoggedIn(false));
    // navigate to login
    router.replace('/login');
  }

  return (
    <Button className='w-full' variant='destructive' onClick={handleLogout}>
      <LogOut />
      <span>Log out</span>
    </Button>
  )
}

export default LogoutButton