import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const [searchParams] = useSearchParams();

  const searchId = searchParams.get("v");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  return (
    <div className="flex flex-col">
      {/* Video & LiveChat Section */}
      <div className="mt-20 px-2 lg:px-10 flex flex-col lg:flex-row gap-4">
        {/* Video Player */}
        <div className="w-full lg:w-2/3">
          <div className="w-full max-w-[1100px] aspect-video">
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${searchId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Live Chat */}
        <div className="w-full lg:w-1/3">
          <LiveChat />
        </div>
      </div>

      {/* Comments Section */}
      <div className="px-4 lg:px-10 mt-6">
        <CommentsContainer vedioId={searchId} />
      </div>
    </div>
  );
};

export default WatchPage;
