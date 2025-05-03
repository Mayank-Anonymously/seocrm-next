import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { Card, Col, Dropdown } from "react-bootstrap";
import { recentOrders } from "@common/data";
import TableContainer from "@common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { imagebaseURL } from "Components/helpers/url_helper";
import moment from "moment";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllSubCategory } from "Components/slices/category/thunk";
import { useRouter } from "next/router";
import {
  DELETE_SUBCATEGORY_BY_ID,
  baseURL
} from "../../../Components/helpers/url_helper";
import axios from "axios";
import Swal from "sweetalert2";

const SubCategoryTable = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { subcategorydata } = useSelector((state: any) => ({
    subcategorydata: state.CategorySlice.subcat,
  }));

  const DeleteSubCategory = async(id:any)=>{
    try{
      const data:any = await axios(`${baseURL}${DELETE_SUBCATEGORY_BY_ID}${id}`);
      const {baseResponse,response}:any = data;
      if (baseResponse.status === 1) {
        Swal.fire({
          title: "Success",
          text: baseResponse.message,
          icon: "success",
        });
        dispatch(GetAllSubCategory());
      }else if (baseResponse.status === 0) {
        Swal.fire({
          title: "error",
          text: baseResponse.message,
          icon: "error",
        });
      }
    }catch(error:any){
      Swal.fire({
        title: error,
        text: error,
        icon: "error",
      });
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: "Actions",
        accessor: (cellProps: any) => {
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <span
                    className="cursor-pointer"
                    onClick={() => DeleteSubCategory(cellProps._id)}
                  >
                    <i className="bi bi-trash" />
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      router.push(`/sub-category/edit-subcategory/${cellProps._id}`);
                    }}
                  >
                    <i className="bi bi-pencil" />
                  </span>
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
                    src={`${imagebaseURL}${cellProps.subCategoryImage}`}
                    width="32"
                    height={32}
                    alt=""
                    className="avatar-xs rounded-circle"
                  />
                </div>
                <div className="flex-grow-1">
                  <strong>{cellProps.subCategoryName.toUpperCase()}</strong>
                </div>
              </div>
            </>
          );
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Description",
        disableFilters: true,
        filterable: true,
        accessor: "subCategoryDescription",
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
    dispatch(GetAllSubCategory());
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
          data={subcategorydata || []}
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

export default SubCategoryTable;
