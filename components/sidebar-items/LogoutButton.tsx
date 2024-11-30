"use client";
import React from 'react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { logout } from '../../lib/session';
import { useRouter } from 'next/navigation';
import { getTokenClient } from '../../lib/tokenAPI';
import { apiUrl } from '../../lib/apiUrl';
import { useUserPayload } from '../../lib/customHooks';

const LogoutButton = () => {
  const router = useRouter();
  const payload = useUserPayload();

  const handleLogout = async () => {
    const token = await getTokenClient();
    console.log(payload);
    await logout();

    const updateAuditLog = await fetch(`${apiUrl}/audit-log/${payload.person.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        roleName: payload.roleName
      })
    });

    const updateAuditLogRes = await updateAuditLog.json();
    console.log(updateAuditLogRes);
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
