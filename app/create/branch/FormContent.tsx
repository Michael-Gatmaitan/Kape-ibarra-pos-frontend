"use client";

import React from 'react'
import CreateForm from '../CreateForm'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { branchSchema, TBranchSChema } from '../../../lib/types'
import { Button } from '../../../components/ui/button'

const FormContent = (props: { action: (formData: FormData) => Promise<void> }) => {
  const { action } = props;

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    },
    setError
  } = useForm<TBranchSChema>({ resolver: zodResolver(branchSchema) })

  const onSubmit = async (data: TBranchSChema) => {
    const response = await fetch('/api/branch', {
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
        setError("region", { type: "server", message: errors.region });
      }

      if (errors.province) {
        setError("province", { type: "server", message: errors.province });
      }

      if (errors.city) {
        setError("city", { type: "server", message: errors.city });
      }

      if (errors.zipCode) {
        setError("zipCode", { type: "server", message: errors.zipCode });
      }

      if (errors.baranggay) {
        setError("baranggay", { type: "server", message: errors.baranggay });
      }

      if (errors.streetAddress) {
        setError("streetAddress", { type: "server", message: errors.streetAddress });
      }

      if (errors.contactNUmber) {
        setError("contactNumber", { type: "server", message: errors.contactNumber });
      }
    }
  }


  return (
    <CreateForm cardTitle='Create Branch' cardDescription='Create new branch of store' onSubmit={handleSubmit(onSubmit)}>
      <form action={action} className='grid gap-3'>
        <div className='grid gap-2'>
          <Label>Region</Label>
          <Input required type='text' placeholder='Region' {...register('region')} />
          {errors.region && <Label className='text-red-600'>{errors.region.message}</Label>}
        </div>

        <div className='grid gap-2'>
          <Label>Province</Label>
          <Input required type='text' placeholder='Province' {...register('province')} />
          {errors.province && <Label className='text-red-600'>{errors.province.message}</Label>}
        </div>

        <div className='grid gap-2 grid-cols-2'>
          <div className="grid gap-2">
            <Label>City</Label>
            <Input required type='text' placeholder='City' {...register('city')} />
            {errors.city && <Label className='text-red-600'>{errors.city.message}</Label>}
          </div>

          <div className="grid gap-2">
            <Label>Zip Code</Label>
            <Input required type='number' placeholder='ZipCode' {...register('zipCode')} />
            {errors.zipCode && <Label className='text-red-600'>{errors.zipCode.message}</Label>}
          </div>
        </div>

        <div className='grid gap-2'>
          <Label>Baranggay</Label>
          <Input required type='text' placeholder='Baranggay' {...register('baranggay')} />
          {errors.baranggay && <Label className='text-red-600'>{errors.baranggay.message}</Label>}
        </div>

        <div className='grid gap-2'>
          <Label>Street Address</Label>
          <Input required type='text' placeholder='Street Address' {...register('streetAddress')} />
          {errors.streetAddress && <Label className='text-red-600'>{errors.streetAddress.message}</Label>}
        </div>

        <div className='grid gap-2'>
          <Label>Contact number</Label>
          <Input required type='text' placeholder='Contact number' {...register('contactNumber')} />
          {errors.contactNumber && <Label className='text-red-600'>{errors.contactNumber.message}</Label>}
        </div>

        <div className="grid gap-2 grid-cols-2 w-full">
          <Button variant='outline'>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>Create</Button>
        </div>
      </form>
    </CreateForm>
  )
}
export default FormContent
