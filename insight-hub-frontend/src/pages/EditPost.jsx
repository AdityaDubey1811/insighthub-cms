import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import { getPostBySlug } from "../services/postService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updatePost } from "../services/postService";
import {
  getPostVersions,
  restoreVersion,
} from "../services/versionService";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";

export default function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [versions, setVersions] = useState([]);
  const [versionsLoading, setVersionsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  try {
    await updatePost(post.id, {
      title: data.title,
      content,
    });

    toast.success("Post updated successfully");
    navigate("/posts");
  } catch (error) {
    console.error(error);
    toast.error("Unable to update post");
  }
};
const handleRestore = async (versionId) => {
  const confirmed = window.confirm(
    "Restore this version? Your current post will be replaced."
  );

  if (!confirmed) return;

  try {
    await restoreVersion(versionId);

    toast.success("Version restored successfully");

    const updatedPost = await getPostBySlug(slug);

    setPost(updatedPost);

    reset({
      title: updatedPost.title,
    });

    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(updatedPost.content);
    }

    const updatedVersions = await getPostVersions(updatedPost.id);
    setVersions(updatedVersions);
  } catch (error) {
    console.error(error);
    toast.error("Unable to restore version");
  }
};

  const { quill, quillRef } = useQuill({
    theme: "snow",
    placeholder: "Write your post content...",
  });

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostBySlug(slug);

        setPost(data);
        const versionData = await getPostVersions(data.id);
        setVersions(versionData);
        setVersionsLoading(false);

        reset({
          title: data.title,
        });
      } catch (err) {
        console.error(err);
        setError("Unable to load post.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug, reset]);

  useEffect(() => {
    if (quill && post) {
      quill.clipboard.dangerouslyPasteHTML(post.content);
    }
  }, [quill, post]);

  useEffect(() => {
  if (!quill) return;

  quill.on("text-change", () => {
    setContent(quill.root.innerHTML);
  });
}, [quill]);

  if (loading) {
  return <LoadingSpinner text="Loading post..." />;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Edit Post
      </h1>

      <p className="mt-1 text-sm text-gray-600">
        Update your existing post.
      </p>

      <form 
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 space-y-5 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Title
          </label>

          <input
            {...register("title", {
              required: "Title is required",
            })}
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-600">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Content
          </label>

          <div className="mt-2 rounded-lg bg-white">
            <div ref={quillRef} className="min-h-64" />
          </div>
        </div>
        <button
           type="submit"
           className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
        Update Post
        </button> 
      </form>
      <div className="mt-8 rounded-xl border border-gray-200 bg-white">
  <div className="border-b border-gray-200 px-6 py-4">
    <h2 className="text-lg font-semibold text-gray-900">
      Version History
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      View and restore previous versions of this post.
    </p>
  </div>

  {versionsLoading ? (
  <LoadingSpinner text="Loading versions..." />
  ) : versions.length === 0 ? (
    <EmptyState
  title="No previous versions"
  description="Previous versions of this post will appear here."
  />
  ) : (
    <div className="divide-y divide-gray-200">
      {versions.map((version) => (
        <div
          key={version.id}
          className="flex items-center justify-between gap-4 p-5"
        >
          <div>
           <p className="font-medium text-gray-900">
            Version #{version.id}
           </p>

           <p className="mt-1 text-sm text-gray-500">
             {new Date(version.editedAt).toLocaleString()}
           </p>
          </div>

          <button
            type="button"
            onClick={() => handleRestore(version.id)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Restore
          </button>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  );
}