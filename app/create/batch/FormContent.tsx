"use client";
import React from 'react'
import { useForm } from 'react-hook-form';
import { TBatchSchema } from '../../../lib/types';
import { getTokenClient } from '../../../lib/tokenAPI';
import { apiUrl } from '../../../lib/apiUrl';
// import { revalidateViewsProduct } from '../../../actions/revalidate';
import CreateForm from '../CreateForm';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { IRawMaterial } from '../../..';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Input } from '../../../components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover';
import { Button } from '../../../components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../../../components/ui/calendar';
import { cn } from '../../../lib/utils';
import { format } from 'date-fns';

const FormContent = ({ rawMaterials, initialDateVal }: { rawMaterials: IRawMaterial[], initialDateVal: Date }) => {
  const form = useForm<TBatchSchema>({
    defaultValues: {
      batchQuantity: '',
      expirationDate: initialDateVal,
      rawMaterialId: '',
    }
  });;

  const createBatch = async (createBatchReqBody: TBatchSchema) => {
    const token = await getTokenClient();
    try {
      const createBatchReq = await fetch(`${apiUrl}/batch`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          authorization: token
        },
        body: JSON.stringify(createBatchReqBody),
      });

      const res = await createBatchReq.json();

      if ("error" in res) {
        form.setError("expirationDate", { message: res.error });
      }

      console.log("New batch | updated inventory: ", res);
    } catch (err) {
      console.log(err);
    }
  }

  const onSubmit = async (data: TBatchSchema) => {
    // const { } = data;
    const validationRequest = await fetch("/api/schema/batch", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const validationData = await validationRequest.json();

    if (validationData.errors) {
      const errors = validationData.errors;

      if (errors.batchQuantity) {
        form.setError("batchQuantity", { type: "server", message: errors.batchQuantity });
      } else if (errors.expirationDate) {
        form.setError("expirationDate", { type: "server", message: errors.expirationDate });
      } else if (errors.rawMaterialId) {
        form.setError("rawMaterialId", { type: "server", message: errors.rawMaterialId });
      } else {
        console.log("Something went wrong createing batch!");
      }
    }

    await createBatch(data);
  }

  return (
    <CreateForm
      cardTitle="Create batch"
      cardDescription="Use this form to update your raw material's inventory"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="rawMaterialId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select raw material</FormLabel>

                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select raw material" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {rawMaterials.map(rawMaterial => (
                      <SelectItem key={rawMaterial.id} value={`${rawMaterial.id}`}>
                        {rawMaterial.materialName}
                      </SelectItem>
                    )
                    )}
                  </SelectContent>
                </Select>
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
            <Button type="button" variant='outline' onClick={() => form.reset()}>Clear form</Button>
            <Button type="submit">Create batch</Button>
          </div>

        </form>
      </Form>
    </CreateForm>
  )
}

export default FormContent
