/*app/tenant/payments/page.tsx*/
import { supabase } from "@/lib/supabaseClient";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import MarkPaidButton from "./MarkPaidButton";

const TENANT_ID = "2d7640ea-3932-4e86-b49e-2347f1fe75ff";

function statusStyles(status: string) {
  if (status === "paid") {
    return { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" };
  }
  if (status === "overdue") {
    return { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" };
  }
  return { icon: Clock, color: "text-orange-500", bg: "bg-orange-50" };
}

export default async function PaymentsPage() {
  const { data: payments, error } = await supabase
    .from("payments")
    .select("*")
    .eq("tenant_id", TENANT_ID);

  if (!payments || payments.length === 0) {
    return <p>No payments found.</p>;
  }

  const sortedPayments = [...payments].sort((a, b) =>
    b.due_date.localeCompare(a.due_date)
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500 text-sm mt-1">Your full rent payment history.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col gap-2">
          {sortedPayments.map((payment) => {
            const isOverdue =
              payment.status !== "paid" && new Date(payment.due_date) < new Date();
            const displayStatus = isOverdue ? "overdue" : payment.status;
            const { icon: Icon, color, bg } = statusStyles(displayStatus);

            return (
              <div
                key={payment.id}
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${bg} ${color}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Rent — {payment.due_date}</p>
                    <p className={`text-xs capitalize ${color}`}>{displayStatus}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-sm font-bold text-gray-900">P{payment.amount}</p>
                  {payment.status !== "paid" && <MarkPaidButton paymentId={payment.id} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}