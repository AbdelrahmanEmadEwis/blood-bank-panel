import { type RouteConfig } from "@/types";
export const routes: RouteConfig[] = [
  { path: "/dashboard/patients", roles: ["superadmin"] },
  { path: "/dashboard/blood-units", roles: ["superadmin"] },
  { path: "/dashboard/cross-matches", roles: ["superadmin"] },
];
