import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { YOUTUBE_COMMENTS_API } from "../utils/constants";
import { setComments } from "../utils/commentsSlice";

const Comment = ({ data }) => {
  const { author, profileImage, replies, text, id, publishedAt } = data;
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies((prev) => !prev);
  };

  return (
    <div className="my-4">
      <div className="flex">
        <img
          className="w-10 h-10 rounded-full"
          alt="user"
          src={profileImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://www.pngkey.com/png/full/202-2024792_user-profile-icon-png-download-fa-user-circle.png";
          }}
        />
        <div className="px-5">
          <p className="font-bold text-sm">
            {author}
            <span className="text-gray-500 font-normal text-sm ml-2">
              {timeAgo(publishedAt)}
            </span>
          </p>
          <p className="text-sm">{text}</p>
          {replies?.length > 0 && (
            <button
              className="text-blue-500 text-sm mt-1"
              onClick={toggleReplies}
            >
              {showReplies ? "Hide Replies" : `View ${replies.length} Replies `}
            </button>
          )}
        </div>
      </div>
      {showReplies && (
        <div className="pl-10 m-5">
          <CommentsList comments={replies} />
        </div>
      )}
    </div>
  );
};

function timeAgo(publishedAt) {
  const publishedDate = new Date(publishedAt);
  const now = new Date();
  const diff = Math.floor((now - publishedDate) / 1000); // in seconds

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
  if (diff < 31104000) return `${Math.floor(diff / 2592000)} months ago`;
  return `${Math.floor(diff / 31104000)} years ago`;
}

const CommentsList = ({ comments }) => {
  return comments?.map((comment, index) => (
    <div>
      <Comment key={index} data={comment} />
    </div>
  ));
};

const CommentsContainer = ({ vedioId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.items);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(YOUTUBE_COMMENTS_API(vedioId));
        const data = await response.json();

        // Extract just the data we want
        const parsedComments = data.items.map((item) => {
          const top = item.snippet.topLevelComment.snippet;
          const replies =
            item.replies?.comments?.map((reply) => ({
              text: reply.snippet.textDisplay,
              author: reply.snippet.authorDisplayName,
              profileImage: reply.snippet.authorProfileImageUrl,
              publishedAt: reply.snippet.publishedAt,
              likeCount: reply.snippet.likeCount,
            })) || [];

          return {
            id: item.id,
            text: top.textDisplay,
            author: top.authorDisplayName,
            profileImage: top.authorProfileImageUrl,
            publishedAt: top.publishedAt,
            likeCount: top.likeCount,
            replies,
          };
        });

        dispatch(setComments(parsedComments));
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };

    if (vedioId) {
      fetchComments();
    }
  }, [vedioId, dispatch]);

  console.log(comments);

  return (
    <div className="mt-0 p-2 ml-6">
      <h1 className="text-2xl font-bold mb-5">
        {comments?.length || 0} Comments{" "}
      </h1>
      {comments.length > 0 && <CommentsList comments={comments} />}
    </div>
  );
};

export default CommentsContainer;
