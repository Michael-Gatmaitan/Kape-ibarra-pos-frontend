"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import { ICategoryWithProducts } from "./page";
// import { ICategory, IProduct } from "../../..";

export const columns: ColumnDef<ICategoryWithProducts>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    cell: ({ row }) => {
      return <div>{parseInt(row.id) + 1}</div>
    }
  }, {
    accessorKey: 'edit',
    header: 'Edit product category',
    cell: ({ row }) => {
      const id = row.getValue('id');
      return (
        <Button variant="link" className="hover:bg-blue-100" asChild>
          <Link href={`/update/category/${id.toString()}`}>
            <Edit />
          </Link>
        </Button>
      )
    }
  }, {
    accessorKey: 'categoryName',
    header: 'Category name',
    cell: ({ row }) => {
      const val: string = row.getValue('categoryName');
      return (
        <div>{val}</div>
      )
    }
  }, {
    accessorKey: 'products',
    header: '# of product in this category',
    cell: ({ row }) => {
      const products: string[] = row.getValue('products');
      return (
        <div>{products.length}</div>
      )
    }
  }
];