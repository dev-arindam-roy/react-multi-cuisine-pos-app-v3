import React, { useEffect, useState } from "react";
import ProductDataTable from "./ProductDataTable";
import Card from "react-bootstrap/Card";

const ProductItems = ({
  sendProductList,
  onAddPosItem,
  onAddMultiplePosItem,
  sendIsMultipleProductAdded,
  sendOnResetMultiProductAddedNotification
}) => {
  const [products, setProducts] = useState([]);
  const [isMultiProductAdded, setIsMultiProductAdded] = useState(false);

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

  useEffect(() => {
    setIsMultiProductAdded(sendIsMultipleProductAdded);
  }, [sendIsMultipleProductAdded]);
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
            sendIsMultipleProductAdded={isMultiProductAdded}
            onResetMultiProductAddedNotification={sendOnResetMultiProductAddedNotification}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductItems;
