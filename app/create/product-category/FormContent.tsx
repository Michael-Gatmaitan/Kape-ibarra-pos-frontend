"use client";

import React from 'react'
import CreateForm from '../CreateForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form'
import { categorySchema, TCategorySchema } from '../../../lib/types'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'

const FormContent = () => {

  const form = useForm<TCategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName: ""
    }
  });

  const onSubmit = (data: TCategorySchema) => {
    console.log(data);
  }
  return (
    <CreateForm cardTitle='Create product category' cardDescription='Create category for your products for managing them easily'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
          <FormField control={form.control} name='categoryName' render={({ field }) => (
            <FormItem>
              <FormLabel>
                Category name
              </FormLabel>
              <FormControl>
                <Input placeholder="Category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="grid gap-2 grid-cols-2 w-full">
            <Button variant='outline' onClick={() => { form.reset(); }}>Clear form</Button>
            <Button type='submit' disabled={form.formState.isSubmitting}>Create</Button>
          </div>
        </form>
      </Form>
    </CreateForm>
  )
}

export default FormContent