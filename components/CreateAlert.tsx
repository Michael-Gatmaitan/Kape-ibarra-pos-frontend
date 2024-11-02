import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { CheckIcon } from 'lucide-react'

interface ICreateAlert {
  title: string,
  description: string
}

const CreateAlert = ({ title, description }: ICreateAlert) => {
  return (
    <Alert>
      <CheckIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}

export default CreateAlert
