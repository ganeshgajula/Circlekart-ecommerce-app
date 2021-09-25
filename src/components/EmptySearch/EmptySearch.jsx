import React from "react";
import "./EmptySearch.css";

export const EmptySearch = () => {
  return (
    <div className="empty-search-container">
      <h2 className="empty-search-title">Sorry, no results found!</h2>
      <p className="empty-search-description">
        Please check the spelling or try searching for something else.
      </p>
    </div>
  );
};
