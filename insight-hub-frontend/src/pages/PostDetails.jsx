import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostBySlug } from "../services/postService";

export default function PostDetails() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostBySlug(slug);
        setPost(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load post.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

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

      <div
        className="prose mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}