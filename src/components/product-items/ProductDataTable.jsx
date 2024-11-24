import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ProductDataTableAction from "./ProductDataTableAction";
import ProductDataTableSubHeader from "./ProductDataTableSubHeader";
import ProductDataTableDetailsView from "./ProductDataTableDetailsView";
import Button from "react-bootstrap/Button";
import { FiPlus, FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";
import { jsonToCsv } from "../../helpers/Helpers";

const ProductDataTable = ({
  sendProductItems,
  receivedOnAddPosItem,
  receivedOnSelectedItemsAddToPos,
  sendIsMultipleProductAdded,
  onResetMultiProductAddedNotification
}) => {
  const [products, setProducts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedItemRows, setSelectedItemRows] = useState([]);
  const [search, SetSearch] = useState("");
  const [selectedRowClear, setSelectedRowClear] = useState(false);
  const columns = [
    {
      name: "SL.",
      selector: (row) => row.id,
      cell: (row) => `${row.id}.`,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Item Name",
      selector: (row) => row.name,
      sortable: true,
      minWidth: "160px",
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      style: { fontWeight: 600 },
    },
    // {
    //   name: "GST",
    //   selector: (row) => row.gst,
    //   cell: (row) => `${row.gst}%`,
    //   sortable: true,
    // },
    {
      name: "#",
      right: true,
      cell: (row) => (
        <div>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => receivedOnAddPosItem(row?.id)}
          >
            <FiPlus style={{ marginTop: "-2px" }} /> Add
          </Button>
        </div>
      ),
    },
  ];

  const tableStyle = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "14px",
        backgroundColor: "#f8f9fa",
        fontFamily: "Roboto",
      },
    },
    rows: {
      style: {},
    },
    cells: {
      style: {
        fontFamily: "Roboto",
        fontSize: "13px",
      },
    },
  };

  const handleExpendableRows = ({ data }) => {
    return <ProductDataTableDetailsView sendItemData={data} />;
  };

  const emitOnDataTableSearchItems = (searchTxt = null) => {
    SetSearch(searchTxt);
  };

  const handleSelectedRows = (rows) => {
    setSelectedItemRows(rows?.selectedRows);
  };

  const addSelectedItemsHandler = () => {
    receivedOnSelectedItemsAddToPos(selectedItemRows);
  };

  const emitOnCsvDownloadHandler = () => {
    let content = jsonToCsv(products);
    let blob = new Blob([content], { type: "text/csv" });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = new Date().toJSON() + ".csv";
    document.body.appendChild(a);
    a.click();
  };

  const emitOnJsonDownloadHandler = () => {
    const anchor = document.createElement("a");
    const jsonData = JSON.stringify(products, null, 2);
    anchor.href =
      "data:application/json;charset=utf-8," + encodeURIComponent(jsonData);
    anchor.download = `${new Date().toISOString()}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  useEffect(() => {
    const result = products.filter((item) => {
      return (
        item.name.toLowerCase().match(search.toLocaleLowerCase()) ||
        item.category.toLowerCase().match(search.toLocaleLowerCase())
      );
    });
    setFilterData(result);
  }, [search, products]);

  useEffect(() => {
    setProducts(sendProductItems);
  }, [sendProductItems]);

  useEffect(() => {
    setSelectedRowClear(sendIsMultipleProductAdded);
    onResetMultiProductAddedNotification();
  }, [sendIsMultipleProductAdded])
  return (
    <>
      <DataTable
        title={`All Products - ${products.length}`}
        customStyles={tableStyle}
        columns={columns}
        data={filterData}
        pagination
        paginationPerPage={25}
        fixedHeader
        highlightOnHover
        pointerOnHover
        defaultSortFieldId={0}
        selectableRows
        onSelectedRowsChange={handleSelectedRows}
        selectableRowsHighlight
        clearSelectedRows={selectedRowClear}
        expandableRows
        expandableRowsComponent={handleExpendableRows}
        expandableIcon={{
          collapsed: <FiArrowDownCircle size={18} />,
          expanded: <FiArrowUpCircle size={18} />,
        }}
        actions={
          <ProductDataTableAction
            onCsvDownload={emitOnCsvDownloadHandler}
            onJsonDownload={emitOnJsonDownloadHandler}
          />
        }
        subHeader
        subHeaderWrap
        subHeaderComponent={
          <ProductDataTableSubHeader
            onDataTableSearchItems={emitOnDataTableSearchItems}
          />
        }
        contextActions={
          <button
            className="btn btn-sm btn-success"
            onClick={addSelectedItemsHandler}
          >
            Add Selected Items
          </button>
        }
      />
    </>
  );
};

export default ProductDataTable;
