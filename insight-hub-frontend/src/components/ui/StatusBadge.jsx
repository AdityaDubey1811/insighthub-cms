export default function StatusBadge({ status }) {
  const styles = {
    APPROVED: "bg-green-50 text-green-700 border-green-200",
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
    DRAFT: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
        styles[status] || styles.DRAFT
      }`}
    >
      {status}
    </span>
  );
}