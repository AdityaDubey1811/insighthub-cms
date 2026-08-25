import { useEffect, useState } from "react";
import { getMyPostsAnalytics } from "../services/analyticsService";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";

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
  return <LoadingSpinner text="Loading dashboard..." />;
}

 if (error) {
  return <ErrorState message={error} />;
}
   const totalPosts = analytics.length;

  const totalViews = analytics.reduce(
    (sum, post) => sum + post.views,
    0
  );

  const totalLikes = analytics.reduce(
    (sum, post) => sum + post.likes,
    0
  );
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Dashboard
      </h1>

      <p className="mt-1 text-sm text-gray-600">
        Welcome back. Here is an overview of your content.
      </p>
       <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <div className="rounded-xl border border-gray-200 bg-white p-5">
    <p className="text-sm font-medium text-gray-500">
      Total Posts
    </p>

    <p className="mt-2 text-3xl font-bold text-gray-900">
      {totalPosts}
    </p>
  </div>

  <div className="rounded-xl border border-gray-200 bg-white p-5">
    <p className="text-sm font-medium text-gray-500">
      Total Views
    </p>

    <p className="mt-2 text-3xl font-bold text-gray-900">
      {totalViews}
    </p>
  </div>

  <div className="rounded-xl border border-gray-200 bg-white p-5">
    <p className="text-sm font-medium text-gray-500">
      Total Likes
    </p>

    <p className="mt-2 text-3xl font-bold text-gray-900">
      {totalLikes}
    </p>
  </div>
</div>
<div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white">
  <div className="border-b border-gray-200 px-5 py-4">
    <h2 className="text-lg font-semibold text-gray-900">
      Post Performance
    </h2>
  </div>

  {analytics.length === 0 ? (
  <EmptyState
    title="No posts yet"
    description="Create your first post to start tracking analytics."
  />
) : (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-sm text-gray-600">
          <tr>
            <th className="px-5 py-3 font-medium">Title</th>
            <th className="px-5 py-3 font-medium">Views</th>
            <th className="px-5 py-3 font-medium">Likes</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {analytics.map((post) => (
            <tr key={post.postId}>
              <td className="px-5 py-4 text-sm font-medium text-gray-900">
                {post.title}
              </td>

              <td className="px-5 py-4 text-sm text-gray-600">
                {post.views}
              </td>

              <td className="px-5 py-4 text-sm text-gray-600">
                {post.likes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
    </div>
  );
}