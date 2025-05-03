import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Dropdown } from "react-bootstrap";
import TableContainer from "@common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { GetfirstTimeRechargeOffer } from "Components/slices/first_time_recharge/thunk";
import { is_recharge_selected } from "Components/slices/offer/reducer";
import axios from "axios";
import { MdEditNote, MdDelete, MdToggleOff, MdToggleOn } from "react-icons/md";
import moment from "moment";
import { useRouter } from "next/router";
import {
  baseURL,
  DELETE_FIRST_TIME_RECHARGE,
  CHANGE_STATUS_BY_ID
} from "../../../Components/helpers/url_helper";
import Swal from "sweetalert2";

const Rechargetable = () => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const [showSubCategory, setShowSubCategory] = useState<boolean>(false);
  const { offerData } = useSelector((state: any) => ({
    offerData: state.first_time_recharge.offerData,
  }));

  useEffect(() => {
    dispatch(GetfirstTimeRechargeOffer());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      const data:any = await axios.get(`${baseURL}${DELETE_FIRST_TIME_RECHARGE}/${id}`);
      const {baseResponse,response}:any = data;
      if (baseResponse.status === 1) {
        Swal.fire({
          title: "Success",
          text: baseResponse.message,
          icon: "success",
        });
        dispatch(GetfirstTimeRechargeOffer());
      }else if (baseResponse.status === 0) {
        Swal.fire({
          title: "error",
          text: baseResponse.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: boolean) => {
    try {
      const newStatus = currentStatus ? false : true; 
      const data:any = await axios.patch(`${baseURL}${CHANGE_STATUS_BY_ID}/${id}`, { status: newStatus });
      const {baseResponse,response}:any = data;
      if (baseResponse.status === 1) {
        Swal.fire({
          title: "Success",
          text: baseResponse.message,
          icon: "success",
        });
        dispatch(GetfirstTimeRechargeOffer());
      }else if (baseResponse.status === 0) {
        Swal.fire({
          title: "error",
          text: baseResponse.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Actions",
        accessor: (cellProps: any) => {
          return (
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-2">
                <Link
                  href=""
                  onClick={() => {
                    router.push(`/first-time-recharge/edit-recharge-offer/${cellProps._id}`);
                    dispatch(is_recharge_selected(cellProps));
                  }}
                >
                  <MdEditNote size={24} />
                </Link>
              </div>
              <div className="flex-shrink-0 me-2">
                <Button
                  variant="danger"
                  onClick={() => handleDelete(cellProps._id)}
                >
                  <MdDelete size={24} />
                </Button>
              </div>
              <div className="flex-shrink-0">
                <Button
                  variant={cellProps.status ? "success" : "secondary"}
                  onClick={() => handleStatusToggle(cellProps._id, cellProps.status)}
                >
                  {cellProps.status ? <MdToggleOn size={24} /> : <MdToggleOff size={24} />}
                </Button>
              </div>
            </div>
          );
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Name",
        disableFilters: true,
        filterable: true,
        accessor: "name",
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
          <h4 className="card-title mb-0 flex-grow-1">First Time Recharge</h4>
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
          data={offerData || []}
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

export default Rechargetable;
