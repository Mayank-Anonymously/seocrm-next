import React, { useEffect, useMemo, useState } from "react";
import { Table, Card, Col } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { GetAllOfferHeading,deleteOfferHeading } from "Components/slices/offer_heading/thunk";
import { useRouter } from "next/router";

const OfferHeading = () => {
    const dispatch:any = useDispatch();
    const offerheadings = useSelector((state:any)=>state.offerheadings.offerHeadingdata);
    const router = useRouter();

  // Columns definition
  const columns = useMemo(
    () => [
      { Header: "Action", accessor: "action" },
      { Header: "Description", accessor: "description" },
    ],
    []
  );
  useEffect(()=>{
    dispatch(GetAllOfferHeading());
  },[])
  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">All Offer Heading</h4>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.Header}>{column.Header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {offerheadings.length > 0 ? (
                offerheadings.map((row: any) => (
                  <tr key={row._id}>
                     <td>
                      <>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-2">
                            <span
                              className="cursor-pointer"
                              onClick={() => dispatch(deleteOfferHeading(row._id))}
                            >
                              <i className="bi bi-trash" />
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={() => {
                                router.push(`/offer-heading/edit-offer-heading/${row._id}`);
                              }}
                            >
                              <i className="bi bi-pencil" />
                            </span>
                          </div>
                        </div>
                      </>
                      </td>
                    <td>{row.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center">
                    No Form Data available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default OfferHeading;
