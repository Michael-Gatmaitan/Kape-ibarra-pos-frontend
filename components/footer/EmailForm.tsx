import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

const EmailForm = () => {
  return (
    <div className="grid gap-2 md:gap-3">
      <div className="text-2xl md:text-3xl font-bold mb-1 text-white">Email us</div>

      <form className="grid gap-2 md:gap-3">
        <Input type="email" placeholder="Your email" />
        <Input type="text" placeholder="Subject (Optional)" />
        <Textarea placeholder="Message" />
        <div className="flex gap-2 lg:gap-3">
          <Button type='submit'>Subscribe</Button>
          <Button type='button'>Clear</Button>
        </div>
      </form>
    </div>
  )
}

export default EmailForm
