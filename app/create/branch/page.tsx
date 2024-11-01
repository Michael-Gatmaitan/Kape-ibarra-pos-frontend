import React from 'react';
import FormContent from './FormContent'
import { createBranchAction } from '../../branch/action';
import { ModeToggle } from '../../../components/ModeToggle';

const page = () => {
  return (
    <div>
      <ModeToggle />
      <FormContent action={createBranchAction} />
    </div>
  )
}

export default page
