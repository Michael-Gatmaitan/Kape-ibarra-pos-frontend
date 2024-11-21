"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ITransaction } from "../../..";
import Link from "next/link";

export const columns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      return <div>{parseInt(row.id) + 1}</div>
    }
  }, {
    accessorKey: 'orderId',
    header: "Order id",
    cell: ({ row }) => {
      const value = row.getValue('orderId').toString();
      return (<Link href={`/order?id=${value}`}>
        {value}
      </Link>)
    }
  }, {
    accessorKey: 'paymentMethod',
    header: "Payment method",
    cell: ({ row }) => <div>{row.getValue('paymentMethod')}</div>
  }, {
    accessorKey: 'amountPaid',
    header: "Amount paid",
    cell: ({ row }) => <div>{row.getValue('amountPaid')}</div>
  }, {
    accessorKey: 'change',
    header: "Change",
    cell: ({ row }) => <div>{row.getValue('change')}</div>
  }, {
    accessorKey: 'totalTendered',
    header: "Total tendered",
    cell: ({ row }) => <div>{row.getValue('change')}</div>
  }
  // }, {
  //   accessorKey: 'vatAmount',
  //   header: "VAT amount",
  //   cell: ({ row }) => <div>{row.getValue('vatAmount')}</div>
  // }, {
  //   accessorKey: 'vatableSales',
  //   header: "Vatable sales",
  //   cell: ({ row }) => <div>{row.getValue('vatableSales')}</div>
  // }
];
