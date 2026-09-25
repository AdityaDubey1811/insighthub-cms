
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "../services/postService";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import {
  getLikeCount,
  toggleLike,
} from "../services/likeService";
import { getComments } from "../services/commentService";
import CommentItem from "../components/comment/CommentItem";
import { useForm } from "react-hook-form";
import { addComment } from "../services/commentService";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorState from "../components/ui/ErrorState";

export default function PostDetails() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [comments, setComments] = useState([]); 
  const [commentsLoading, setCommentsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostBySlug(slug);
        setPost(data);

        const count = await getLikeCount(data.id);
        setLikeCount(count);

        const commentsData = await getComments(data.id);
        setComments(commentsData);
        setCommentsLoading(false);
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

  const handleCommentSubmit = async (data) => {
    if (!post) return;

    try {
      await addComment(post.id, {
        content: data.content,
        parentId: null,
      });

      const updatedComments = await getComments(post.id);
      setComments(updatedComments);

      reset();
      toast.success("Comment added");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Unable to add comment"
      );
    }
  };

  const handleReply = async (parentId, content) => {
    try {
      await addComment(post.id, {
        content,
        parentId,
      });

      const updatedComments = await getComments(post.id);
      setComments(updatedComments);

      toast.success("Reply added");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Unable to add reply"
      );
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading post..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-900">
        {post.title}
      </h1>

      <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
        <Link
  to={`/users/${post.authorId}`}
  className="font-medium text-blue-600 hover:underline"
>
  {post.authorName}
</Link>
        <span>•</span>
        <span>{post.status}</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {post.categoryName && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            {post.categoryName}
          </span>
        )}

        {post.tagNames?.map((tagName) => (
          <span
            key={tagName}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
          >
            #{tagName}
          </span>
        ))}
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

      <section className="mt-10 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-semibold text-gray-900">
          Comments
        </h2>

        <form
          onSubmit={handleSubmit(handleCommentSubmit)}
          className="mt-5 rounded-xl border border-gray-200 bg-white p-4"
        >
          <textarea
            {...register("content", {
              required: "Comment is required",
            })}
            rows={3}
            placeholder="Write a comment..."
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          {errors.content && (
            <p className="mt-1 text-sm text-red-600">
              {errors.content.message}
            </p>
          )}

          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>

        {commentsLoading ? (
          <p className="mt-4 text-sm text-gray-500">
            Loading comments...
          </p>
        ) : comments.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            No comments yet.
          </p>
        ) : (
          <div className="mt-5 space-y-4">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={handleReply}
              />
            ))}
          </div>
        )}
      </section>
    </article>
  );
}

