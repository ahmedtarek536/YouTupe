import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0ee9542e9cmsh51c64a99aa8a45bp1d8d32jsndae864e2e406",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

function ChannelDetails() {
  return (
    <section className="channel-details page">
      <Profile />
      <Videos />
    </section>
  );
}

function Profile() {
  const [profile, setProfile] = useState();
  const { id } = useParams();
  const urlChannel = `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${id}&maxResults=50&order=date`;
  useEffect(
    function () {
      async function getChannel() {
        try {
          const response = await fetch(urlChannel, options);
          const result = await response.json();
          setProfile(result?.items[0]);
        } catch (error) {
          console.error(error);
        }
      }
      getChannel();
    },
    [id, urlChannel]
  );
  return (
    <div className="profile">
      <div className="background"></div>
      <div className="profile-card">
        <img
          src={profile?.snippet?.thumbnails?.high?.url}
          alt={`${profile?.snippet?.title} channel`}
        />
        <h2 className="title">
          {profile?.snippet?.title}
          <span className="icon">
            <FontAwesomeIcon icon={faCircleCheck} />
          </span>
        </h2>
        <p className="numSubcribers">
          {profile?.statistics?.subscriberCount} Subscribers
        </p>
      </div>
    </div>
  );
}

function Videos() {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  const urlVideos = `https://youtube-v31.p.rapidapi.com/search?channelId=${id}&part=snippet%2Cid&regionCode=EG&maxResults=50&order=date`;
  useEffect(
    function () {
      async function getVideos() {
        try {
          const response = await fetch(urlVideos, options);
          const result = await response.json();
          setVideos(result.items);
        } catch (error) {
          console.error(error);
        }
      }
      getVideos();
    },
    [urlVideos]
  );

  return (
    <div className="videos">
      {videos.map((video, i) => (
        <Card key={i} video={video} />
      ))}
    </div>
  );
}

export default ChannelDetails;
