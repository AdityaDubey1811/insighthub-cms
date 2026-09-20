
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { createPost } from "../services/postService";
import toast from "react-hot-toast";
import { uploadImage } from "../services/imageService";
import { useNavigate } from "react-router-dom";
import { getCategories, getTags } from "../services/categoryTagService";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const { quill, quillRef } = useQuill({
    theme: "snow",
    placeholder: "Write your post content...",

    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
  });

  const handleImageUpload = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];

      if (!file || !quill) return;

      try {
        toast.loading("Uploading image...", {
          id: "image-upload",
        });

        const imageUrl = await uploadImage(file);
        const range = quill.getSelection(true);

        quill.insertEmbed(range.index, "image", imageUrl);
        quill.setSelection(range.index + 1);

        toast.success("Image uploaded", {
          id: "image-upload",
        });
      } catch (error) {
        console.error(error);

        toast.error("Image upload failed", {
          id: "image-upload",
        });
      }
    };
  };

  useEffect(() => {
    if (!quill) return;

    quill.on("text-change", () => {
      setContent(quill.root.innerHTML);
    });
  }, [quill]);

  useEffect(() => {
    if (!quill) return;

    const toolbar = quill.getModule("toolbar");
    toolbar.addHandler("image", handleImageUpload);
  }, [quill]);

  useEffect(() => {
    const loadCategoryAndTags = async () => {
      try {
        const [categoryData, tagData] = await Promise.all([
          getCategories(),
          getTags(),
        ]);

        setCategories(categoryData);
        setTags(tagData);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load categories and tags");
      }
    };

    loadCategoryAndTags();
  }, []);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (!quill || quill.root.innerHTML === "<p><br></p>") {
        toast.error("Content is required");
        return;
      }

      await createPost({
        title: data.title,
        content,
        categoryId: Number(data.categoryId),
        tagIds: data.tagIds?.map(Number) || [],
      });

      toast.success("Post created successfully");
      navigate("/posts");

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
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category
          </label>

          <select
            {...register("categoryId", {
              required: "Category is required",
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select a category
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-600">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Tags
          </label>

          <select
            multiple
            {...register("tagIds")}
            className="min-h-32 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>

          <p className="mt-1 text-xs text-gray-500">
            Hold Ctrl (Windows) or Command (Mac) to select multiple tags.
          </p>
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

