import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Pencil } from "lucide-react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load posts.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
  <div>
    <h1 className="text-2xl font-bold text-gray-900">
      Posts
    </h1>

    <p className="mt-1 text-sm text-gray-600">
      Manage all published and pending posts.
    </p>
  </div>

  <Link
    to="/posts/create"
    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
  >
    <Plus size={18} />
    Create Post
  </Link>
</div>

     <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
  {posts.length === 0 ? (
    <div className="p-8 text-center">
      <h3 className="text-lg font-semibold text-gray-900">No posts found</h3>
      <p className="mt-2 text-sm text-gray-500">
        Create your first post to start managing content.
      </p>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-sm text-gray-600">
          <tr>
            <th className="px-5 py-3 font-medium">Title</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Author</th>
            <th className="px-5 py-3 font-medium">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-5 py-4 text-sm font-medium text-gray-900">
                {post.title}
              </td>

              <td className="px-5 py-4 text-sm text-gray-600">
                {post.status}
              </td>

              <td className="px-5 py-4 text-sm text-gray-600">
                {post.authorName}
              </td>
              <td className="px-5 py-4">
             <Link
                  to={`/posts/${post.id}/edit`}
             className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
             >
             <Pencil size={16} />
             Edit
             </Link>
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