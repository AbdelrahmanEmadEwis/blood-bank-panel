"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, CheckCircle } from "lucide-react";
import type { CrossMatch } from "../types";
import Link from "next/link";
import { format } from "date-fns";

export const columns: ColumnDef<CrossMatch>[] = [
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
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium text-slate-900">#{row.getValue("id")}</div>,
  },
  {
    id: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const { patient } = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-slate-900">{`${patient.fname} ${patient.lname}`}</span>
          <span className="text-xs text-slate-500">{patient.mrn}</span>
        </div>
      );
    },
  },
  {
    id: "blood_unit",
    header: "Blood Unit",
    cell: ({ row }) => {
      const { blood_unit } = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-slate-900">{blood_unit.barcode}</span>
          <span className="text-xs text-slate-500">{blood_unit.blood_type}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "final_result",
    header: "Result",
    cell: ({ row }) => {
      const result = row.getValue("final_result") as string;
      const getStatusStyles = (res: string) => {
        switch (res.toLowerCase()) {
          case "compatible":
            return "bg-green-100 text-green-700 border-green-200";
          case "incompatible":
            return "bg-red-100 text-red-700 border-red-200";
          case "pending":
            return "bg-yellow-100 text-yellow-700 border-yellow-200";
          default:
            return "bg-slate-100 text-slate-700 border-slate-200";
        }
      };

      return (
        <div
          className={`px-2 py-1 rounded-full text-xs font-semibold border w-fit capitalize ${getStatusStyles(
            result,
          )}`}>
          {result}
        </div>
      );
    },
  },
  {
    accessorKey: "signed_at",
    header: "Signed At",
    cell: ({ row }) => {
      const signedAt = row.getValue("signed_at") as string | null;
      if (!signedAt) return <span className="text-slate-400 italic">Not signed</span>;
      return (
        <div className="text-slate-600">{format(new Date(signedAt), "MMM dd, yyyy HH:mm")}</div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const crossMatch = row.original;

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
                href={`/dashboard/matches/${crossMatch.id}`}
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
