"use client";

import React from 'react'
import CreateForm from '../CreateForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form'
import { categorySchema, TCategorySchema } from '../../../lib/types'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { ICategory } from '../../..';

interface CatergoryFormContentProps {
  type: "create" | "update";
  categoryDefaultValues?: TCategorySchema & ICategory;
}

const FormContent = ({ type, categoryDefaultValues }: CatergoryFormContentProps) => {

  const form = useForm<TCategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName:
        type === "update" ? categoryDefaultValues.categoryName : "",
    }
  });

  // const createProduct = async (createCategoryReqBody: TCategorySchema) => {
  //   try {
  //     const createProductReq = await fetch(`${apiUrl}/category`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(createCategoryReqBody),
  //     });

  //     console.log(createProductReq.status);

  //     const res = await createProductReq.json();
  //     console.log(res);

  //     if ("error" in res) {
  //       form.setError("categoryName", { message: res.error });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const updateCategory = async (categoryId: string, updateCategoryReqBody: ICategory) => {

  //   console.log("Update product category");

  //   const updateCategoryReq = await fetch(`${apiUrl}/category/${categoryId}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updateCategoryReqBody)
  //   }).then(res => res.json());

  //   console.log("Updated category: ", updateCategoryReq);
  // }

  // const deleteProduct = async (categoryId: string) => {
  //   const deleteReq = await fetch(`${apiUrl}/category/${categoryId}`, {
  //     method: "DELETE"
  //   });

  //   const res = await deleteReq.json();
  //   console.log(res);
  // }

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
            <Button type='submit' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && type === "create" ?
                "Creating"
                : form.formState.isSubmitting && type === "update" ?
                  "Updating"
                  : type === "create" ?
                    "Create"
                    : type === "update" ?
                      "Update" :
                      null}
            </Button>
          </div>
        </form>
      </Form>
    </CreateForm>
  )
}

export default FormContent