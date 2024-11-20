import React from 'react'
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

interface ViewHeaders {
  headerTitle: string,
  buttonUrl?: string,
  buttonTitle?: string
}

const ViewHeaders = (props: ViewHeaders) => {
  const {
    headerTitle, buttonUrl, buttonTitle
  } = props;

  return (
    <div className='w-full flex justify-between'>
      <div className="text-2xl lg:text-4xl font-bold mb-4">{headerTitle}</div>

      {buttonUrl ? (
        <Button asChild>
          <Link href={buttonUrl}>
            <Plus />
            <span className='ml-2'>{buttonTitle}</span>
          </Link>
        </Button>
      ) : null}
    </div>
  )
}

export default ViewHeaders
