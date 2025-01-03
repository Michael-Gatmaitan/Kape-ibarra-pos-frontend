"use client";

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
// import { Button } from '../../components/ui/button';

interface CreateFormProp {
  children: React.ReactNode,
  cardTitle: string,
  cardDescription?: string,
}

const CreateForm = (props: CreateFormProp) => {
  const { children, cardTitle, cardDescription } = props;

  return (
    <Card className='w-full max-w-lg min-w-72'>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        {cardDescription && <CardDescription>{cardDescription}</CardDescription>}
      </CardHeader>

      <CardContent>
        {children}
      </CardContent>

      {/* <CardFooter>
        <Button>Clear Form</Button>
        <Button>Create</Button>
      </CardFooter> */}
    </Card>
  )
}

export default CreateForm
