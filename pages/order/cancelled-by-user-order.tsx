import React, { ReactElement, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import TableContainer from "@common/TableContainer";
import moment from "moment";

import Head from "next/head";
import Layout from "@common/Layout";
import Order from "Components/pages_componets/order/ordertable";
import {
  OrderByStatus,
  fetchRequestforRecharge,
} from "Components/slices/order/thunk";
import { Button, Card, Col, Dropdown, Row } from "react-bootstrap";
import { GetAllPartner } from "Components/slices/partner/thunk";
import { useDispatch, useSelector } from "react-redux";
import { is_selected_success } from "Components/slices/order/reducer";
import Custom_Modal from "@common/Modal";
import UpdateStatus from "Components/pages_componets/order/updateStatusForm";

const index = () => {
  const [status, setStatus] = useState("CANCELLEDBYCUSTOMER");
  const dispatch: any = useDispatch();
  const { order, partnerData, request } = useSelector((state: any) => ({
    order: state.order.orderData,
    request: state.order.request,
    partnerData: state.partner.partnerData,
  }));

  const [showStatus, setShowStatus] = useState(false);

  var rows: any = [];

  for (let index = 0; index < order?.response?.length; index++) {
    const element = order.response[index];
    var name = "";
    var recharge_request = 0;
    partnerData
      .filter((item: any) => item._id === element?.partner?._id)
      .map((partner: any) => (name = partner.name));
    request
      .filter((item: any) => item.user?._id === element?.user?._id)
      .map((item: any) => (recharge_request = item.amount));
    rows.push({
      ...element,
      partnerName: name,
      recharge_request: recharge_request,
    });
  }

  const columns = useMemo(
    () => [
      {
        Header: "Order No.",
        accessor: (cellProps: any) => {
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <Link
                    href="#"
                    onClick={() => {
                      setShowStatus(true);
                      dispatch(is_selected_success(cellProps));
                    }}
                  >
                    <strong>#{cellProps.order_no}</strong>
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
        Header: "Partner",
        disableFilters: true,
        filterable: true,
        accessor: "partnerName",
      },
      {
        Header: "Customer Name",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <strong>{cellProps.user.name}</strong>
                </div>
              </div>
            </>
          );
        },
      },
      {
        Header: "Order Date",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <strong>
                    {moment(cellProps.createdAt).format("Do MMM YY")}
                  </strong>
                </div>
              </div>
            </>
          );
        },
      },
      {
        Header: "Vendor",
        accessor: (cellProps: any) => {
          return (
            <div className="d-flex align-items-center">
              {cellProps.recharge_request}
            </div>
          );
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Status",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return (
            <span className="badge text-success  bg-success-subtle">
              {cellProps.status}
            </span>
          );
        },
      },
    ],
    []
  );
  useEffect(() => {
    dispatch(OrderByStatus("CANCELLEDBYCUSTOMER"));
    dispatch(GetAllPartner());
    dispatch(fetchRequestforRecharge());
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Orders | Lavya -Admin </title>
      </Head>
      <div className="page-content">
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

            <TableContainer
              columns={columns || []}
              data={rows || []}
              // data={
              //   order.response.filter((item: any) => item.status === status) || []
              // }
              isGlobalFilter={false}
              iscustomPageSize={false}
              isBordered={false}
              customPageSize={10}
              tableClass="table-centered align-middle table-nowrap mb-0"
              theadClass="table-light"
            />
            <Custom_Modal
              show={showStatus}
              title={"Update Status"}
              onHide={() => setShowStatus(false)}
              footer={
                <Button onClick={() => setShowStatus(false)}>Close</Button>
              }
              children={<UpdateStatus />}
              fullscreen={true}
            />
          </Card>
        </Col>
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
