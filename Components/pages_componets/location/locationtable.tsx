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
import {
  DeleteLocation,
  GetAllLocation,
} from "Components/slices/location/thunk";
import { is_selected_success } from "Components/slices/location/reducer";
const Locationtable = () => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const [showSubCategory, setShowSubCategory] = useState<boolean>(false);
  const { locationData } = useSelector((state: any) => ({
    locationData: state.location.locationData,
  }));

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
                    onClick={() => dispatch(DeleteLocation(cellProps._id))}
                  >
                    <i className="bi bi-trash" />
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      router.push(`/location/edit-location/${cellProps._id}`);
                      dispatch(is_selected_success(cellProps));
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
        Header: "Location Name",
        accessor: (cellProps: any) => {
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-2">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="flex-grow-1">
                  <strong>{cellProps.locationName}</strong>
                </div>
              </div>
            </>
          );
        },
        disableFilters: true,
        filterable: true,
      },

      {
        Header: "Serving Radius",
        disableFilters: true,
        filterable: true,
        accessor: "radius",
      },

      // {
      //   Header: "Status",
      //   disableFilters: true,
      //   filterable: true,
      //   accessor: (cellProps: any) => {
      //     switch (cellProps.status) {
      //       case true:
      //         return (
      //           <span className="badge text-success bg-success-subtle">
      //             {"Active"}
      //           </span>
      //         );
      //       case false:
      //         return (
      //           <span className="badge text-danger  bg-danger-subtle">
      //             {"In-Active"}
      //           </span>
      //         );
      //     }
      //   },
      // },
    ],
    []
  );
  useEffect(() => {
    dispatch(GetAllLocation());
  }, []);

  console.log("locationData", locationData);
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
          data={locationData || []}
          // columns={[]}
          // data={[]}
          isGlobalFilter={false}
          iscustomPageSize={false}
          isBordered={false}
          customPageSize={6}
          tableClass="table-centered align-middle table-nowrap mb-0"
          theadClass="table-light"
        />
      </Card>
    </Col>
  );
};

export default Locationtable;
