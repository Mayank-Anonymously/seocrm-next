import { selected_is_success } from "Components/slices/membership/reducer";
import { GetMembership } from "Components/slices/membership/thunk";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Card, Col, Row, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const RoleTable = () => {
  const router = useRouter();
  const { data } = useSelector((state: any) => ({
    data: state.membership.data,
  }));
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(GetMembership());
  }, [dispatch]);

  const handleEdit = (item: any) => {
    router.push(`/membership/edit-membership/${item._id}`);
    dispatch(selected_is_success(item));
  };

  const handleDelete = (itemId: string) => {
    // Implement delete functionality here
    console.log(`Delete item with ID: ${itemId}`);
  };

  return (
    <div>
      <Col xl={14}>
        {data.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any) => {
                return item.membershipDetails.map((itex: any) => {
                  return itex.details.map((itz: any, index: number) => {
                    return (
                      <tr key={`${item._id}-${index}`}>
                        <td>{itex.membershipTitle}</td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => handleEdit(item)}
                            className="me-2"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  });
                });
              })}
            </tbody>
          </Table>
        ) : (
          <p>No Role data available.</p>
        )}
      </Col>
    </div>
  );
};

export default RoleTable;
