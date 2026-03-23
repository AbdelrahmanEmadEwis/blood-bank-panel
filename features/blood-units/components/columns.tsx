"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox, Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye } from "lucide-react";
import { type BloodUnit } from "../types";
import Link from "next/link";

export const columns: ColumnDef<BloodUnit>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex h-full items-center pl-4">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex h-full items-center pl-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
    cell: ({ row }) => <div className="font-medium text-slate-900">{row.getValue("barcode")}</div>,
  },
  {
    accessorKey: "blood_type",
    header: "Blood Type",
    cell: ({ row }) => (
      <div className="font-medium text-slate-900">{row.getValue("blood_type")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const bloodUnit = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 w-8 p-0 flex items-center justify-center hover:bg-slate-100 rounded-md transition-colors">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-50 bg-white border shadow-md min-w-32">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={`/dashboard/blood-units/${bloodUnit.id}`}
                className="flex items-center gap-2 cursor-pointer w-full">
                <Eye className="h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
