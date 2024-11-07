"use client";

import React, { useState } from 'react'
import CreateForm from '../CreateForm'
import { Input } from '../../../components/ui/input'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { branchSchema, TBranchSChema } from '../../../lib/types'
import { Button } from '../../../components/ui/button'
import { apiUrl } from '../../../lib/apiUrl';
import CreateAlert from '../../../components/CreateAlert';
import { Form, FormField, FormControl, FormMessage, FormItem, FormLabel } from '../../../components/ui/form';

const FormContent = () => {

  const form = useForm<TBranchSChema>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      region: "",
      province: "",
      city: "",
      zipCode: "",
      baranggay: "",
      streetAddress: "",
      contactNumber: ""
    }
  })

  const [createSuccess, setCreateSuccess] = useState(true);

  const onSubmit = async (data: TBranchSChema) => {
    const response = await fetch('/api/schema/branch', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const responseData = await response.json();

    if (responseData.ok === false) {
      console.log("Some error in branch");
    }

    if (responseData.errors) {
      const errors = responseData.errors;

      if (errors.region) {
        form.setError("region", { type: "server", message: errors.region });
      }

      if (errors.province) {
        form.setError("province", { type: "server", message: errors.province });
      }

      if (errors.city) {
        form.setError("city", { type: "server", message: errors.city });
      }

      if (errors.zipCode) {
        form.setError("zipCode", { type: "server", message: errors.zipCode });
      }

      if (errors.baranggay) {
        form.setError("baranggay", { type: "server", message: errors.baranggay });
      }

      if (errors.streetAddress) {
        form.setError("streetAddress", { type: "server", message: errors.streetAddress });
      }

      if (errors.contactNUmber) {
        form.setError("contactNumber", { type: "server", message: errors.contactNumber });
      }
    }

    const branchReq = await fetch(`${apiUrl}/branch`, {
      method: 'POST',
      body: JSON.stringify({ ...data, zipCode: parseInt(data.zipCode) }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());

    if ('id' in branchReq) {
      setCreateSuccess(true);
    }
  }

  return (
    <CreateForm cardTitle='Create Branch' cardDescription='Create new branch of store'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>

          {/* REGION */}
          <FormField control={form.control} name="region" render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Input placeholder='Branch region' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* PROVINCE */}
          <FormField control={form.control} name="province" render={({ field }) => (
            <FormItem>
              <FormLabel>Province</FormLabel>
              <FormControl>
                <Input placeholder='Branch province' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className='grid gap-2 grid-cols-2'>
            {/* CITY */}
            <FormField control={form.control} name="city" render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder='Branch city' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* ZIPCODE */}
            <FormField control={form.control} name="zipCode" render={({ field }) => (
              <FormItem>
                <FormLabel>Zip code</FormLabel>
                <FormControl>
                  <Input type="number" placeholder='Branch zip code' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          {/* BARANGGAY */}
          <FormField control={form.control} name="baranggay" render={({ field }) => (
            <FormItem>
              <FormLabel>Baranggay</FormLabel>
              <FormControl>
                <Input placeholder='Branch baranggay' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* STREETADDRESS */}
          <FormField control={form.control} name="streetAddress" render={({ field }) => (
            <FormItem>
              <FormLabel>Street address</FormLabel>
              <FormControl>
                <Input placeholder='Branch street address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* CONTACT NUMBER */}
          <FormField control={form.control} name="contactNumber" render={({ field }) => (
            <FormItem>
              <FormLabel>Contact number</FormLabel>
              <FormControl>
                <Input placeholder='Branch contact number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="grid gap-2 grid-cols-2 w-full">
            <Button variant='outline' onClick={() => { form.reset(); setCreateSuccess(false) }}>Clear form</Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>Create</Button>
          </div>

          {createSuccess ? (
            <CreateAlert
              title='Branch created successfully'
              description='Browse branch page to see the list of branches'
            />
          ) : null}
        </form>
      </Form>
    </CreateForm>
  )
}
export default FormContent
