import { createContext, useContext, useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0ee9542e9cmsh51c64a99aa8a45bp1d8d32jsndae864e2e406",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

const VideoContex = createContext();
function VideoProvider({ children }) {
  const [query, setQuery] = useState("New");
  const [videos, setVideos] = useState([]);
  const url = `https://youtube-v31.p.rapidapi.com/search?q=${query}&part=snippet%2Cid&regionCode=EG&maxResults=100`;
  useEffect(
    function () {
      async function getData() {
        try {
          const response = await fetch(url, options);
          const result = await response.json();
          setVideos(result?.items);
        } catch (error) {
          console.error(error);
        }
      }
      getData();
      return;
    },
    [query, url]
  );
  console.log(videos);
  return (
    <VideoContex.Provider value={{ query, setQuery, videos }}>
      {children}
    </VideoContex.Provider>
  );
}

function useVideo() {
  return useContext(VideoContex);
}

export { VideoProvider, useVideo };
