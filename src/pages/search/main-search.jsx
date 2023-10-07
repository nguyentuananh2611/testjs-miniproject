
import "./main.css";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Content from "./content";
function MainSearch(props) {
  const {filter, setFilter} = props
  return (
    <>
      <div className="a d-flex flex-column">
        <Navbar />
        <div className="d-flex flex-grow-1 search_main">
          <Sidebar filter={filter} setFilter={setFilter} />
          <Content filter={filter} setFilter={setFilter} />
        </div>
      </div>
    </>
  );
}

export default MainSearch;
