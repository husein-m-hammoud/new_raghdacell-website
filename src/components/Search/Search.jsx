import { BsSearch } from "react-icons/bs";
import { useFilter } from "../../Tools/APIs";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Search() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { filter, setFilter } = useFilter();
  useEffect(() => {
    if (filter.get("q")) navigate(`/search?q=${filter.get("q")}`);
  }, [filter.get("q")]);
  const inputSearch = useRef();
  document.onkeyup = function (e) {
    if (e.key === "Enter") {
      setFilter({ q: search });
    }
  };
  return (
    <div
      style={{ direction: "ltr" }}
      className="flex-1 rounded-2xl overflow-hidden flex justify-between mx-4 max-sm:my-2"
    >
      <input
        type="search"
        name="search"
        ref={inputSearch}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search...."
        className="py-2 pl-5 w-full placeholder:text-lg border-blue-800 border rounded-l-2xl border-r-0"
      />
      <div
        onClick={() => {
          if (search) {
            setFilter({ q: search });
          }
        }}
        className="flex items-center justify-center w-16 bg-blue-800 cursor-pointer "
      >
        <BsSearch size={25} className="" color="#fff" />
      </div>
    </div>
  );
}
export default Search;
