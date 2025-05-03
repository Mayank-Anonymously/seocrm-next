import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Dropdown } from "react-bootstrap";
import TableContainer from "@common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { imagebaseURL } from "Components/helpers/url_helper";
import moment from "moment";
import { GetAllOrders, OrderByStatus } from "Components/slices/order/thunk";
import Custom_Modal from "@common/Modal";
import { is_selected_success } from "Components/slices/order/reducer";
import { GetAllProduct } from "Components/slices/product/thunk";

const DeliveryDetails = () => {
  const dispatch: any = useDispatch();
  const { order, productdata } = useSelector((state: any) => ({
    order: state.order.fetchedbystatus,
    productdata: state.ProductSlice.productdata,
  }));

  const [showStatus, setShowStatus] = useState(false);

  var rows: any = [];

  // for (let index = 0; index < order.length; index++) {
  //   const parentelement = order[index];

  //   for (let index = 0; index < parentelement.product.length; index++) {
  //     const element = parentelement.product[index];

  //     console.log(element);
  //     productdata.response
  //       .filter((item: any) => item._id === element.id)
  //       .map((itex: any) => {
  //         rows.push({
  //           ...itex,
  //           quantity: element.selQty,
  //         });
  //       });
  //   }
  // }

  // Set to store unique product names
  const uniqueProductNames = new Set();

  // Map to store unique product names and their quantities
  const productQuantities: any = {};

  for (let parentIndex = 0; parentIndex < order.length; parentIndex++) {
    const parentElement = order[parentIndex];

    for (
      let productIndex = 0;
      productIndex < parentElement.product.length;
      productIndex++
    ) {
      const element = parentElement.product[productIndex];
      const { name, selQty } = element;

      // Add product name to the set if it doesn't exist
      if (!uniqueProductNames.has(name)) {
        uniqueProductNames.add(name);
      }

      // Add quantity to the corresponding product name in the map
      if (productQuantities.hasOwnProperty(name)) {
        productQuantities[name] += selQty;
      } else {
        productQuantities[name] = selQty;
      }
    }
  }

  // Convert the Set to an array and add quantities from the map
  const uniqueProductsWithQuantities = Array.from(uniqueProductNames).map(
    (name: any) => ({
      name: name,
      quantity: productQuantities[name],
    })
  );

  console.log(uniqueProductsWithQuantities);

  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        disableFilters: true,
        filterable: true,
        accessor: "name",
      },

      {
        Header: "Quantity",
        disableFilters: true,
        filterable: true,
        accessor: "quantity",
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(GetAllProduct());
    dispatch(OrderByStatus("ASSIGNED"));
  }, []);
  return (
    <Col xl={12}>
      <Card>
        <Card.Header className="align-items-center d-flex mb-n2">
          <h4 className="card-title mb-0 flex-grow-1">Delivery details</h4>
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
          data={uniqueProductsWithQuantities || []}
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

export default DeliveryDetails;
