export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-agri-50 to-fin-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-12 w-64 bg-white/50 rounded-lg mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/50 h-32 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/50 h-96 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
