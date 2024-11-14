"use client";

import React, { useState } from "react";
import CreateForm from "../CreateForm";
import { Input } from "../../../components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { branchSchema, TBranchSChema } from "../../../lib/types";
import { Button } from "../../../components/ui/button";
import { apiUrl } from "../../../lib/apiUrl";
import CreateAlert from "../../../components/CreateAlert";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel,
} from "../../../components/ui/form";
import { IBranch } from "../../..";
// import { createBranchAction } from "../../branch/action";

interface BranchFormContentProps {
  type: "create" | "update";
  branchDefaultValues?: TBranchSChema & IBranch;
}

const FormContent = ({ type, branchDefaultValues }: BranchFormContentProps) => {
  const form = useForm<TBranchSChema>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      region: type === "update" ? `${branchDefaultValues.region}` : "",
      province: type === "update" ? `${branchDefaultValues.province}` : "",
      city: type === "update" ? `${branchDefaultValues.city}` : "",
      zipCode: type === "update" ? `${branchDefaultValues.zipCode}` : "",
      baranggay: type === "update" ? `${branchDefaultValues.baranggay}` : "",
      streetAddress:
        type === "update" ? `${branchDefaultValues.streetAddress}` : "",
      contactNumber:
        type === "update" ? `${branchDefaultValues.contactNumber}` : "",
    },
  });

  const [createSuccess, setCreateSuccess] = useState(true);

  const createBranch = async (data: TBranchSChema) => {
    console.log(data);

    const branchReq = await fetch(`${apiUrl}/branch`, {
      method: "POST",
      body: JSON.stringify({ ...data, zipCode: parseInt(data.zipCode) }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await branchReq.json();

    console.log(result);
  };

  const updateBranch = async (branchId: string, data: TBranchSChema) => {
    console.log(data);

    const updatedBranchReq = await fetch(`${apiUrl}/branch/${branchId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const updatedBranch = await updatedBranchReq.json();

    console.log(updatedBranch);
  };

  const deleteBranch = async (branchId: string) => {
    const deleteBranchReq = await fetch(`${apiUrl}/branch/${branchId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteBranchRes = await deleteBranchReq.json();

    console.log(deleteBranchRes);
  };

  const onSubmit = async (data: TBranchSChema) => {
    const response = await fetch("/api/schema/branch", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.ok === false) {
      console.log("Some error in branch");
    }

    if (responseData.errors) {
      const errors = responseData.errors;

      if (errors.region) {
        form.setError("region", { type: "server", message: errors.region });
      }

      if (errors.province) {
        form.setError("province", { type: "server", message: errors.province });
      }

      if (errors.city) {
        form.setError("city", { type: "server", message: errors.city });
      }

      if (errors.zipCode) {
        form.setError("zipCode", { type: "server", message: errors.zipCode });
      }

      if (errors.baranggay) {
        form.setError("baranggay", {
          type: "server",
          message: errors.baranggay,
        });
      }

      if (errors.streetAddress) {
        form.setError("streetAddress", {
          type: "server",
          message: errors.streetAddress,
        });
      } else {
        console.log("something went worong");
      }

      if (errors.contactNUmber) {
        form.setError("contactNumber", {
          type: "server",
          message: errors.contactNumber,
        });
      }
    }

    // const branchReq = await fetch(`${apiUrl}/branch`, {
    //   method: "POST",
    //   body: JSON.stringify({ ...data, zipCode: parseInt(data.zipCode) }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((res) => res.json());

    // if ("id" in branchReq) {
    //   setCreateSuccess(true);
    // }

    if (type === "create") {
      await createBranch(data);
    } else if (type === "update") {
      await updateBranch(branchDefaultValues.id, data);
    }
  };

  return (
    <CreateForm
      cardTitle={`${type === "create" ? "Create" : "Update"} Branch`}
      cardDescription={`${type === "create" ? "Create new" : "Update"} branch of store`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          {/* REGION */}
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <FormControl>
                  <Input placeholder="Branch region" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PROVINCE */}
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <Input placeholder="Branch province" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-2 grid-cols-2">
            {/* CITY */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Branch city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ZIPCODE */}
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip code</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Branch zip code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* BARANGGAY */}
          <FormField
            control={form.control}
            name="baranggay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Baranggay</FormLabel>
                <FormControl>
                  <Input placeholder="Branch baranggay" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* STREETADDRESS */}
          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street address</FormLabel>
                <FormControl>
                  <Input placeholder="Branch street address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CONTACT NUMBER */}
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact number</FormLabel>
                <FormControl>
                  <Input placeholder="Branch contact number" {...field} />
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
                  setCreateSuccess(false);
                } else if (type === "update") {
                  deleteBranch(branchDefaultValues.id);
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

          {createSuccess ? (
            <CreateAlert
              title="Branch created successfully"
              description="Browse branch page to see the list of branches"
            />
          ) : null}
        </form>
      </Form>
    </CreateForm>
  );
};
export default FormContent;
