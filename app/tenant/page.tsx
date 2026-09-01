/*app/tenant/page.tsx*/

const statusCards = [
  { label: "Rent Status", value: "Paid" },
  { label: "Amount Due", value: "$0.00" },
  { label: "Next Due Date", value: "1 Oct 2026" },
];

export default function TenantDashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Top row: status cards */}
      <div className="grid grid-cols-3 gap-6">
        {statusCards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Bottom row: bigger panel + smaller panel */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Payment History</h2>
          <p className="text-gray-500">Chart / table goes here.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Maintenance Requests</h2>
          <p className="text-gray-500">List goes here.</p>
        </div>
      </div>
    </div>
  );
}