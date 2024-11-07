"use client";

import React, { useState } from "react";
import CreateForm from "../CreateForm";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, TProductSchema } from "../../../lib/types";
// import { apiUrl } from '../../../lib/apiUrl'
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import CreateAlert from "../../../components/CreateAlert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useCategories, useRawMaterial } from "../../../lib/customHooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { apiUrl } from "../../../lib/apiUrl";
import { IProduct } from "../../..";

// UUID
import { v4 as uuidv4 } from 'uuid';

interface IProductBody {
  productName: string;
  price: string;
  description?: string;
  categoryId: string;
}

interface IRecipeBody {
  quantityInUnitNeeded?: string;
  rawMaterialId?: string;
}
interface ICreateProductBody {
  productBody: IProductBody;
  recipeBody: IRecipeBody[];
}

interface ProductFormContentProps {
  type: "create" | "update";
  productDefaultValues?: TProductSchema & IProduct;
  recipesDefaultValues?: {
    rawMaterialId: string;
    quantityInUnitPcsNeeded: string;
  }[];
}

const FormContent = ({
  type,
  productDefaultValues,
  recipesDefaultValues,
}: ProductFormContentProps) => {
  const rawMaterials = useRawMaterial();
  const categories = useCategories();

  // States for confirmation of CREATED & UPDATED

  const form = useForm<TProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName:
        type === "update" ? `${productDefaultValues.productName}` : "",
      price: type === "update" ? `${productDefaultValues.price}` : "",
      description:
        type === "update" && productDefaultValues.description !== null
          ? `${productDefaultValues.description}`
          : "",
      categoryId: type === "update" ? `${productDefaultValues.categoryId}` : "",
      recipes: type === "update" ? recipesDefaultValues : [],
    },
  });

  const createProduct = async (createProductReqBody: ICreateProductBody) => {
    try {
      const createProductReq = await fetch(`${apiUrl}/product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createProductReqBody),
      });

      console.log(createProductReq.status);

      const res = await createProductReq.json();
      console.log(res);

      if ("error" in res) {
        form.setError("productName", { message: res.error });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const updateProduct = async (productId: string, updateProductReqBody: ICreateProductBody) => {
    console.log("Update product");

    const updateProductReq = await fetch(
      `${apiUrl}/product/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProductReqBody),
      },
    ).then((res) => res.json());

    console.log("Updated product: ", updateProductReq);
  }

  const deleteProduct = async (productId: string) => {
    const deleteReq = await fetch(`${apiUrl}/product/${productId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    },
    );

    const res = await deleteReq.json();
    console.log(res);
  };

  const [createSuccess, setCreateSuccess] = useState(false);

  // For handling dynamic raw materials
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "recipes",
  });

  const onSubmit = async (data: TProductSchema) => {
    const { productName, price, description, categoryId, recipes } = data;

    const createProductReqBody: ICreateProductBody = {
      productBody: {
        productName,
        price,
        description,
        categoryId,
      },
      recipeBody: recipes,
    };

    // Validate in api the data before creating it
    const validationRequest = await fetch('/api/schema/product', {
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

      if (errors.productName) {
        form.setError("productName", { type: 'server', message: errors.productName });
      } else if (errors.price) {
        form.setError("price", { type: 'server', message: errors.price });
      } else if (errors.description) {
        form.setError("description", { type: 'server', message: errors.description });
      } else if (errors.categoryId) {
        form.setError("categoryId", { type: 'server', message: errors.categoryId });
      } else if (errors.recipes) {
        console.log("Something in recipe");

      } else {
        console.log("something went wrong!");
      }

      return;
    }

    if (type === "create") {
      // Create our product
      await createProduct(createProductReqBody);
    } else if (type === "update") {
      // Update our product
      await updateProduct(productDefaultValues.id, createProductReqBody);
    }
  };

  return (
    <CreateForm
      cardTitle="Create Product"
      cardDescription="Create product with category"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          {/* PRODUCT NAME */}
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                {/* <FormDescription /> */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PRICE */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product description (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CATEGORY_ID */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product category" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={`${category.id}`}>
                        {category.categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* {errors.root && <Label>{errors.root.message}</Label>}
          {errors.rawMaterials && <Label className="text-red-500">{errors.rawMaterials.message}</Label>} */}

          {/* Raw materials */}
          {fields.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Product recipe #{index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {/* ID */}
                <FormField
                  control={form.control}
                  name={`recipes.${index}.id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* RAW MATERIAL ID OR NAME */}
                <FormField
                  control={form.control}
                  name={`recipes.${index}.rawMaterialId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select raw material" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {rawMaterials?.map((rawMaterial) => (
                            <SelectItem
                              key={rawMaterial.id}
                              value={`${rawMaterial.id}`}
                            >
                              {rawMaterial.materialName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* QUANTITY */}
                <FormField
                  control={form.control}
                  name={`recipes.${index}.quantityInUnitPcsNeeded`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Raw quantity"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button onClick={() => remove(index)}>Remove {index}</Button>
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={() =>
              append({ id: uuidv4(), rawMaterialId: "", quantityInUnitPcsNeeded: "1" })
            }
          >
            Add raw material
          </Button>

          <div className="grid gap-2 grid-cols-2 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (type === "create") {
                  form.reset();
                  setCreateSuccess(false);
                } else if (type === "update") {
                  // delete
                  deleteProduct(productDefaultValues.id);
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
              {form.formState.isSubmitting && type === "create" ?
                "Creating"
                : form.formState.isSubmitting && type === "update" ?
                  "Updating"
                  : type === "create" ?
                    "Create"
                    : type === "update" ?
                      "Update"
                      : null}
            </Button>
          </div>

          {createSuccess ? (
            <CreateAlert
              title="Product created successfully"
              description="Browse product page to see the list of branches"
            />
          ) : null}
          {/* <div className="grid gap-2">
            <Label>Product name</Label>
            <Input type="text" placeholder='Product name' {...register("productCategory")} />
          </div> */}
        </form>
      </Form>
    </CreateForm>
  );
};

export default FormContent;
