/*app/tenant/layout.tsx*/

const navItems = ["Dashboard", "Payments",  "Maintenance"]

export default function TenantLayout( { children }: { children : React.ReactNode } ) {
    return(
        <div className="flex flex-row min-h-screen">
            <aside className="flex flex-col gap-8 w-64 shrink-0 bg-gray-900 self-stretch p-6">
                <div className="text-white font-bold text-xl">
                    <span>
                        Tenant Portal
                    </span>
                </div>
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <p className="text-gray-300 px-3 py-2 rounded-lg" key={item}>{item}</p>))}
                </nav>
            </aside>
            <main className="flex-1 p-8 bg-gray-100">
                <header className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard
                    </h1>
                </header>
                {children}
            </main>
        </div>
    )
}
