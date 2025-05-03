import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Dropdown } from "react-bootstrap";
import { recentOrders } from "@common/data";
import TableContainer from "@common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCategory } from "Components/slices/category/thunk";
import { imagebaseURL } from "Components/helpers/url_helper";
import moment from "moment";
import Custom_Modal from "@common/Modal";
import SubCatForm from "../Sub_Category/form";
import { useRouter } from "next/router";
import { MdEditNote } from "react-icons/md";
import { is_category_selected } from "Components/slices/category/reducer";
const Categorytable = () => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const [showSubCategory, setShowSubCategory] = useState<boolean>(false);
  const { categorydata } = useSelector((state: any) => ({
    categorydata: state.CategorySlice.categorydata,
  }));

  const columns = useMemo(
    () => [
      {
        Header: "Actions",
        accessor: (cellProps: any) => {
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-2">
                  <Link
                    href=""
                    onClick={() => {
                      router.push(`/category/edit-category/${cellProps._id}`);
                      dispatch(is_category_selected(cellProps));
                    }}
                  >
                    <MdEditNote size={24} />
                  </Link>
                </div>
              </div>
            </>
          );
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Category Name",
        accessor: (cellProps: any) => {
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-2">
                  <img
                    src={`${imagebaseURL}${cellProps.categoryImage}`}
                    width="32"
                    height={32}
                    alt=""
                    className="avatar-xs rounded-circle"
                  />
                </div>
                <div className="flex-grow-1">
                  <strong>{cellProps.categoryName.toUpperCase()}</strong>
                </div>
              </div>
            </>
          );
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Category Description",
        disableFilters: true,
        filterable: true,
        accessor: "categoryDescription",
      },
      {
        Header: "Sub Category",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any, index: any) => {
          return (
            <div className="d-flex align-items-center">
              {cellProps.subCategory.length === 0 ? (
                <>
                  <div
                    className="badge text-success bg-success-subtle cursor-pointer"
                    onClick={() => router.push("/sub-category")}
                  >
                    <i className="bi bi-plus"> </i>Add
                  </div>
                </>
              ) : (
                cellProps.subCategory[0].subCategoryName
              )}
            </div>
          );
        },
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
    dispatch(GetAllCategory());
  }, []);

  return (
    <Col xl={12}>
      <Card>
        <Card.Header className="align-items-center d-flex mb-n2">
          <h4 className="card-title mb-0 flex-grow-1">Categories</h4>
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
          data={categorydata || []}
          isGlobalFilter={false}
          iscustomPageSize={false}
          isBordered={false}
          customPageSize={6}
          tableClass="table-centered align-middle table-nowrap mb-0"
          theadClass="table-light"
        />
        {/* </Card.Body> */}
      </Card>
      <Custom_Modal
        show={showSubCategory}
        title={"Add Sub Category"}
        onHide={() => setShowSubCategory(false)}
        footer={
          <Button onClick={() => setShowSubCategory(false)}>Close</Button>
        }
        children={<SubCatForm />}
      />
    </Col>
  );
};

export default Categorytable;
