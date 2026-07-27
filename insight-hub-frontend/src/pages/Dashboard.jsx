import { useEffect, useState } from "react";
import { getMyPostsAnalytics } from "../services/analyticsService";

export default function Dashboard() {
     const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const data = await getMyPostsAnalytics();
        setAnalytics(data);
      } catch (err) {
        setError("Unable to load analytics.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Dashboard
      </h1>

      <p className="mt-1 text-sm text-gray-600">
        Welcome back. Here is an overview of your content.
      </p>
        <pre className="mt-6 rounded-lg bg-gray-100 p-4">
        {JSON.stringify(analytics, null, 2)}
      </pre>
    </div>
  );
}