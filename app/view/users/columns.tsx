"use client";

import { ColumnDef } from "@tanstack/react-table"
import { IUserWithRole } from "./page";

export const columns: ColumnDef<IUserWithRole>[] = [
  {
    accessorKey: 'id',
    header: "Id",
    cell: ({ row }) => {
      return <div>{parseInt(row.id) + 1}</div>
    }
  }, {
    accessorKey: 'role',
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as { roleName: string };
      return <div>{role.roleName}</div>
    }
  }, {
    accessorKey: 'firstname',
    header: "Firstname",
    cell: ({ row }) => {
      const firstname = row.getValue("firstname");
      return <div>{firstname.toString()}</div>
    }
  }, {
    accessorKey: 'lastname',
    header: "Lastname",
    cell: ({ row }) => {
      const lastname = row.getValue("lastname");
      return <div>{lastname.toString()}</div>
    }
  }, {
    accessorKey: 'phoneNumber',
    header: "Phone number",
    cell: ({ row }) => {
      const phoneNumber = row.getValue("phoneNumber");
      return <div>{phoneNumber.toString()}</div>
    }
  }, {
    accessorKey: 'username',
    header: "Username",
    cell: ({ row }) => {
      const username = row.getValue("username");
      return <div>{username.toString()}</div>
    }
  }, {
    accessorKey: 'password',
    header: "Password",
    cell: ({ row }) => {
      const password = row.getValue("password");
      return <div>{password.toString()}</div>
    }
  },
]