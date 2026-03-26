import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Droplets, Activity } from "lucide-react";
import type { Statistics } from "../types";
import { cn } from "@/lib/utils";

interface StatisticsOverviewProps {
  data: Statistics;
}

export function StatisticsOverview({ data }: StatisticsOverviewProps) {
  const { totals, patients_by_blood_type, blood_units_by_blood_type, cross_matches_by_final_result } = data;

  return (
    <div className="space-y-8">
      {/* Totals Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.total_patients}</div>
            <p className="text-xs text-muted-foreground">Registered in the system</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blood Units</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.total_blood_units}</div>
            <p className="text-xs text-muted-foreground">Available in stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cross Matches</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.total_cross_matches}</div>
            <p className="text-xs text-muted-foreground">Processed tests</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Patients by Blood Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Patients by Blood Type</CardTitle>
            <CardDescription>Distribution of registered patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patients_by_blood_type.length > 0 ? (
                patients_by_blood_type.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {item.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">No data available</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Blood Units by Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Blood Units by Type</CardTitle>
            <CardDescription>Current stock distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blood_units_by_blood_type.length > 0 ? (
                blood_units_by_blood_type.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-sm font-semibold text-red-700 ring-1 ring-inset ring-red-700/10">
                      {item.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">No data available</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Cross Matches Result */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cross Matches</CardTitle>
            <CardDescription>By final result status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cross_matches_by_final_result.length > 0 ? (
                cross_matches_by_final_result.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className={cn(
                        "rounded-full px-2.5 py-0.5 text-sm font-semibold ring-1 ring-inset",
                        item.label === "Compatible" && "bg-green-50 text-green-700 ring-green-700/10",
                        item.label === "Incompatible" && "bg-orange-50 text-orange-700 ring-orange-700/10",
                        item.label === "Pending" && "bg-slate-50 text-slate-700 ring-slate-700/10"
                    )}>
                      {item.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">No data available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
