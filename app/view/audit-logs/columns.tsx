"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IAuditLog, ICustomer, IEmployee } from "../../..";
import { formatRelative, subDays } from "date-fns";

export const columns: ColumnDef<IAuditLog & { Employee: IEmployee } & { Customer: ICustomer }>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    cell: ({ row }) => {
      return <div>{parseInt(row.id) + 1}</div>
    }
  }, {
    accessorKey: 'Employee',
    header: 'Employee',
    cell: ({ row }) => {
      const employee: IEmployee | null = row.getValue('Employee');
      return (
        <div>{employee?.id ? employee.username : "N/A"}</div>
      )
    }
  }, {
    accessorKey: 'Customer',
    header: 'Customer',
    cell: ({ row }) => {
      const customer: ICustomer | null = row.getValue('Customer');
      return (
        <div>{customer?.id ? customer.username : "N/A"}</div>
      )
    }
  }, {
    accessorKey: 'timeIn',
    header: 'Time in',
    cell: ({ row }) => {
      const timeInVal: Date = row.getValue('timeIn');
      return (
        <div>
          {formatRelative(subDays(timeInVal, 0), new Date())}
        </div>
      )
    }
  }, {
    accessorKey: 'timeOut',
    header: 'Time in',
    cell: ({ row }) => {
      const timeOutVal: Date = row.getValue('timeOut');
      return (
        <div>
          {formatRelative(subDays(timeOutVal, 0), new Date())}
        </div>
      )
    }
  }
];