export default function EmptyState({
  title,
  description,
  icon: Icon,
}) {
  return (
    <div className="p-8 text-center">
      {Icon && (
        <Icon size={30} className="mx-auto text-gray-400" />
      )}

      <h3 className="mt-3 text-lg font-semibold text-gray-900">
        {title}
      </h3>

      {description && (
        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}