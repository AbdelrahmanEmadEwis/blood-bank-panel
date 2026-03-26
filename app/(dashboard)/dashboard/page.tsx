import { PageContainer } from "@/components/layout";
import { getStatisticsAction, StatisticsOverview } from "@/features/overview";

export default async function DashboardPage() {
  const { ok, data, error } = await getStatisticsAction();

  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
          <p className="text-sm text-slate-500">
            Welcome back! Here is a summary of the blood bank statistics.
          </p>
        </div>

        {!ok ? (
          <div className="flex items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <div className="text-sm text-red-500">
              {error || "Failed to load statistics. Please try again later."}
            </div>
          </div>
        ) : (
          <StatisticsOverview data={data!} />
        )}
      </div>
    </PageContainer>
  );
}
