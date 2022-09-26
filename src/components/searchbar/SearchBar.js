import React, { useState, useEffect } from "react";
import clearIcon from "../../assets/cross.png";
import searchIcon from "../../assets/searchIcon.png";
import "./SearchBar.css";

const SearchBar = ({ data, setSearchedList }) => {
  const [val, setVal] = useState("");

  const onChangeHandle = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setVal(lowerCase);
  };

  const clearSearchHandler = () => {
    setVal("");
  }

  useEffect(() => {
    let filtered = data.filter((query) => {
      if (val === "") return query;
      else return query.name.toLowerCase().includes(val);
    });

    setSearchedList(filtered);
  }, [val]);

  return (
    <div className="SearchBar">
      <img
        src={searchIcon}
        alt="searchIcon"
        width="25rem"
        style={{paddingLeft: '3px'}}
      />
      <input
        type="text"
        placeholder="Search by Name"
        className="searchField"
        value={val}
        onChange={onChangeHandle}
      />
      {val !== "" && (
      <img
        src={clearIcon}
        alt="clear search"
        width="30rem"
        className="clearIconStyle"
        onClick={clearSearchHandler}
      />
      )}
    </div>
  );
};

export default SearchBar;
