/*app/tenant/maintenance/page.tsx*/
import { supabase } from "@/lib/supabaseClient";
import { CircleDot, Loader2, CheckCircle2 } from "lucide-react";
import MaintenanceForm from "./MaintenanceForm";

const TENANT_ID = "2d7640ea-3932-4e86-b49e-2347f1fe75ff";

function statusStyles(status: string) {
  if (status === "resolved") {
    return { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" };
  }
  if (status === "in-progress") {
    return { icon: Loader2, color: "text-orange-500", bg: "bg-orange-50" };
  }
  return { icon: CircleDot, color: "text-red-600", bg: "bg-red-50" };
}

export default async function MaintenancePage() {
  const { data: requests, error } = await supabase
    .from("maintenance_requests")
    .select("*")
    .eq("tenant_id", TENANT_ID);

  const sortedRequests = requests
    ? [...requests].sort((a, b) => b.created_at.localeCompare(a.created_at))
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance</h1>
          <p className="text-gray-500 text-sm mt-1">Track and submit maintenance requests.</p>
        </div>
        <MaintenanceForm />
      </div>

      {sortedRequests.length === 0 ? (
        <p className="text-gray-400 text-sm">No maintenance requests found.</p>
      ) : (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex flex-col gap-2">
            {sortedRequests.map((request) => {
              const { icon: Icon, color, bg } = statusStyles(request.status);
              return (
                <div
                  key={request.id}
                  className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${bg} ${color}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{request.title}</p>
                      <p className="text-xs text-gray-400">{request.created_at.slice(0, 10)}</p>
                    </div>
                  </div>
                  <p className={`text-xs font-medium capitalize ${color}`}>{request.status}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}