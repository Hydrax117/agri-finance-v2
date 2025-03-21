import { Sidebar } from "@/components/farmer/sidebar";

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gradient-to-b from-agri-50 to-fin-50">
        {children}
      </main>
    </div>
  );
}
