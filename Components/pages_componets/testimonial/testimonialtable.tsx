import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, Dropdown } from "react-bootstrap";
import TableContainer from "@common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { GetAllTestimonial,updateTestimonialStatus,deleteTestimonial } from "Components/slices/testimonial/thunk";
import { imagebaseURL } from "Components/helpers/url_helper";
import { useRouter } from "next/router";
import { is_selected_testimonial } from "Components/slices/testimonial/reducer";

const ProductTable = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const [status, setStatus] = useState<any>(null);
  const testimonialdata = useSelector((state: any) => state.testimonial.testimonialdata);
  console.log(testimonialdata,"SZdv")

  useEffect(()=>{
    dispatch(GetAllTestimonial())
  },[])

  const columns = useMemo(
    () => [
      {
        Header: "Actions",
        accessor: (cellProps: any) => {
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-2 d-flex align-items-center">
                <span
                    className="cursor-pointer"
                    onClick={() => dispatch(deleteTestimonial(cellProps._id))}
                  >
                    <i className="bi bi-trash me-2" />
                  </span>
                  <Link
                    href=""
                    onClick={() => {
                      router.push(`/testimonial/edit-testimonial/${cellProps._id}`);
                      dispatch(is_selected_testimonial(cellProps));
                    }}
                  >
                    <i className="bi bi-pencil me-2" />
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
                          updateTestimonialStatus(cellProps._id, !cellProps.status)
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
        Header: "Title",
        accessor: (cellProps: any) => {
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <strong>{cellProps.title.toUpperCase()}</strong>
                </div>
              </div>
            </>
          );
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Image",
        accessor: (cellProps: any) => {
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-2">
                    <img
                        src={`${imagebaseURL}${cellProps.image}`}
                        width="32"
                        height={32}
                        alt=""
                        className="avatar-xs rounded-circle"
                    />
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
        accessor: "description",
      }
    ],
    []
  );
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
          data={testimonialdata.response || []}
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
