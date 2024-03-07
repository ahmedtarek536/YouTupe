import { Link, useNavigate } from "react-router-dom";
import { useVideo } from "../hooks/VideoProvider";
import { useEffect, useState } from "react";

const logo = "https://i.ibb.co/s9Qys2j/logo.png";
function Navbar() {
  const { setQuery, query } = useVideo();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  function handleSearch(e) {
    setSearch(e.target.value);
    if (search.length) {
      navigate("/");
      setQuery(e.target.value);
    }
  }
  useEffect(
    function () {
      if (query !== search) setSearch("");
    },
    [query]
  );
  return (
    <nav>
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
      </Link>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search"
      />
    </nav>
  );
}

export default Navbar;
