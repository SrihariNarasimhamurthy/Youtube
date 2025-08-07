import React from "react";

const VedioCard = ({ info }) => {
  const { snippet, statistics } = info;

  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  const formatViews = (num) => {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M views";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K views";
    }
    return num + " views";
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now - date) / 1000; // difference in seconds

    const units = [
      { unit: "year", seconds: 31536000 },
      { unit: "month", seconds: 2592000 },
      { unit: "week", seconds: 604800 },
      { unit: "day", seconds: 86400 },
      { unit: "hour", seconds: 3600 },
      { unit: "minute", seconds: 60 },
      { unit: "second", seconds: 1 },
    ];

    for (const { unit, seconds } of units) {
      const value = Math.floor(diff / seconds);
      if (value >= 1) {
        return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  };

  return (
    <div className="p-2 w-full max-w-[260px] mx-auto shadow-lg rounded-lg hover:scale-[1.02] transition-transform duration-200">
      <img
        alt="thumbnail"
        src={thumbnails.high.url}
        className="w-full h-40 object-cover rounded-lg"
      />
      <ul className="mt-2">
        <li className="font-semibold text-sm line-clamp-2">{title}</li>
        <li className="text-gray-700 text-xs mt-1">{channelTitle}</li>
        <li className="text-gray-600 text-xs mt-1">
          {formatViews(Number(statistics?.viewCount))} •{" "}
          {getRelativeTime(publishedAt)}
        </li>
      </ul>
    </div>
  );
};

export default VedioCard;
