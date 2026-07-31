import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { createPost } from "../services/postService";
import toast from "react-hot-toast";

export default function CreatePost() {
  const [content, setContent] = useState("");

  const { quill, quillRef } = useQuill({
    theme: "snow",
    placeholder: "Write your post content...",
  });

  useEffect(() => {
    if (!quill) return;

    quill.on("text-change", () => {
      setContent(quill.root.innerHTML);
    });
  }, [quill]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!quill || quill.getText().trim().length === 0) {
        toast.error("Content is required");
        return;
      }

      await createPost({
        title: data.title,
        content,
      });

      toast.success("Post created successfully");

      reset();
      quill.setContents([]);
      setContent("");
    } catch (error) {
      console.error(error);
      toast.error("Unable to create post");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Create Post
      </h1>

      <p className="mt-1 text-sm text-gray-600">
        Write and publish a new post.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-5 rounded-xl border border-gray-200 bg-white p-6"
      >
        <div>
          <label className="text-sm font-medium text-gray-700">
            Title
          </label>

          <input
            {...register("title", {
              required: "Title is required",
            })}
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            placeholder="Enter post title"
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
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}