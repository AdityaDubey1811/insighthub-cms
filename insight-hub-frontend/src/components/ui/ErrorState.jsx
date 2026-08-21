import { AlertCircle } from "lucide-react";

export default function ErrorState({
  message = "Something went wrong.",
}) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <AlertCircle size={28} className="mx-auto text-red-500" />

      <p className="mt-3 text-sm font-medium text-red-700">
        {message}
      </p>
    </div>
  );
}