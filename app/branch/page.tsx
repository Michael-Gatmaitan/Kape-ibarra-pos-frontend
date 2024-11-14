import React from "react";
import { apiUrl } from "../../lib/apiUrl";
// import { createBranchAction } from './action';
// import { Input } from '../../components/ui/input';
// import { Button } from '../../components/ui/button';
// import { Label } from '../../components/ui/label';
import BranchComponent from "./BranchComponent";
import { IBranch } from "../..";

export const dynamic = "force-dynamic";

const Page = async () => {
  const req = await fetch(`${apiUrl}/branch`, { cache: "no-store" });

  if (!req.ok) return <div>SOmething went wrong fetching branches</div>;
  const res: IBranch[] = await req.json();

  return (
    <div>
      {res.map((branch) =>
        Object.keys(branch).map((d) => (
          <div key={d} className="p-2 bg-purple-500 text-white">
            {branch[d]}
          </div>
        )),
      )}

      {/* <form action={createBranchAction} className='p-4 m-4 grid gap-2 rounded-md bg-purple-500'>
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

      </form> */}
      <BranchComponent />
    </div>
  );
};

export default Page;
