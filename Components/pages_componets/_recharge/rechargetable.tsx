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
import { GetRechargeOffer } from "Components/slices/offer/thunk";
import { is_recharge_selected } from "Components/slices/offer/reducer";
const Rechargetable = () => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const [showSubCategory, setShowSubCategory] = useState<boolean>(false);
  const { offerData } = useSelector((state: any) => ({
    offerData: state.offer.offerData,
  }));

  useEffect(() => {
    dispatch(GetRechargeOffer());
  }, []);

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
                      router.push(
                        `/recharge/edit-recharge-offer/${cellProps._id}`
                      );
                      dispatch(is_recharge_selected(cellProps));
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
        Header: "Recharge Value",
        disableFilters: true,
        filterable: true,
        accessor: "value",
      },
      {
        Header: "Recharge Cashback",
        disableFilters: true,
        filterable: true,
        accessor: "cashback",
      },
      {
        Header: "Validity",
        disableFilters: true,
        filterable: true,
        accessor: "validity",
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
    ],
    []
  );

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
          data={offerData || []}
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

export default Rechargetable;
