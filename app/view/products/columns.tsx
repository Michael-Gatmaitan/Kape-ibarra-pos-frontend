"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "../../..";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown, Edit } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { formatRelative, subDays } from "date-fns";
import { updateProductAvailabilityAction } from "../../../lib/action";

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    cell: ({ row }) => {
      return <div>{parseInt(row.id) + 1}</div>
    }
  },
  {
    accessorKey: "edit",
    header: "Edit product",
    cell: ({ row }) => {
      const id = row.getValue('id');
      return (
        <Button variant="link" className="hover:bg-blue-100" asChild>
          <Link href={`/update/product/${id.toString()}`}>
            <Edit />
          </Link>
        </Button>
      )
    }
  },
  {
    accessorKey: 'imagePath',
    header: "Product image",
    cell: ({ row }) => {
      const rowVal = row.getValue("imagePath");
      return <div className="w-10 h-10 overflow-hidden rounded-full">
        <Image src={rowVal.toString()} alt="product_img" height={40} width={40} />
      </div>
    }
  },
  {
    accessorKey: 'isAvailable',
    header: "Availability",
    cell: ({ row }) => {
      const val = row.getValue("isAvailable");
      const productId = row.getValue("id") as string;

      const updateAvailability = updateProductAvailabilityAction.bind(null, {
        availability: val,
        productId
      });

      return <div className="grid gap-1">
        <div className={`w-full border p-1 rounded-sm text-center ${val ? "bg-transparent" : "bg-destructive"}`}>{
          val ? "Available" : "Not available"
        }</div>
        <div className="grid gap-1">
          <Button variant="outline" className="p-2" onClick={() => updateAvailability({})}>
            Set as {!val ? `"Available"` : `"Not available"`}
          </Button>
        </div>
      </div>
    }
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const val = row.getValue('category') as { categoryName: string };

      return <div>{val.categoryName}</div>
    }
  }, {
    accessorKey: "productName",
    header: "Product name"
  }, {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">₱ {row.getValue('price')}</div>
  }, {
    accessorKey: "description",
    header: "Description"
  }, {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      // const date = new Date(row.getValue('createdAt'));
      return (
        <div className="text-nowrap">
          {/* {formatRelative(subDays(date, 0), new Date())} */}xxx
        </div>
      )
    }
  }
];