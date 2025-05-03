import React, { useEffect, useMemo } from "react";
import { Table, Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUser } from "Components/slices/user/thunk";
import moment from "moment";

const UserDetails = ({ userId }: any) => {
  const dispatch: any = useDispatch();

  const data = useSelector((state: any) => state.user.userdata || []);

  useEffect(() => {
    dispatch(GetAllUser());
  }, [dispatch]);

  // Filter the data to get the specific user's data
  const user = data.find((user: any) => user._id === userId);

  const columns = useMemo(() => {
    const baseColumns = [
      { Header: "Wallet Amount", accessor: "walletAmount" },
      { Header: "DOB", accessor: "dob" },
      { Header: "Membership", accessor: "membership" },
    ];

    if (user?.membership_active) {
      baseColumns.push(
        { Header: "Membership Validity", accessor: "membership_validity" },
        { Header: "Membership Plan Discount", accessor: "membership_plan_discount" },
        { Header: "Membership Plan Value", accessor: "membership_plan_value" },
        { Header: "Membership Subscription", accessor: "membership_subscription" }
      );
    }

    return baseColumns;
  }, [user]);

  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">User Details</h4>
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
              {user ? (
                <tr key={user._id}>
                  <td>{user.walletBalance}</td>
                  <td>{user.dob}</td>
                  {user.membership_active ? (
                    <>
                      <td>{user.membership_validity}</td>
                      <td>{user.membership_plan_discount}</td>
                      <td>{user.membership_plan_value}</td>
                      <td>{user.membership_subscription}</td>
                    </>
                  ) : null}
                  <td>{user.membership_active ? "Active" : "Deactive"}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center">
                    No User Details available.
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

export default UserDetails;
