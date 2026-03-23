import { PageContainer } from "@/components/layout";

export default async function DashboardPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
          <p className="text-sm text-slate-500">
            Welcome back! Here is a summary of your activity.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
