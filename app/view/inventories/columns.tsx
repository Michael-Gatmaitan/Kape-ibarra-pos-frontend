"use client";

import { ColumnDef } from "@tanstack/react-table"
import { InventoryWithRawMaterial } from "./page";
import { IRawMaterial } from "../../..";
import { Badge } from "../../../components/ui/badge";

export const columns: ColumnDef<InventoryWithRawMaterial>[] = [
  {
    accessorKey: 'id',
    header: "Id",
    cell: ({ row }) => {
      return <div>{parseInt(row.id) + 1}</div>
    }
  }, {
    accessorKey: 'rawMaterial',
    header: "Raw material name",
    cell: ({ row }) => {
      const rawMaterial: IRawMaterial = row.getValue("rawMaterial");
      return <div>{rawMaterial.materialName}</div>
    }
  }, {
    accessorKey: 'quantityInUnit',
    header: "Quantity in unit",
    cell: ({ row }) => {
      const quantityInUnit = row.getValue("quantityInUnit");
      return <div>{quantityInUnit.toString()}</div>
    }
  }, {
    accessorKey: 'stockQuantity',
    header: "Stock quantity",
    cell: ({ row }) => {
      const stockQuantity = row.getValue("stockQuantity");
      const isReorderNeeded: boolean = row.getValue("isReorderNeeded");
      return <Badge variant={isReorderNeeded ? "destructive" : "default"}>
        {stockQuantity.toString()}
      </Badge>
    }
  }, {
    accessorKey: 'isReorderNeeded',
    header: "Is reorder needed",
    cell: ({ row }) => {
      const isReorderNeeded = row.getValue("isReorderNeeded");
      return <div>{isReorderNeeded.toString()}</div>
    }
  }, {
    accessorKey: 'reorderLevel',
    header: "Reorder level",
    cell: ({ row }) => {
      const reorderLevel = row.getValue("reorderLevel");
      return <div>{reorderLevel.toString()}</div>
    }
  }
]