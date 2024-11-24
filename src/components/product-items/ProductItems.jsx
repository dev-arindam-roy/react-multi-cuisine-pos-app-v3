import React, { useEffect, useState } from "react";
import ProductDataTable from "./ProductDataTable";
import Card from "react-bootstrap/Card";

const ProductItems = ({
  sendProductList,
  onAddPosItem,
  onAddMultiplePosItem,
  sendIsMultipleProductAdded,
}) => {
  const [products, setProducts] = useState([]);

  const emitReceivedOnAddPosItem = (selectedProductId) => {
    onAddPosItem(selectedProductId);
  };

  const emitReceivedOnSelectedItemsAddToPos = (selectedProductObj) => {
    onAddMultiplePosItem(selectedProductObj);
  };

  useEffect(() => {
    if (sendProductList) {
      setProducts(sendProductList);
    } else {
      setProducts([]);
    }
  }, [sendProductList]);
  return (
    <>
      <Card>
        <Card.Body>
          <ProductDataTable
            sendProductItems={products}
            receivedOnAddPosItem={emitReceivedOnAddPosItem}
            receivedOnSelectedItemsAddToPos={
              emitReceivedOnSelectedItemsAddToPos
            }
            sendIsMultipleProductAdded={sendIsMultipleProductAdded}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductItems;
