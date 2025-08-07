const GOOGLE_API_KEY = "AIzaSyD-A4pvmrIaqbJsVwNpYBWSQK97-NQqMLI";
export const YOUTUBE_VEDIO_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_COMMENTS_API = (videoId) =>
  `https://www.googleapis.com/youtube/v3/commentThreads?key=${GOOGLE_API_KEY}
  &textFormat=plainText&part=snippet,replies&videoId=${videoId}&maxResults=2624`;

export const CONTROL_LIVE_CHAT = 12;
