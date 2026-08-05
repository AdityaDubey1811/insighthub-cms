import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostBySlug } from "../services/postService";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import {
  getLikeCount,
  toggleLike,
} from "../services/likeService";

export default function PostDetails() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostBySlug(slug);
        setPost(data);
        const count = await getLikeCount(data.id);
        setLikeCount(count);
      } catch (err) {
        console.error(err);
        setError("Unable to load post.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);
  const handleLike = async () => {
  if (!post) return;

  try {
    setLikeLoading(true);

    await toggleLike(post.id);

    const updatedCount = await getLikeCount(post.id);
    setLikeCount(updatedCount);
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "Unable to update like"
    );
  } finally {
    setLikeLoading(false);
  }
};

  if (loading) {
    return <p className="text-gray-600">Loading post...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-900">
        {post.title}
      </h1>

      <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
        <span>{post.authorName}</span>
        <span>•</span>
        <span>{post.status}</span>
      </div>
      <button
      type="button"
      onClick={handleLike}
      disabled={likeLoading}
      className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
     >
  <Heart size={18} />
  {likeLoading ? "Updating..." : `Like (${likeCount})`}
</button>

      <div
        className="prose mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}