import { Bell } from "lucide-react";
export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Welcome to InsightHub CMS
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-lg border border-gray-200 p-2 transition hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
       </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            A
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900">
              Author
            </p>
            <p className="text-xs text-gray-500">
              author@example.com
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}