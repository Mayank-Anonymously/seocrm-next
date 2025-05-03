import Link from "next/link";
import { MdEditNote } from "react-icons/md";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, Dropdown } from "react-bootstrap";
import { recentOrders } from "@common/data";
import TableContainer from "@common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { imagebaseURL } from "Components/helpers/url_helper";
import moment from "moment";
import {
  GetAllProduct,
  editProductStatus,
} from "Components/slices/product/thunk";
import { useRouter } from "next/router";
import { is_selected_product } from "Components/slices/product/reducer";

const ProductTable = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const [status, setStatus] = useState<any>(null);
  const { productdata } = useSelector((state: any) => ({
    productdata: state.ProductSlice.productdata,
  }));

  const columns = useMemo(
    () => [
      {
        Header: "Actions",
        accessor: (cellProps: any) => {
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-2 d-flex align-items-center">
                  <Link
                    href=""
                    onClick={() => {
                      router.push(`/product/edit-product/${cellProps._id}`);
                      dispatch(is_selected_product(cellProps));
                    }}
                  >
                    <MdEditNote size={24} />
                  </Link>

                  <div className="form-check form-switch ml-5">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={cellProps.status}
                      onClick={(e) => {
                        console.log(!cellProps.status);
                        setStatus(!cellProps.status);
                        dispatch(
                          editProductStatus(cellProps._id, !cellProps.status)
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          );
        },
        disableFilters: true,
        filterable: true,
      },
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
        Header: " Description",
        disableFilters: true,
        filterable: true,
        accessor: "description",
      },
      {
        Header: " Short Description",
        disableFilters: true,
        filterable: true,
        accessor: "shortDescription",
      },

      {
        Header: " Regular price",
        disableFilters: true,
        filterable: true,
        accessor: "regularPrice",
      },
      {
        Header: " Price",
        disableFilters: true,
        filterable: true,
        accessor: "price",
      },
      {
        Header: "quantity",
        disableFilters: true,
        filterable: true,
        accessor: "qty",
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
      </Card>
    </Col>
  );
};

export default ProductTable;
