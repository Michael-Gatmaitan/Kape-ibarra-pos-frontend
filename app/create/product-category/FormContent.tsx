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
import { apiUrl } from '../../../lib/apiUrl';
// import { useRouter } from 'next/navigation';

interface CatergoryFormContentProps {
  type: "create" | "update";
  categoryDefaultValues?: TCategorySchema & ICategory;
}

const FormContent = ({ type, categoryDefaultValues }: CatergoryFormContentProps) => {
  // const router = useRouter();

  const form = useForm<TCategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName:
        type === "update" ? categoryDefaultValues.categoryName : "",
    }
  });

  const createCategory = async (createCategoryReqBody: TCategorySchema) => {
    try {
      const createProductReq = await fetch(`${apiUrl}/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createCategoryReqBody),
      });

      const res = await createProductReq.json();

      if ("error" in res) {
        form.setError("categoryName", { message: res.error });
      }

      // Create category successful
      console.log("New Category: ", res);
    } catch (err) {
      console.log(err);
    }
  }

  const updateCategory = async (categoryId: string, updateCategoryReqBody: Omit<ICategory, 'id'>) => {

    console.log("Update product category");

    const updateCategoryReq = await fetch(`${apiUrl}/category/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: updateCategoryReqBody })
    }).then(res => res.json());

    console.log("Updated category: ", updateCategoryReq);
  }

  const deleteProduct = async (categoryId: string) => {
    const deleteReq = await fetch(`${apiUrl}/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const res = await deleteReq.json();
    console.log("Res for delete", res);
  }

  const onSubmit = async (data: TCategorySchema) => {
    const { categoryName } = data;

    const validationRequest = await fetch('/api/schema/product-category', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const validationData = await validationRequest.json();

    if (validationData.errors) {
      const errors = validationData.errors;
      console.log(errors);

      if (errors.categoryName) {
        form.setError("categoryName", { type: 'server', message: errors.categoryName });
      } else {
        console.log("Something went wrong creating category!");
      }
    }

    if (type === 'create') {
      // create category
      await createCategory(data);
    } else if (type === 'update') {
      await updateCategory(categoryDefaultValues.id, { categoryName });
    }
  }

  if (type === 'update' && !categoryDefaultValues.id) {
    return <div>No default values for category provided</div>
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
            <Button type='button' variant='outline' onClick={() => {
              if (type === "create") {
                form.reset();
              } else if (type === "update") {
                // delete
                deleteProduct(categoryDefaultValues.id);
              }
            }}>
              {type === "create"
                ? "Clear form"
                : type === "update"
                  ? "Delete"
                  : null}
            </Button>
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