"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, Wrench, Search, User } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/tenant", icon: LayoutDashboard },
  { label: "Payments", href: "/tenant/payments", icon: Wallet },
  { label: "Maintenance", href: "/tenant/maintenance", icon: Wrench },
];

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-row min-h-screen bg-gray-50 p-6 gap-6">
      <aside className="flex flex-col gap-8 w-64 shrink-0 bg-white self-stretch p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-gray-900 font-bold text-xl">
          <span>Tenant Portal</span>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === pathname;
            return (
              <p
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive ? "bg-orange-500 text-white" : "text-gray-500"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </p>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1">
        <header className="flex justify-between items-center mb-8">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search..."
              className="bg-white pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm w-64"
            />
          </div>

          <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <User size={18} />
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}