/*app/tenant/page.tsx*/
import { supabase } from "@/lib/supabaseClient";
import { Banknote, AlertCircle, CalendarClock } from "lucide-react";

export default async function TenantDashboard() {
  const { data, error } = await supabase.from("tenants").select("*");
  if (!data || data.length === 0) {
    return <p>No tenant found.</p>;
  }

  const { data: payments, error: paymentsError } = await supabase.from("payments").select("*");
  if (!payments || payments.length === 0) {
    return <p>No payments found.</p>;
  }

  const unpaidPayments = payments
    .filter((payment) => payment.status !== "paid")
    .sort((a, b) => a.due_date.localeCompare(b.due_date));

  const nextPayment = unpaidPayments[0];
  let rentStatus = "Paid";
  let amountDue = "P0.00";
  let nextDueDate = "—";

  if (nextPayment) {
    const isOverdue = new Date(nextPayment.due_date) < new Date();
    rentStatus = isOverdue ? "Overdue" : "Due";
    amountDue = `P${nextPayment.amount}`;
    nextDueDate = nextPayment.due_date;
  }

  const statusCards = [
    { label: "Rent Status", value: rentStatus, icon: AlertCircle },
    { label: "Amount Due", value: amountDue, icon: Banknote },
    { label: "Next Due Date", value: nextDueDate, icon: CalendarClock },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, {data[0].name}</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {statusCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-500">{card.label}</p>
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                  <Icon size={16} />
                </div>
              </div>
              <p
                className={`text-2xl font-bold ${
                  card.label === "Rent Status"
                    ? card.value === "Overdue"
                      ? "text-red-600"
                      : card.value === "Due"
                      ? "text-orange-500"
                      : "text-green-600"
                    : "text-gray-900"
                }`}
              >
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Payment History</h2>
          <p className="text-gray-400 text-sm">Chart / table goes here.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Maintenance Requests</h2>
          <p className="text-gray-400 text-sm">List goes here.</p>
        </div>
      </div>
    </div>
  );
}