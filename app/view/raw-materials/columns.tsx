"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown, Edit } from "lucide-react";
import Link from "next/link";
import { IRawMaterial } from "../../..";

export const columns: ColumnDef<IRawMaterial>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      return <div>{parseInt(row.id) + 1}</div>
    }
  }, {
    accessorKey: 'edit',
    header: "Edit",
    cell: ({ row }) => {
      const id = row.getValue('id');
      return (
        <Button variant="link" className="hover:bg-blue-100" asChild>
          <Link href={`/update/raw-material/${id.toString()}`}>
            <Edit />
          </Link>
        </Button >
      )
    }
  }, {
    accessorKey: 'materialName',
    header: "Material name",
    cell: ({ row }) => <div>{row.getValue('materialName')}</div>
  }, {
    accessorKey: 'rawPrice',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Raw price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('rawPrice')}</div>
  }, {
    accessorKey: 'quantityInUnitPerItem',
    header: "Quantity ml/g/pcs",
    cell: ({ row }) => <div>{row.getValue('quantityInUnitPerItem')}</div>
  }
];
