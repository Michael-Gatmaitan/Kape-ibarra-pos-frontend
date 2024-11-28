"use client";
import React from "react";
import { rawMaterialSchema, TRawMaterialSchema } from "../../../lib/types";
import { IRawMaterial } from "../../..";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateForm from "../CreateForm";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { apiUrl } from "../../../lib/apiUrl";
import { revalidateViewsProduct } from "../../../actions/revalidate";
import { getTokenClient } from "../../../lib/tokenAPI";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { cn } from "../../../lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../../components/ui/calendar";

interface IRawMaterialBody {
  materialName: string;
  rawPrice: string;
  quantityInUnitPerItem: string;
}

interface RawMaterialFormContentProps {
  type: "create" | "update";
  rawMaterialDefaultValues?: TRawMaterialSchema & IRawMaterial;
}

// interface ICreateRawMaterialBody {
//   materialName: string;
//   rawPrice: string;
//   quantityInUnitPerItem: string;
// }

const FormContent = ({
  type,
  rawMaterialDefaultValues,
}: RawMaterialFormContentProps) => {
  const form = useForm<TRawMaterialSchema>({
    resolver: zodResolver(rawMaterialSchema),
    defaultValues: {
      materialName:
        type === "update" ? `${rawMaterialDefaultValues.materialName}` : "",
      rawPrice: type === "update" ? `${rawMaterialDefaultValues.rawPrice}` : "",
      quantityInUnitPerItem:
        type === "update"
          ? `${rawMaterialDefaultValues.quantityInUnitPerItem}`
          : "",

      batchQuantity: '',
      expirationDate: new Date(),
      reorderLevel: '',
    },
  });

  const createRawMaterial = async (
    createRawMaterialReqBody: TRawMaterialSchema,
  ) => {
    const token = await getTokenClient();
    try {
      const createRawMaterialReq = await fetch(`${apiUrl}/raw-material`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          authorization: token
        },
        body: JSON.stringify(createRawMaterialReqBody),
      });

      const res = await createRawMaterialReq.json();

      if ("error" in res) {
        form.setError("materialName", { message: res.error });
      }
      console.log("Raw material created successfully");
      revalidateViewsProduct('/view/raw-materials');
    } catch (err) {
      console.log(err);
    }
  };

  const updateRawMaterial = async (
    rawMaterialId: string,
    updateRawMaterialBody: IRawMaterialBody,
  ) => {
    console.log(rawMaterialId, updateRawMaterialBody);
    const token = await getTokenClient();

    const updateRawMaterialReq = await fetch(
      `${apiUrl}/raw-material/${rawMaterialId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token
        },
        body: JSON.stringify(updateRawMaterialBody),
      },
    ).then((res) => res.json());

    console.log(`Updated raw material: ${updateRawMaterialReq}`);

    if (updateRawMaterialReq?.id) {
      console.log("Raw material updated successfully");
    }
    revalidateViewsProduct('/view/raw-materials');
  };

  const deleteRawMaterial = async (rawMaterialId: string) => {
    const token = await getTokenClient();
    const deletedRawMaterial = await fetch(
      `${apiUrl}/raw-material/${rawMaterialId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: token
        },
      },
    );
    console.log(deletedRawMaterial);
    revalidateViewsProduct('/view/raw-materials');
  };

  const onSubmit = async (data: TRawMaterialSchema) => {
    console.log(data);
    const validationRequest = await fetch("/api/schema/raw-material", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const validationData = await validationRequest.json();
    console.log(validationData);

    if (validationData.errors) {
      const errors = validationData.errors;

      if (errors.materialName) {
        form.setError("materialName", {
          type: "server",
          message: errors.materialName,
        });
      } else if (errors.rawPrice) {
        form.setError("rawPrice", { type: "server", message: errors.rawPrice });
      } else if (errors.quantityInUnitPerItem) {
        form.setError("quantityInUnitPerItem", {
          type: "server",
          message: errors.quantityInUnitPerItem,
        });
      } else {
        console.log("Something went wrong in raw material validation");
      }

      return;
    }

    const { materialName, rawPrice, quantityInUnitPerItem } = data;

    const rawMaterialCreateBody = {
      materialName,
      rawPrice,
      quantityInUnitPerItem,
    };

    console.log(data);
    if (type === "create") {
      await createRawMaterial(data);
    } else if (type === "update") {
      await updateRawMaterial(
        rawMaterialDefaultValues.id,
        rawMaterialCreateBody,
      );
    }
  };

  return (
    <CreateForm
      cardTitle={`${type === "create" ? "Create" : "Update"} raw material`}
      cardDescription="Raw material for products"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          {/* Raw material name */}
          <FormField
            control={form.control}
            name="materialName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material name</FormLabel>
                <FormControl>
                  <Input placeholder="Material name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rawPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raw price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Raw price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantityInUnitPerItem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Quantity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reorderLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reorder level</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Quantity of stock to notify you to reorder" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="batchQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batch quantity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Quantity of stock to notify you to reorder" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Expiration date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      fromDate={new Date()}
                      // disabled={(date) =>
                      //   date > new Date() || date < new Date("1900-01-01")
                      // }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This will be used for monitoring your raw materials
                </FormDescription>
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
                  // setCreateSuccess(false);
                } else if (type === "update") {
                  // delete
                  deleteRawMaterial(rawMaterialDefaultValues.id);
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

export default FormContent;
