import React, { useState } from "react";

const ProductDataTableSubHeader = ({onDataTableSearchItems}) => {
    const [searchText, setSearchText] = useState("");
    const searchTextHandler = (e) => {
        const searchValue = e.target.value;
        setSearchText(searchValue);
        onDataTableSearchItems(searchValue);
    };
  return (
    <>
      <input
        type="text"
        className="w-100 form-control"
        placeholder="Search..."
        value={searchText}
        onChange={searchTextHandler}
      />
    </>
  );
};

export default ProductDataTableSubHeader;
