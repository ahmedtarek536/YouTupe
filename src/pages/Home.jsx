import { useVideo } from "../hooks/VideoProvider";
import Card from "../components/Card";
import Sidebar from "../components/Sidebar";

function Home() {
  const { query, videos } = useVideo();

  return (
    <>
      <Sidebar />
      <section className="home page">
        <h1 className="home-title">
          {query} <span>Videos</span>
        </h1>
        <div className="videos">
          {videos?.map((video, i) => (
            <Card key={i} video={video} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
