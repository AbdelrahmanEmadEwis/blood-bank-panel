"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye } from "lucide-react";
import { type Patient } from "@/features/patients";
import Link from "next/link";

export const columns: ColumnDef<Patient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex h-full items-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex h-full items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
  },
  {
    accessorKey: "mrn",
    header: "MRN",
    cell: ({ row }) => <div className="font-medium text-slate-900">{row.getValue("mrn")}</div>,
  },
  {
    id: "fullName",
    header: "Full Name",
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="font-medium text-slate-900">{`${patient.fname} ${patient.lname}`}</div>
      );
    },
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => row.getValue("age"),
  },
  {
    accessorKey: "sex",
    header: "Sex",
    cell: ({ row }) => <div className="capitalize text-slate-600">{row.getValue("sex")}</div>,
  },
  {
    accessorKey: "blood_type",
    header: "Blood Type",
    cell: ({ row }) => (
      <div className="font-medium text-slate-900">{row.getValue("blood_type")}</div>
    ),
  },
  {
    header: "Antibodies",
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div className="text-xs flex gap-2">
          <span
            title="Anti-A"
            className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
            A: {p.anti_a}
          </span>
          <span
            title="Anti-B"
            className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
            B: {p.anti_b}
          </span>
          <span
            title="Anti-D"
            className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
            D: {p.anti_d}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const patient = row.original;

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
                href={`/dashboard/patients/${patient.id}`}
                className="cursor-pointer flex items-center w-full px-2 py-1.5">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
