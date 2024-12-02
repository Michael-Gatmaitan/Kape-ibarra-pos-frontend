"use client";
import React from 'react'
import CreateForm from '../../create/CreateForm';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { useForm } from 'react-hook-form';
import { eWalletSchema, TEWalletSchema } from '../../../lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/ui/input';

const CreateEWalletForm = () => {

  const form = useForm<TEWalletSchema>({
    resolver: zodResolver(eWalletSchema),
    defaultValues: {
      eWalletName: '',
      eWalletNumber: ''
    }
  })

  const onSubmit = async (data: TEWalletSchema) => {
    console.log(data);
  }

  return (
    <CreateForm cardTitle='Create your ewallet'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full grid gap-2">
            <FormField
              control={form.control}
              name='eWalletName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-wallet name</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='eWalletNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

    </CreateForm>
  )
}

export default CreateEWalletForm
