import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a0092c8544msha200e2d6523b3dcp1dd471jsn8afd39ab8fa9",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

function VideoDetails() {
  return (
    <section className="video-details page">
      <Video />
      <Videos />
    </section>
  );
}

function Video() {
  const [video, setVideo] = useState();
  const { id } = useParams();
  const url = `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`;

  useEffect(
    function () {
      async function getVideo() {
        try {
          const response = await fetch(url, options);
          const result = await response.json();
          setVideo(result?.items[0]);
        } catch (error) {
          console.error(error);
        }
      }
      getVideo();
    },
    [id, url]
  );
  return (
    <div className="video-card-details">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        frameborder="0"
        allowfullscreen
      ></iframe>
      <h2>{video?.snippet?.title}</h2>
      <div className="info">
        <h4>
          JavaScirpt Mastery{" "}
          <span className="icon">
            {" "}
            <FontAwesomeIcon icon={faCircleCheck} />
          </span>
        </h4>
        <div className="views">
          <p>{video?.statistics?.viewCount} views</p>
          <p>{video?.statistics?.likeCount} likes</p>
        </div>
      </div>
    </div>
  );
}

function Videos() {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  const url = `https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=${id}&part=id%2Csnippet&type=video&maxResults=50`;

  useEffect(
    function () {
      async function getVideos() {
        try {
          const response = await fetch(url, options);
          const result = await response.json();
          setVideos(result.items);
        } catch (error) {
          console.error(error);
        }
      }
      getVideos();
    },
    [url]
  );

  return (
    <section className="suggestion-videos">
      <div className="videos ">
        {videos.map((video, i) => (
          <Card key={i} video={video} />
        ))}
      </div>
    </section>
  );
}

export default VideoDetails;
