import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Dropdown, Row } from "react-bootstrap";
import { recentOrders } from "@common/data";
import TableContainer from "@common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { imagebaseURL } from "Components/helpers/url_helper";
import moment from "moment";
import { GetAllProduct, updateStock } from "Components/slices/product/thunk";
import Custom_Modal from "@common/Modal";
import { selected_product } from "Components/slices/product/reducer";

const StockTable = () => {
  const dispatch: any = useDispatch();
  const { productdata } = useSelector((state: any) => ({
    productdata: state.ProductSlice.productdata,
  }));
  const [showStatus, setShowStatus] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: (cellProps: any) => {
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-2">
                  <img
                    src={`${imagebaseURL}${cellProps.icon}`}
                    width="32"
                    height={32}
                    alt=""
                    className="avatar-xs rounded-circle"
                  />
                </div>
                <div className="flex-grow-1">
                  <strong>{cellProps.name.toUpperCase()}</strong>
                </div>
              </div>
            </>
          );
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "quantity",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <a
                    className="cursor-pointer"
                    onClick={() => {
                      setShowStatus(true);
                      dispatch(selected_product(cellProps));
                    }}
                  >
                    <strong>
                      #
                      {cellProps.stock === "" || !cellProps.stock
                        ? 0
                        : cellProps.stock}
                    </strong>
                  </a>
                </div>
              </div>
            </>
          );
        },
      },
      {
        Header: "Description",
        disableFilters: true,
        filterable: true,
        accessor: "description",
      },
      {
        Header: "Short Description",
        disableFilters: true,
        filterable: true,
        accessor: "shortDescription",
      },

      {
        Header: "Regular price",
        disableFilters: true,
        filterable: true,
        accessor: "regularPrice",
      },
      {
        Header: "Price",
        disableFilters: true,
        filterable: true,
        accessor: "price",
      },
      {
        Header: "SKU",
        disableFilters: true,
        filterable: true,
        accessor: "sku",
      },
      {
        Header: "Created Date",
        accessor: (cellProps: any) => {
          return (
            <div className="d-flex align-items-center">
              {moment(cellProps.createdAt).format("dddd MMM DD ")}
            </div>
          );
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Vendor",
        accessor: (cellProps: any) => {
          return <div className="d-flex align-items-center">Not Available</div>;
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Status",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          switch (cellProps.status) {
            case true:
              return (
                <span className="badge text-success bg-success-subtle">
                  {"Active"}
                </span>
              );
            case false:
              return (
                <span className="badge text-danger  bg-danger-subtle">
                  {"In-Active"}
                </span>
              );
          }
        },
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(GetAllProduct());
  }, []);

  return (
    <Col xl={12}>
      <Card>
        <Card.Header className="align-items-center d-flex mb-n2">
          <h4 className="card-title mb-0 flex-grow-1">Recent Orders</h4>
          <div className="flex-shrink-0">
            <Dropdown className="card-header-dropdown">
              <Dropdown.Toggle
                variant="link-dark"
                className="text-reset dropdown-btn arrow-none p-0"
              >
                {/* as={CustomToggle} */}
                <span className="fw-semibold text-uppercase fs-12">
                  Sort by:
                </span>
                <span className="text-muted">
                  Today<i className="mdi mdi-chevron-down ms-1"></i>
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item href="#">Today</Dropdown.Item>
                <Dropdown.Item href="#">Yesterday</Dropdown.Item>
                <Dropdown.Item href="#">Last 7 Days</Dropdown.Item>
                <Dropdown.Item href="#">Last 30 Days</Dropdown.Item>
                <Dropdown.Item href="#">This Month</Dropdown.Item>
                <Dropdown.Item href="#">Last Month</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>

        {/* <Card.Body> */}
        <TableContainer
          columns={columns || []}
          data={productdata.response || []}
          isGlobalFilter={false}
          iscustomPageSize={false}
          isBordered={false}
          customPageSize={6}
          tableClass="table-centered align-middle table-nowrap mb-0"
          theadClass="table-light"
        />
        {/* </Card.Body> */}
        <Custom_Modal
          show={showStatus}
          title={"Update Status"}
          onHide={() => setShowStatus(false)}
          // footer={<Button onClick={() => setShowStatus(false)}>Close</Button>}
          children={<UpdateQty />}
          // children={"Inpit"}
          fullscreen={false}
        />
      </Card>
    </Col>
  );
};

const UpdateQty = () => {
  const dispatch: any = useDispatch();
  const { productdata, selected } = useSelector((state: any) => ({
    productdata: state.ProductSlice.productdata,
    selected: state.ProductSlice.selectedProduct,
  }));

  const [stockvalue, setStockValue] = useState<any>({
    stock: selected.stock ? selected.stock : 0,
  });

  const handleChangeStock = (name: any, e: any) => {
    setStockValue({ ...stockvalue, [name]: e.target.value });
  };

  return (
    <Col>
      <Row>
        <Col>
          <input
            type="number"
            className="form-control"
            value={stockvalue.stock}
            onChange={(e: any) => handleChangeStock("stock", e)}
          />
        </Col>
        <Col>
          <Button
            onClick={() =>
              dispatch(updateStock(selected._id, stockvalue.stock))
            }
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Col>
  );
};
export default StockTable;
