import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form method="post" id="search_form-one" onSubmit={searchHandler}>
      <div className="hero-search-form search-form-style-one">
        <input
          type="text"
          placeholder="Bạn tìm gì hôm nay ..."
          className="search-field"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="search-submit" onClick={searchHandler}>
          Tìm
        </button>
      </div>
    </form>
  );
};

export default Search;
