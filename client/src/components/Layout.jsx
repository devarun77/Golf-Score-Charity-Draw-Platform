export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
};