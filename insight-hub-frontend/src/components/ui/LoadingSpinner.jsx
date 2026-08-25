import { LoaderCircle } from "lucide-react";

export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-gray-500">
      <LoaderCircle size={20} className="animate-spin" />
      <span className="text-sm">{text}</span>
    </div>
  );
}