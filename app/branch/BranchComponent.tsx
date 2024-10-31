"use client";
// import React, { useEffect, useState } from 'react'
// import { apiUrl } from '../../lib/apiUrl';

import { createBranchAction } from './action';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
// import { useRouter, } from 'next/navigation';

// interface Branch {
//   id: number,
//   streetAddress: string,
//   barangay: string,
//   city: string,
//   zipCode: number
// }

const BranchComponent = () => {
  // const router = useRouter();

  // const [branches, setBranches] = useState<Branch[]>([]);

  // useEffect(() => {
  //   const getBranches = async () => {
  //     const reqBranches = await fetch(`${apiUrl}/branch`, { cache: "no-cache" });
  //     const resBranches: Branch[] = await reqBranches.json();

  //     setBranches(resBranches);
  //   }

  //   getBranches();
  // }, []);

  return (
    <div className='grid gap-2'>

      {/* {branches.map((branch) => <div key={branch.id} className='p-4 rounded-sm bg-slate-500'>
        <div>{branch.streetAddress}</div>
        <div>{branch.barangay}</div>
        <div>{branch.city}</div>
        <div>{branch.zipCode}</div>
      </div>)} */}


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
