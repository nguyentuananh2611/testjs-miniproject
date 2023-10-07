import { useState } from "react";
import HeaderSearch from "./header-search";
import MainSearch from "./main-search";
import FooterGuess from "../../components/footerGuess";
function SearchPage() {
  const [filter, setFilter] = useState({
    paginate: true,
    page: 1,
    perpage: 18,
    search: "",
  });
  return (
    <>
      <div className="fill-height">
        <HeaderSearch filter={filter} setFilter={setFilter} />
        <MainSearch filter={filter} setFilter={setFilter} />
        <FooterGuess />
      </div>
    </>
  );
}

export default SearchPage;
