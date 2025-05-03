import { selected_is_success } from "Components/slices/membership/reducer";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_ALL_VENDORS,
  DELETE_VENDOR,
  baseURL,
} from "../../../Components/helpers/url_helper";
import Link from "next/link";

// Define Vendor interface
interface Vendor {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  total_amount_with_tax_sum:number;
  amount_given_sum:number;
}

const VendorTable: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [vendors, setVendors] = useState<Vendor[]>([]); 

  const { data } = useSelector((state: any) => ({
    data: state.membership.data,
  }));

  const DeleteVendor = async(id:any)=>{
    try{
      const data:any = await axios(`${baseURL}${DELETE_VENDOR}${id}`);
      const {baseResponse,response}:any = data;
      if (baseResponse.status === 1) {
        Swal.fire({
          title: "Success",
          text: baseResponse.message,
          icon: "success",
        });
        vendorlist();
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

  const vendorlist = async()=>{
    try{
      const data:any = await axios(`${baseURL}${GET_ALL_VENDORS}`);
      const {baseResponse,response}:any = data;
      setVendors(response);
    }catch(error){
      console.log("Something went wrong");
    }
  }

  useEffect(() => {
    vendorlist();
  }, []);

  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">Vendor Details</h4>
        </Card.Header>
        <Card.Body>
          {vendors.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Actions</th>
                  <th>Vendor ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Purchase</th>
                  <th>Total Amount </th>   
                  <th>Total Given Amount</th> 
                  <th>Total Pending Amount</th>   
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor, index) => (
                  <tr key={vendor._id}>
                    <td>
                      <>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <span
                              className="cursor-pointer"
                              onClick={() => DeleteVendor(vendor._id)}
                            >
                              <i className="bi bi-trash" />
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={() => {
                                router.push(`/vendor/edit-vendor/${vendor._id}`);
                              }}
                            >
                              <i className="bi bi-pencil" />
                            </span>
                          </div>
                        </div>
                      </>
                    </td>
                    <td>{index + 1}</td>
                    <td>{vendor.name}</td>
                    <td>{vendor.email}</td>
                    <td>{vendor.mobile}</td>
                    <td>
                      <Link href={`/vendor/purchase/${vendor._id}`} legacyBehavior>
                        <a>Purchase</a>
                      </Link>
                    </td>
                    <td>{vendor.total_amount_with_tax_sum}</td>
                    <td>{vendor.amount_given_sum}</td>
                    <td>{vendor.total_amount_with_tax_sum - vendor.amount_given_sum}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div>No Vendor Details available.</div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default VendorTable;
