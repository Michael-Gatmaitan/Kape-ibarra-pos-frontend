"use client";

import React, { SyntheticEvent, useState } from "react";
import CreateForm from "../CreateForm";
// import Image from "next/image";

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
import { revalidateViewsProduct } from "../../../actions/revalidate";
// import { useToast } from "../../../@/hooks/use-toast";

// UUID
// import { v4 as uuidv4 } from "uuid";

interface IProductBody {
  productName: string;
  price: string;
  description?: string;
  categoryId: string,
  imagePath: string
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

  // const toast = useToast();

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
      recipes: type === "update" ? recipesDefaultValues : [],
      categoryId: type === "update" ? productDefaultValues.categoryId : ""
    },
  });

  const [imageUrl, setImageUrl] = useState<string>('');

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
        return;
      }

      // successfully
      form.reset();
      // router.back();
      revalidateViewsProduct('/view/products');
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async (
    productId: string,
    updateProductReqBody: ICreateProductBody,
  ) => {
    console.log("Update product");

    const updateProductReq = await fetch(`${apiUrl}/product/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProductReqBody),
    }).then((res) => res.json());

    console.log("Updated product: ", updateProductReq);
    // revalidatePath('/views/product');
    revalidateViewsProduct('/view/products');
  };

  const deleteProduct = async (productId: string) => {
    const deleteReq = await fetch(`${apiUrl}/product/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await deleteReq.json();
    console.log(res);
    revalidateViewsProduct('/view/products');
  };

  const [createSuccess, setCreateSuccess] = useState(false);

  // For handling dynamic raw materials
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "recipes",
  });

  const onSubmit = async (data: TProductSchema) => {
    const { productName, price, description, categoryId, recipes } = data;

    // Validate in api the data before creating it
    const validationRequest = await fetch("/api/schema/product", {
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

      if (errors.productName) {
        form.setError("productName", {
          type: "server",
          message: errors.productName,
        });
      } else if (errors.price) {
        form.setError("price", { type: "server", message: errors.price });
      } else if (errors.categoryId) {
        form.setError("categoryId", {
          type: "server",
          message: errors.categoryId,
        });
      } else if (errors.description) {
        form.setError("description", {
          type: "server",
          message: errors.description,
        });
      } else if (errors.recipes) {
        console.log("Something in recipe");
      } else {
        console.log("something went wrong!");
      }

      return;
    }

    const createProductReqBody: ICreateProductBody = {
      productBody: {
        productName,
        price,
        description,
        categoryId,
        imagePath: imageUrl
      },
      recipeBody: recipes,
    };

    if (type === "create" && uploaded) {
      // Create our product
      console.log(categoryId);
      await createProduct(createProductReqBody);
    } else if (type === "update") {
      // Update our product
      await updateProduct(productDefaultValues.id, createProductReqBody);
    }
  };

  // Handle uploading image
  const handleUploadImage = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    console.log(file, formData);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("File uploaded successfully!");
      setUploaded(true);
    } else {
      console.error("File upload failed");
    }

    const result = await response.json();
    console.log(result);

    if (result.imagePath) {
      setUploaded(true);
      setImageUrl(result.imagePath);
    } else {
      alert("Something went wrong uplodaing image");
    }
  };

  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  return (
    <CreateForm
      cardTitle={`${type === "create" ? "Create" : "Update"} Product`}
      cardDescription={`${type === "create" ? "Create" : "Update"} Product`}
    >

      {/* <Image src="/uploads/1731163041423IMG_20240302_111608.jpg" alt="AS" width={50} height={50} /> */}

      <Form {...form}>
        {/* <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 grid-cols-2"> */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">

          {/* PRODUCT NAME */}

          <div className="w-full grid gap-2">
            <FormField
              // control={form.control}
              name="productImage"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Product image</FormLabel>
                  <FormControl>
                    <Input
                      // className="bg-neutral-900"
                      type="file"
                      // {...fieldProps}
                      accept="image/png, image/jpeg, image/jpg"

                      onChange={(event) => {
                        onChange(event.target.files && event.target.files[0])
                        console.log(event.target.files && event.target.files[0]);
                        setFile(event.target.files && event.target.files[0])
                      }
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="button" onClick={handleUploadImage} disabled={type === "create" && uploaded || !file}>Upload</Button>
          </div>

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
                {/* <FormField */}
                {/*   control={form.control} */}
                {/*   name={`recipes.${index}.id`} */}
                {/*   render={({ field }) => ( */}
                {/*     <FormItem> */}
                {/*       <FormLabel>ID</FormLabel> */}
                {/*       <FormControl> */}
                {/*         <Input {...field} disabled /> */}
                {/*       </FormControl> */}
                {/*       <FormMessage /> */}
                {/*     </FormItem> */}
                {/*   )} */}
                {/* /> */}

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
              append({
                rawMaterialId: "",
                quantityInUnitPcsNeeded: "1",
              })
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
            <Button type="submit" disabled={form.formState.isSubmitting || (type === "create" && !uploaded)}>
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
