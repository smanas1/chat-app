import React from "react";
import "./search.css";
import "../Style/home-page.css";
import { AiOutlineSearch } from "react-icons/ai";
const Search = () => {
  return (
    <>
      <div className="search">
        <div className="search-wrapper">
          <div className="search-icon">
            <AiOutlineSearch />
          </div>
          <input type="text" className="search-input" placeholder="Search" />
        </div>
      </div>
    </>
  );
};

export default Search;
