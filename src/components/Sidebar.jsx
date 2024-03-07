import { useVideo } from "../hooks/VideoProvider";
import { categories } from "../utils/constants";
function Sidebar() {
  return (
    <section className="side-bar">
      <ul>
        {categories.map((el) => (
          <CategoryItem key={el.name} el={el} />
        ))}
      </ul>
    </section>
  );
}

function CategoryItem({ el }) {
  const { query, setQuery } = useVideo();
  return (
    <li
      className={`${el.name === query ? "active" : ""}`}
      onClick={() => setQuery(el.name)}
    >
      {el.icon}
      <span>{el.name}</span>
    </li>
  );
}
export default Sidebar;
