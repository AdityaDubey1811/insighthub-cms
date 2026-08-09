import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getPendingPosts,
  moderatePost,
} from "../../services/moderationService";

export default function Moderation() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingPosts = async () => {
    try {
      const data = await getPendingPosts();
      setPosts(data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load pending posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  const handleModeration = async (postId, status) => {
    try {
      await moderatePost(postId, status);

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== postId)
      );

      toast.success(
        status === "APPROVED"
          ? "Post approved"
          : "Post rejected"
      );
    } catch (error) {
      console.error(error);
      toast.error("Unable to moderate post");
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading moderation queue...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Moderation Queue
      </h1>

      <p className="mt-1 text-sm text-gray-600">
        Review posts submitted by authors.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {posts.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="font-semibold text-gray-900">
              No pending posts
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              All submissions have been reviewed.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {post.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    By {post.authorName}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleModeration(post.id, "APPROVED")
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      handleModeration(post.id, "REJECTED")
                    }
                    className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}