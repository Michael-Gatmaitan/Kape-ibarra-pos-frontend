"use client";
// import React, { useEffect, useState } from 'react'
// import { apiUrl } from '../../lib/apiUrl';

import { createBranchAction } from './action';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
// import { useBranch } from '../../lib/customHooks';

const BranchComponent = () => {
  // const branches = useBranch();

  return (
    <div className='grid gap-2'>

      <form action={createBranchAction} className='p-4 m-4 grid gap-2 rounded-md bg-purple-500' onSubmit={() => {
        console.log("Submiitted");
        window.location.reload();
        // router.refresh()
      }}>
        <h1 className='text-white font-bold text-3xl'>Add branch</h1>
        <Label className="text-white">Street Address</Label>
        <Input name='streetAddress' />
        <Label className="text-white">Baranggay</Label>
        <Input name='baranggay' />
        <Label className="text-white">City </Label>
        <Input name='city' />
        <Label className="text-white">Zip Code</Label>
        <Input name='zipCode' />

        <Button type='submit'>Create Branch</Button>

      </form>

    </div>
  )
}

export default BranchComponent
