"use client";

import React from "react";
import CreateForm from "../CreateForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { categorySchema, TCategorySchema } from "../../../lib/types";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { ICategory } from "../../..";
import { apiUrl } from "../../../lib/apiUrl";
import { revalidateViewsProduct } from "../../../actions/revalidate";
import { getTokenClient } from "../../../lib/tokenAPI";
import { useToast } from "../../../@/hooks/use-toast";
import { Loader2 } from "lucide-react";
// import { useRouter } from 'next/navigation';

interface CategoryFormContentProps {
  type: "create" | "update";
  categoryDefaultValues?: TCategorySchema & ICategory;
}

const FormContent = ({
  type,
  categoryDefaultValues,
}: CategoryFormContentProps) => {
  // const router = useRouter();
  const { toast } = useToast();

  const form = useForm<TCategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName: type === "update" ? categoryDefaultValues.categoryName : "",
    },
  });

  const createCategory = async (createCategoryReqBody: TCategorySchema) => {
    const token = await getTokenClient();
    try {
      const createProductReq = await fetch(`${apiUrl}/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token
        },
        body: JSON.stringify(createCategoryReqBody),
      });

      const res = await createProductReq.json();

      if ("error" in res) {
        form.setError("categoryName", { message: res.error });
      }

      // Create category successful
      console.log("New Category: ", res);
      revalidateViewsProduct('/view/categories');

      toast({ title: "New category added", description: "You can now use the new category you crated." });
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  const updateCategory = async (
    categoryId: string,
    updateCategoryReqBody: Omit<ICategory, "id">,
  ) => {
    const token = await getTokenClient();
    console.log("Update product category");

    const updateCategoryReq = await fetch(`${apiUrl}/category/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify({ data: updateCategoryReqBody }),
    }).then((res) => res.json());

    console.log("Updated category: ", updateCategoryReq);
    revalidateViewsProduct('/view/categories');

    toast({ title: "Category updated", description: "You can now use the updated category you crated." });
    form.reset();
  };

  const deleteProduct = async (categoryId: string) => {
    const token = await getTokenClient();
    const deleteReq = await fetch(`${apiUrl}/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
    });

    const res = await deleteReq.json();
    console.log("Res for delete", res);
    revalidateViewsProduct('/view/categories');
  };

  const onSubmit = async (data: TCategorySchema) => {
    const { categoryName } = data;

    const validationRequest = await fetch("/api/schema/product-category", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const validationData = await validationRequest.json();

    if (validationData.errors) {
      const errors = validationData.errors;
      console.log(errors);

      if (errors.categoryName) {
        form.setError("categoryName", {
          type: "server",
          message: errors.categoryName,
        });
      } else {
        console.log("Something went wrong creating category!");
      }
    }

    if (type === "create") {
      // create category
      await createCategory(data);
    } else if (type === "update") {
      await updateCategory(categoryDefaultValues.id, { categoryName });
    }
  };

  if (type === "update" && !categoryDefaultValues.id) {
    return <div>No default values for category provided</div>;
  }

  return (
    <CreateForm
      cardTitle={`${type === "create" ? "Create" : "Update"} product category`}
      cardDescription="Create category for your products for managing them easily"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category name</FormLabel>
                <FormControl>
                  <Input placeholder="Category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-2 grid-cols-2 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (type === "create") {
                  form.reset();
                } else if (type === "update") {
                  // delete
                  deleteProduct(categoryDefaultValues.id);
                }
              }}
            >
              {type === "create"
                ? "Clear form"
                : type === "update"
                  ? "Delete"
                  : null}
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : null}
              {form.formState.isSubmitting && type === "create"
                ? "Creating"
                : form.formState.isSubmitting && type === "update"
                  ? "Updating"
                  : type === "create"
                    ? "Create"
                    : type === "update"
                      ? "Update"
                      : null}
            </Button>
          </div>
        </form>
      </Form>
    </CreateForm>
  );
};

// "Error in creating transaction: PrismaClientKnownRequestError: 
// Invalid `prisma.order.create()` invocation in
// C:\Users\Michael\Desktop\Projects\ibarra_pos\backend\controllers\orders\orderController.ts:63:43

//   60 const { totalAmount, totalTendered, change, paymentMethod } =
//   61   req.body.transactionBody;
//   62 
// → 63 const newOrder = await prisma.order.create(
// Foreign key constraint violated: `fk_order_employee (index)`"

export default FormContent;
