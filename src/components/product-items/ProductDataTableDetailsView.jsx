import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProductDataTableDetailsView = ({ sendItemData }) => {
  const [getData, setGetData] = useState(null);
  useEffect(() => {
    setGetData(sendItemData);
  }, [sendItemData]);
  return (
    <>
      <Row className="my-3">
        <Col md={2}>
          {getData?.image && (
            <div>
              <img
                src={require(`../../item-images/${getData?.image || ""}`)}
                alt={getData?.name || ""}
                className="w-100"
              />
            </div>
          )}
        </Col>
        <Col md={10}>
          <div>
            <strong>Item Name:</strong> {getData?.name || ""}
          </div>
          {getData?.description && (
            <div>
              <strong>Info:</strong> {getData?.description || ""}
            </div>
          )}

          <div>
            <strong>Price:</strong> {process.env.REACT_APP_AUTH_CURRENCY}
            {getData?.price || ""}
            {getData?.hsn && (
              <label>
                {" "}
                &nbsp; | <strong>HSN:</strong> {getData?.hsn || ""}
              </label>
            )}
            {getData?.gst && (
              <label>
                {" "}
                &nbsp; | <strong>GST:</strong> {`${getData?.gst}%`}
              </label>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProductDataTableDetailsView;
