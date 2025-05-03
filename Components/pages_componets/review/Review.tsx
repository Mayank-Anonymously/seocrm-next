import React, { useEffect, useMemo, useState } from "react";
import { Table, Card, Col } from "react-bootstrap";
import { GET_ALL_RATING, baseURL,DELETE_REVIEW } from "Components/helpers/url_helper";
import axios from "axios";
import Swal from "sweetalert2";

const Review = () => {
    const [ratings,setRatings] = useState([]);
  // Columns definition
  const columns = useMemo(
    () => [
      { Header: "Action", accessor: "action" },
      { Header: "User Name", accessor: "name" },
      { Header: "Product Name", accessor: "productname" },
      { Header: "Rating", accessor: "rating" },
      { Header: "Description", accessor: "description" },
    ],
    []
  );

  const DeleteReview = async(id:any)=>{
    try{
      const data:any = await axios(`${baseURL}${DELETE_REVIEW}${id}`);
      const {baseResponse,response}:any = data;
      if (baseResponse.status === 1) {
        Swal.fire({
          title: "Success",
          text: baseResponse.message,
          icon: "success",
        });
        getAllRatings();
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
  const getAllRatings = async()=>{
    try {
        const response = await fetch(`${baseURL}${GET_ALL_RATING}`);
        const data = await response.json();
        if (data && data.baseResponse.status === 1) {
            setRatings(data.response); 
        } else {
          console.error("Failed to fetch contact forms.");
        }
      } catch (error) {
        console.error("Error fetching contact forms:", error);
      }
  }
  useEffect(()=>{
    getAllRatings();
  },[])
  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">All Reviews</h4>
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
              {ratings?.length > 0 ? (
                ratings?.map((row: any) => (
                  <tr key={row._id}>
                    <td>
                    <>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <span
                              className="cursor-pointer"
                              onClick={() => DeleteReview(row._id)}
                            >
                              <i className="bi bi-trash" />
                            </span>
                          </div>
                        </div>
                      </>
                    </td>
                    <td>{row?.user?.name}</td>
                    <td>{row?.product?.name}</td>
                    <td>{row?.rating}</td>
                    <td>{row?.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center">
                    No Review available.
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

export default Review;
