"use client";

import { ColumnDef } from "@tanstack/react-table"
import { ICustomer } from "../../..";
import { formatRelative, subDays } from "date-fns";
// import { Badge } from "../../../components/ui/badge";

export const columns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: 'id',
    header: "Id",
    cell: ({ row }) => {
      return <div>{parseInt(row.id) + 1}</div>
    }
  }, {
    accessorKey: 'firstname',
    header: "Quantity in unit",
    cell: ({ row }) => {
      const firstname = row.getValue("firstname");
      return <div>{firstname.toString()}</div>
    }
  }, {
    accessorKey: 'lastname',
    header: "Stock quantity",
    cell: ({ row }) => {
      const lastName = row.getValue("lastname");
      return <div>{lastName.toString()}</div>
    }
  }, {
    accessorKey: 'username',
    header: "Is reorder needed",
    cell: ({ row }) => {
      const username = row.getValue("username");
      return <div>{username.toString()}</div>
    }
  }, {
    accessorKey: 'gender',
    header: "Is reorder needed",
    cell: ({ row }) => {
      const gender = row.getValue("gender");
      console.log(gender);
      return <div>{gender.toString()}</div>
    }
  }, {
    accessorKey: 'createdAt',
    header: "Date created",
    cell: ({ row }) => {
      const d: Date = row.getValue("createdAt");
      console.log(d);
      return <div>{formatRelative(subDays(d, 0), new Date())}</div>
    }
  }
]