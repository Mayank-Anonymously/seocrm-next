import React, { useEffect, useMemo } from "react";
import { Table, Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUser } from "Components/slices/user/thunk";
import moment from "moment";

const WalletHistory = ({ userId }: any) => {
  const dispatch: any = useDispatch();

  const data = useSelector((state: any) => state.user.userdata || []);

  useEffect(() => {
    dispatch(GetAllUser());
  }, [dispatch]);

  // Filter the data to get the specific user's data
  const user = data.find((user: any) => user._id === userId);

  const columns = useMemo(() => {
    const baseColumns = [
      { Header: "Transaction Id", accessor: "transactionid" },
      { Header: "Transaction Amount", accessor: "transactionamount" },
      { Header: "Transaction Type", accessor: "transactiontype" },
      { Header: "Transaction Time", accessor: "transactiontime" },
    ];
    return baseColumns;
  }, [user]);

  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">Wallet History</h4>
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
            {user?.transactions?.length > 0 ? (
                    <>
                        {user?.transactions?.map((transaction: any) => (
                            <tr key={transaction._id}>
                                <td>{transaction.ref_id}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.transaction_type}</td>
                                <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </>
                ) : (
                    <tr>
                        <td colSpan={columns.length} className="text-center">
                            User transactions history not found
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

export default WalletHistory;
