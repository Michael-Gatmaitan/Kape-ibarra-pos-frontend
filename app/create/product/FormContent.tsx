"use client";

import React, { useEffect, useState } from 'react'
import CreateForm from '../CreateForm'

import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, TProductSchema } from '../../../lib/types'
// import { apiUrl } from '../../../lib/apiUrl'
import { Label } from '../../../components/ui/label'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import CreateAlert from '../../../components/CreateAlert'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { useRawMaterial } from '../../../lib/customHooks';

const FormContent = () => {
  const rawMaterials = useRawMaterial();

  useEffect(() => {
    console.log(rawMaterials);
  }, [rawMaterials]);

  const {
    control,
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    },
    reset,
    // setError
  } = useForm<TProductSchema>({ resolver: zodResolver(productSchema) });

  const [createSuccess, setCreateSuccess] = useState(true);

  // For handling dynamic raw materials
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rawMaterials'
  });

  const onSubmit = async (data: TProductSchema) => {
    console.log(data);
  }

  return (
    <div>
      <CreateForm cardTitle='Create Product' cardDescription='Create product with category'>
        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
          <div className="grid gap-2">
            <Label>Product name</Label>
            <Input required type="text" placeholder='Product name' {...register("productName")} />
          </div>

          <div className="grid gap-2">
            <Label>Price</Label>
            <Input required type="number" placeholder='Price' {...register("price")} />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Input required type="text" placeholder='Product description (optional)' {...register("description")} />
          </div>

          {/* Dropdown for product category */}
          <div className="grid gap-2">
            <Label>Product category</Label>
            <Input required type="text" placeholder='Select category' {...register("categoryId")} />
          </div>

          {/* Raw materials */}
          {fields.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>New raw material</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid gap-2'>
                  <Label>Material Name</Label>
                  <Input required type="text" {...register(`rawMaterials.${index}.materialName`)} />
                  {errors.rawMaterials?.[index]?.materialName && <Label>{errors.rawMaterials?.[index]?.materialName.message}</Label>}
                </div>

                <div className="grid gap-2">
                  <Label>Quantity</Label>
                  <Input required type='number' {...register(`rawMaterials.${index}.quantityInUnitPerItem`)} />
                  {errors.rawMaterials?.[index]?.quantityInUnitPerItem && <Label>{errors.rawMaterials?.[index]?.quantityInUnitPerItem.message}</Label>}
                </div>

                <Button onClick={() => remove(index)}>Remove</Button>
              </CardContent>
            </Card>
          ))}

          <Button onClick={() => append({ materialName: '', quantityInUnitPerItem: 1 })}>Add raw material</Button>

          <div className="grid gap-2 grid-cols-2 w-full">
            <Button variant='outline' onClick={() => { reset(); setCreateSuccess(false); }}>Clear form</Button>
            <Button type='submit' disabled={isSubmitting}>Create</Button>
          </div>

          {createSuccess ? (
            <CreateAlert
              title='Product created successfully'
              description='Browse product page to see the list of branches'
            />
          ) : null}
          {/* <div className="grid gap-2">
            <Label>Product name</Label>
            <Input required type="text" placeholder='Product name' {...register("productCategory")} />
          </div> */}
        </form>
      </CreateForm>
    </div >
  )
}

export default FormContent
