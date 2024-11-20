"use client";

import { ColumnDef } from "@tanstack/react-table"
import { IUserWithRole } from "./page";
// id: string;
// roleId: string;
// firstname: string;
// lastname: string;
// cpNum: string;
// username: string;
// password: string;

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
    header: "Role",
    cell: ({ row }) => {
      const firstname = row.getValue("firstname");
      return <div>{firstname.toString()}</div>
    }
  }, {
    accessorKey: 'lastname',
    header: "Role",
    cell: ({ row }) => {
      const lastname = row.getValue("lastname");
      return <div>{lastname.toString()}</div>
    }
  }, {
    accessorKey: 'cpNum',
    header: "Role",
    cell: ({ row }) => {
      const cpNum = row.getValue("cpNum");
      return <div>{cpNum.toString()}</div>
    }
  }, {
    accessorKey: 'username',
    header: "Role",
    cell: ({ row }) => {
      const username = row.getValue("username");
      return <div>{username.toString()}</div>
    }
  }, {
    accessorKey: 'password',
    header: "Role",
    cell: ({ row }) => {
      const password = row.getValue("password");
      return <div>{password.toString()}</div>
    }
  },
]