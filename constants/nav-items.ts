import { type User } from "@/types";

export type NavItem = {
  title: string;
  url: string;
  icon: string;
  roles?: User["role"][];
};

export const navItems: NavItem[] = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: "LayoutDashboard",
    roles: ["superadmin"],
  },
  {
    title: "Patients",
    url: "/dashboard/patients",
    icon: "Users",
    roles: ["superadmin"],
  },
  {
    title: "Cross Matches",
    url: "/dashboard/matches",
    icon: "Users",
    roles: ["superadmin"],
  },
  {
    title: "Blood Units",
    url: "/dashboard/blood-units",
    icon: "Users",
    roles: ["superadmin"],
  },
];
