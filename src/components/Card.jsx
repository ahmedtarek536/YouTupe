import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function Card({ video }) {
  const navigate = useNavigate();
  function handleClick() {
    if (video.id?.kind === "youtube#channel")
      navigate(`/channel/${video.id.channelId}`);
    else navigate(`/video/${video.id.videoId}`);
  }
  return (
    <div
      className="video-card"
      onClick={handleClick}
      style={
        video?.id?.kind === "youtube#channel" ? { textAlign: "center" } : {}
      }
    >
      <img
        src={video?.snippet?.thumbnails?.high?.url}
        alt={video?.snippet?.title}
        style={
          video?.id?.kind === "youtube#channel"
            ? { borderRadius: "50%", width: "60%", marginTop: "25px" }
            : {}
        }
      />
      <div className="info">
        <h3
          className="title"
          style={
            video?.id?.kind === "youtube#channel" ? { marginTop: "11px" } : {}
          }
        >
          {video?.snippet?.title.slice(0, 40)}
        </h3>
        {video?.id?.kind !== "youtube#channel" && (
          <p className="channel-title">
            {video?.snippet?.channelTitle}
            <span>
              <FontAwesomeIcon icon={faCircleCheck} />
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Card;
