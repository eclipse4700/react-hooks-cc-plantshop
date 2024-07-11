import React from "react";

function Search({ searchQuery, onSearchChange }) {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Type a name to search..."
    />
  );
}

export default Search;



