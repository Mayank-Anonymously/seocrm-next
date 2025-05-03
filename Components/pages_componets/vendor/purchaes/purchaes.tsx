import React, { useEffect, useMemo, useState } from "react";
import { Table, Card, Col, Button, Modal,Form } from "react-bootstrap";
import {
  GET_ALL_VENDORS,
  baseURL,
  UPDATE_GIVEN_AMOUNT
} from "../../../../Components/helpers/url_helper";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
interface Purchase {
    _id: string;
    total_sale: number;
    total_amount: number;
    total_refund: number;
    offer_balance: number;
    add_purchase: number;
    add_expense: number;
    vendor: string;
    product_name: string;
    product_qty: number;
    product_price: number;
    bill_no: string;
    bill_date: string;
    sgst: number;
    cgst: number;
    igst: number;
    total_amount_without_tax: number;
    total_amount_with_tax: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
interface Vendor {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    purchases: Purchase[];
}

const Purchase = ({ vendorId }: any) => {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [purchaesId,setPurchesId] = useState("");
    console.log(purchaesId,"er")
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
      paymentAmount: '',
      remark: '',
    });
    const vendorlist = async()=>{
        try{
            const data:any = await axios(`${baseURL}${GET_ALL_VENDORS}`);
            const {baseResponse,response}:any = data;
            console.log(data,"Ewrfgerg")
            setVendors(response);
        }catch(error){
            console.log("Something went wrong");
        }
        }

        useEffect(() => {
        vendorlist();
        }, []);

    const vendor:any = vendors.find((vendor: any) => vendor._id === vendorId);
    const columns = useMemo(() => {
        const baseColumns = [
        { Header: "SR NO", accessor: "sno" },
        { Header: "Product Name", accessor: "productname" },
        { Header: "Bill Date", accessor: "billdate" },
        { Header: "Product Quantity", accessor: "productqty" },
        { Header: "Product Price", accessor: "productprice" },
        { Header: "Bill No", accessor: "billno" },
        { Header: "SGST (C26)", accessor: "sgst" },
        { Header: "CGST (C27)", accessor: "cgst" },
        { Header: "IGST (C28)", accessor: "igst" },
        { Header: "Total Amount Without Tax (C29)", accessor: "withtax" },
        { Header: "Total Amount With Tax (C30)", accessor: "withouttax" },
        { Header: "Payment Status", accessor: "paymentstatus" },
        { Header: "Amount Given", accessor: "amountgiven" },
        { Header: "Pending Amount", accessor: "pendingamount" },
        { Header: "Payment", accessor: "payment" },
        ];
        return baseColumns;
    }, [vendor]);
    const handleShowModal = (purches_id:any) => {
      setPurchesId(purches_id);
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      setFormData({
        paymentAmount: '',
        remark: '',
      });
      setPurchesId("");
    };

    const handleInputChange = (e:any) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (e:any) => {
      e.preventDefault();
      if (!formData.paymentAmount || !formData.remark) {
        Swal.fire({
          title: "error",
          text: "All fields are required.",
          icon: "error",
        });
      }
      try {
        const options = {
          url: `${baseURL}${UPDATE_GIVEN_AMOUNT}${purchaesId}`,
          method: "POST",
          data: formData
        };
        const fetchapi = await axios.request(options);
        const resp: any = await fetchapi;
        const { response, baseResponse } = resp;
        if(baseResponse.status==1)
        {
          Swal.fire({
            title: "Success",
            text: baseResponse.message,
            icon: "success",
          });
          handleCloseModal(); 
          setFormData({
            paymentAmount: '',
            remark: '',
          });
          setPurchesId("");
        }
        else{
          Swal.fire({
            title: "error",
            text: baseResponse.message,
            icon: "error",
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">Purchaes</h4>
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
                {vendor?.purchases?.length > 0 ? (
                    <>
                        {vendor?.purchases?.map((purchaes: any,index:any) => (
                            <tr key={purchaes._id}>
                                <td>{++index}</td>
                                <td>{purchaes.product_name}</td>
                                <td>{purchaes.bill_date}</td>
                                <td>{purchaes.product_qty}</td>
                                <td>{purchaes.product_price}</td>
                                <td>{purchaes.bill_no}</td>
                                <td>{purchaes.sgst}</td>
                                <td>{purchaes.cgst}</td>
                                <td>{purchaes.igst}</td>
                                <td>{purchaes.total_amount_without_tax}</td>
                                <td>{purchaes.total_amount_with_tax}</td>
                                <td>{purchaes.status}</td>
                                <td>{purchaes.amount_given}</td>
                                <td>{purchaes.total_amount_with_tax - purchaes.amount_given}</td>
                                <td>
                                    <Button variant="link" onClick={() => handleShowModal(purchaes._id)}>
                                        payment
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </>
                ) : (
                    <tr>
                        <td colSpan={columns.length} className="text-center">
                            Purchaes history not found
                        </td>
                    </tr>
                )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formPayment">
                <Form.Label>Payment Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter payment amount"
                  name="paymentAmount"
                  value={formData.paymentAmount}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formRemark" className="mt-3">
                <Form.Label>Remark</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter remark"
                  name="remark"
                  value={formData.remark}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      )}

    </Col>
  );
};

export default Purchase;
