"use client";
import React from 'react'
import CreateForm from '../../create/CreateForm';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { useForm } from 'react-hook-form';
import { eWalletSchema, TEWalletSchema } from '../../../lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
// import { apiUrl } from '../../../lib/apiUrl';
// import { getTokenClient } from '../../../lib/tokenAPI';
import { useToast } from '../../../@/hooks/use-toast';
import { IEWallet } from '../../..';
import { updateEWallet } from '../../../lib/action';
import { Loader2 } from 'lucide-react';
// import { revalidatePath } from 'next/cache';

const CreateEWalletForm = ({ eWallet }: { eWallet: IEWallet }) => {
  const { toast } = useToast();
  const form = useForm<TEWalletSchema>({
    resolver: zodResolver(eWalletSchema),
    defaultValues: {
      name: '',
      phoneNumber: ''
    }
  })

  const onSubmit = async (data: TEWalletSchema) => {
    console.log(data);

    // update ewallet

    const updateEwallet = updateEWallet.bind(null, data);
    const updatedResult = await updateEwallet();

    // console.log(createEWalletRes);
    if (updatedResult?.phoneNumber) {
      toast({ title: "E-wallet information updated." });
    }
  }

  return (
    <CreateForm cardTitle={`${eWallet?.name ? "Update" : "Create"} your ewallet`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="w-full grid gap-2">
            <FormField
              control={form.control}
              name='name'
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
              name='phoneNumber'
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

          <div className="grid gap-2 grid-cols-2 w-full">
            <Button type="button" variant="outline">Clear</Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" /> Please wait...
                </>) : "Set e-wallet infos"}
            </Button>
          </div>
        </form>
      </Form>
    </CreateForm>
  )
}

export default CreateEWalletForm
