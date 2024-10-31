import React from 'react'
import { Button } from '../../components/ui/button'
import { Plus } from 'lucide-react'

const page = () => {
  return (
    <div className='container'>

      <Button variant='outline'>
        <Plus />
      </Button>
    </div>
  )
}

export default page
