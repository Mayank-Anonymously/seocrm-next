import React, { useEffect, useMemo } from "react";
import { Table, Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUser } from "Components/slices/user/thunk";
import axios from "axios";
import Swal from "sweetalert2";
import { DELETE_VACATION_BY_ID, baseURL } from "Components/helpers/url_helper";
import moment from "moment";

const ManualRecharge = ({ userId }: any) => {
  const dispatch: any = useDispatch();

  const data = useSelector((state: any) => state.user.userdata || []);

  useEffect(() => {
    dispatch(GetAllUser());
  }, [dispatch]);

  // Filter the data to get the specific user's data
  const user = data.find((user: any) => user._id === userId);

  const columns = useMemo(() => {
    const baseColumns = [
      { Header: "SNO", accessor: "sno" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Date/Time", accessor: "date" }
    ];
    return baseColumns;
  }, [user]);

  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">Manual Recharges</h4>
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
                {user?.manualrecharges?.length > 0 ? (
                        <>
                            {user?.manualrecharges?.map((manualrecharge: any,index:any) => (
                                <tr key={manualrecharge._id}>
                                    <td>{++index}</td>
                                    <td>{manualrecharge.amount}</td>
                                    <td>{moment(manualrecharge.createdAt).format("DD MMM YY, h:mm A")}</td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="text-center">
                                Manual Recharges not found
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

export default ManualRecharge;
