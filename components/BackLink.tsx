import React from 'react'
import { Button } from './ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface IBackLinkProps {
  href: string,
  buttonTitle: string
}

const BackLink = ({ href, buttonTitle }: IBackLinkProps) => {
  return (
    <Button variant='ghost' asChild className='text-lg font-medium mb-2'>
      <Link href={href}>
        <ChevronLeft />
        {buttonTitle}
      </Link>

    </Button>
  )
}

export default BackLink
