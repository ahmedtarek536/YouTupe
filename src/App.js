import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home, VideoDetails, ChannelDetails, Search } from "./pages";
import { VideoProvider } from "./hooks/VideoProvider";

function App() {
  return (
    <BrowserRouter>
      <VideoProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<VideoDetails />} />
          <Route path="/channel/:id" element={<ChannelDetails />} />
          <Route path="/search/:searchTerm" element={<Search />} />
        </Routes>
      </VideoProvider>
    </BrowserRouter>
  );
}
export default App;
