"use client";

import React, { useEffect, useState } from 'react'
import CreateForm from '../CreateForm'

import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, TProductSchema } from '../../../lib/types'
// import { apiUrl } from '../../../lib/apiUrl'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import CreateAlert from '../../../components/CreateAlert'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { useCategories, useRawMaterial } from '../../../lib/customHooks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';

const FormContent = () => {
  const rawMaterials = useRawMaterial();
  const categories = useCategories();

  useEffect(() => {
    console.log(rawMaterials);
  }, [rawMaterials]);

  const form = useForm<TProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      price: "",
      description: "",
      categoryId: "",
    }
  });

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

  const [createSuccess, setCreateSuccess] = useState(false);

  // For handling dynamic raw materials
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'rawMaterials'
  });

  const onSubmit = async (data: TProductSchema) => {
    console.log(data);
  }

  return (
    <CreateForm cardTitle='Create Product' cardDescription='Create product with category'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>

          {/* PRODUCT NAME */}
          <FormField control={form.control} name='productName' render={({ field }) => (
            <FormItem>
              <FormLabel>Product name</FormLabel>
              <FormControl>
                <Input placeholder='Product name' {...field} />
              </FormControl>
              {/* <FormDescription /> */}
              <FormMessage />
            </FormItem>
          )} />

          {/* PRICE */}
          <FormField control={form.control} name="price" render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type='number' placeholder='Product price' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* DESCRIPTION */}
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder='Product description (optional)' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* CATEGORY_ID */}
          <FormField control={form.control} name="categoryId" render={({ field }) => (
            <FormItem>
              <FormLabel>Product category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {categories?.map(category => (
                    <SelectItem key={category.id} value={`${category.id}`}>{category.categoryName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          {/* {errors.root && <Label>{errors.root.message}</Label>}
          {errors.rawMaterials && <Label className="text-red-500">{errors.rawMaterials.message}</Label>} */}

          {/* Raw materials */}
          {fields.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>New raw material</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-4'>

                {/* RAW MATERIAL ID OR NAME */}
                <FormField control={form.control} name={`rawMaterials.${index}.rawMaterialId`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material name</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select raw material" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {rawMaterials?.map(rawMaterial => (
                          <SelectItem key={rawMaterial.id} value={`${rawMaterial.id}`}>{rawMaterial.materialName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* QUANTITY */}
                <FormField control={form.control} name={`rawMaterials.${index}.quantityInUnitPerItem`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='Raw quantity' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button onClick={() => remove(index)}>Remove</Button>
              </CardContent>
            </Card>
          ))}

          <Button onClick={() => append({ rawMaterialId: '', quantityInUnitPerItem: 1 })}>Add raw material</Button>

          <div className="grid gap-2 grid-cols-2 w-full">
            <Button variant='outline' onClick={() => { form.reset(); setCreateSuccess(false); }}>Clear form</Button>
            <Button type='submit' disabled={form.formState.isSubmitting}>Create</Button>
          </div>

          {createSuccess ? (
            <CreateAlert
              title='Product created successfully'
              description='Browse product page to see the list of branches'
            />
          ) : null}
          {/* <div className="grid gap-2">
            <Label>Product name</Label>
            <Input type="text" placeholder='Product name' {...register("productCategory")} />
          </div> */}
        </form>
      </Form>
    </CreateForm>
  )
}

export default FormContent
