import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deletePost } from "../services/postService";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import StatusBadge from "../components/ui/StatusBadge";
import ErrorState from "../components/ui/ErrorState";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const handleDelete = async (postId) => {
   
  const confirmed = window.confirm(
    "Are you sure you want to delete this post?"
  );

  if (!confirmed) return;

  try {
    await deletePost(postId);

    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId)
    );

    toast.success("Post deleted successfully");
  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "Unable to delete post"
    );
  }

};

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
  return <LoadingSpinner text="Loading posts..." />;
  }
if (error) {
  return <ErrorState message={error} />;
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
  <EmptyState
    title="No posts found"
    description="Create your first post to start managing content."
  />
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
              <td className="px-5 py-4 text-sm">
           <Link
            to={`/posts/view/${post.slug}`}
               className="font-medium text-gray-900 hover:text-blue-600"
           >
           {post.title}
          </Link>
           </td>

              <td className="px-5 py-4 text-sm text-gray-600">
                <StatusBadge status={post.status} />
              </td>

              <td className="px-5 py-4 text-sm text-gray-600">
                {post.authorName}
              </td>
             <td className="px-5 py-4">
              <div className="flex items-center gap-2">

              <Link
                to={`/posts/${post.slug}/edit`}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
              <Pencil size={16} />
               Edit
               </Link>

             <button
             type="button"
             onClick={() => handleDelete(post.id)}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
             >
             <Trash2 size={16} />
             Delete
            </button>

            </div>
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