"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "../../..";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown } from "lucide-react";

// export interface IProduct {
//   id: string;
//   imagePath: string;
//   catergoryId: string;
//   productName: string;
//   price: number;
//   description?: string;
//   createdAt: string;
// }

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    cell: ({ row }) => {
      return <div>{parseInt(row.id) + 1}</div>
    }
  }, {
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
  }, {
    accessorKey: "description",
    header: "Description"
  }, {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      // const formattedDate = ``;
      return <div>{date.toUTCString()}</div>
    }
  }
];