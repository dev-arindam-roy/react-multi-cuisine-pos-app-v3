import React from "react";

const ProductDataTableAction = ({ onCsvDownload, onJsonDownload }) => {
  return (
    <>
      <div>
        <button
          className="btn btn-sm btn-secondary mx-2"
          onClick={onJsonDownload}
        >
          Export JSON
        </button>
        <button className="btn btn-sm btn-secondary" onClick={onCsvDownload}>
          Export CSV
        </button>
      </div>
    </>
  );
};

export default ProductDataTableAction;
