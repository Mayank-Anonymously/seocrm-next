import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Dropdown, Row, FormControl } from "react-bootstrap";
import TableContainer from "@common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  GetAllOrders,
  fetchRequestforRecharge,
} from "Components/slices/order/thunk";
import Custom_Modal from "@common/Modal";
import UpdateStatus from "./updateStatusForm";
import { is_selected_success } from "Components/slices/order/reducer";
import { GetAllPartner } from "Components/slices/partner/thunk";

const Order = () => {
  const [status, setStatus] = useState("ORDERED");
  const [search, setSearch] = useState(""); // State to hold search value
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

  const filteredRows = rows.filter((row: any) => {
    // Filter rows based on the search value
    const orderNo = row?.order_no?.toString().toLowerCase() || "";
    const partnerName = row?.partnerName?.toLowerCase() || "";
    const customerName = row?.user?.name?.toLowerCase() || "";
    const orderDate = moment(row?.createdAt).format("Do MMM YY").toLowerCase();
    const walletBalance = row?.user?.walletBalance?.toString().toLowerCase() || "";
    const status = row?.status?.toLowerCase() || "";

    return (
      orderNo.includes(search.toLowerCase()) ||
      partnerName.includes(search.toLowerCase()) ||
      customerName.includes(search.toLowerCase()) ||
      orderDate.includes(search.toLowerCase()) ||
      walletBalance.includes(search.toLowerCase()) ||
      status.includes(search.toLowerCase())
    );
  });

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
      },
      {
        Header: "Partner",
        disableFilters: true,
        accessor: "partnerName",
      },
      {
        Header: "Customer Name",
        disableFilters: true,
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
        accessor: (cellProps: any) => {
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <strong>{moment(cellProps.createdAt).format("Do MMM YY")}</strong>
                </div>
              </div>
            </>
          );
        },
      },
      {
        Header: "Wallet Balance",
        accessor: (cellProps: any) => {
          return (
            <div className="d-flex align-items-center">
              {cellProps.user?.walletBalance}
            </div>
          );
        },
        disableFilters: true,
      },
      {
        Header: "Status",
        disableFilters: true,
        accessor: (cellProps: any) => {
          switch (cellProps.status) {
            case "PROCCESSING":
              return <span className="badge text-warning bg-warning-subtle">{cellProps.status}</span>;
            case "FAILED":
            case "DECLINED":
              return <span className="badge text-danger bg-danger-subtle">{cellProps.status}</span>;
            case "ONTHEEWAY":
            case "ORDERED":
            case "DELIVERED":
            case "SUBSCRIBED":
              return <span className="badge text-success bg-success-subtle">{cellProps.status}</span>;
            case "ASSIGNED":
            case "NEXTDAYDELIVERY":
              return <span className="badge text-warning bg-warning-subtle">{cellProps.status}</span>;
            default:
              return <span>{cellProps.status}</span>;
          }
        },
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(GetAllOrders());
    dispatch(GetAllPartner());
    dispatch(fetchRequestforRecharge());
  }, []);

  return (
    <Col xl={12}>
      <Card>
      <Col>
          <Row className="px-2 py-2">
            <Col md={1}>
              <span
                className="btn badge text-warning bg-warning-subtle"
                onClick={() => setStatus("ASSIGNED")}
              >
                <>ASSIGNED</>
              </span>
            </Col>
            <Col md={1}>
              <span
                className="badge text-danger  bg-danger-subtle"
                onClick={() => setStatus("PENDING")}
              >
                <>PENDING</>
              </span>
            </Col>
            <Col md={1}>
              <span
                className="badge text-success  bg-success-subtle"
                onClick={() => setStatus("ORDERED")}
              >
                <>ORDERED</>
              </span>
            </Col>
            <Col md={1}>
              <span
                className="badge text-danger  bg-danger-subtle"
                onClick={() => setStatus("DECLINED")}
              >
                <>DECLINED</>
              </span>
            </Col>
            <Col md={1}>
              <span
                className="badge text-success  bg-success-subtle"
                onClick={() => setStatus("DELIVERED")}
              >
                <>DELIVERED</>
              </span>
            </Col>
            <Col md={1}>
              <span
                className="badge text-danger  bg-danger-subtle"
                onClick={() => setStatus("CANCELLEDBYPARTNER")}
              >
                <>CANCELLEDBYPARTNER</>
              </span>
            </Col>
            <Col md={1}>
              <span
                className="badge text-warning  bg-warning-subtle"
                onClick={() => setStatus("NEXTDAYDELIVERY")}
              >
                <>NEXTDAYDELIVERY</>
              </span>
            </Col>
           
          </Row>
        </Col>
        <Col>
          <Row className="px-2 py-2">
            <Col md={12}>
              {/* Search Input */}
              <FormControl
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          </Row>
        </Col>
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
          data={filteredRows || []}
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
          fullscreen={true}
          >
          <UpdateStatus />
          </Custom_Modal>
      </Card>
    </Col>
  );
};

export default Order;
