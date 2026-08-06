import { useState } from "react";
import { Reply } from "lucide-react";

export default function CommentItem({
  comment,
  depth = 0,
  onReply,
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleReplySubmit = async (event) => {
    event.preventDefault();

    if (!replyContent.trim()) return;

    try {
      setSubmitting(true);

      await onReply(comment.id, replyContent);

      setReplyContent("");
      setShowReplyForm(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-gray-50 p-4 ${
        depth > 0 ? "ml-6 mt-3" : ""
      }`}
    >
      <p className="text-sm font-medium text-gray-900">
        {comment.userName}
      </p>

      <p className="mt-2 text-sm text-gray-700">
        {comment.content}
      </p>

      <button
        type="button"
        onClick={() => setShowReplyForm((current) => !current)}
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        <Reply size={16} />
        Reply
      </button>

      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="mt-3">
          <textarea
            value={replyContent}
            onChange={(event) => setReplyContent(event.target.value)}
            rows={2}
            placeholder="Write a reply..."
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowReplyForm(false)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? "Replying..." : "Reply"}
            </button>
          </div>
        </form>
      )}

      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          depth={depth + 1}
          onReply={onReply}
        />
      ))}
    </div>
  );
}