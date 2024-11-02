"use client";

import React, { useState } from 'react'
import CreateForm from '../CreateForm'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { branchSchema, TBranchSChema } from '../../../lib/types'
import { Button } from '../../../components/ui/button'
import { apiUrl } from '../../../lib/apiUrl';
import CreateAlert from '../../../components/CreateAlert';

const FormContent = () => {

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    },
    reset,
    setError
  } = useForm<TBranchSChema>({ resolver: zodResolver(branchSchema) })

  const [createSuccess, setCreateSuccess] = useState(true);

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
      <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
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
          <Button variant='outline' onClick={() => { reset(); setCreateSuccess(false) }}>Clear form</Button>
          <Button type="submit" disabled={isSubmitting}>Create</Button>
        </div>

        {createSuccess ? (
          <CreateAlert
            title='Branch created successfully'
            description='Browse branch page to see the list of branches'
          />
        ) : null}
      </form>
    </CreateForm>
  )
}
export default FormContent
