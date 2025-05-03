import React, { useEffect, useMemo } from "react";
import { Table, Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUser } from "Components/slices/user/thunk";
import axios from "axios";
import Swal from "sweetalert2";
import { DELETE_VACATION_BY_ID, baseURL } from "Components/helpers/url_helper";
import moment from "moment";

const Vacations = ({ userId }: any) => {
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
      { Header: "Start Date", accessor: "startdate" },
      { Header: "End Date", accessor: "enddate" },
      { Header: "End Vacation", accessor: "endvacation" },
    ];
    return baseColumns;
  }, [user]);

  const handleEndVacations = async(vacation_id:any)=>{
    try {
        const data:any = await axios.delete(`${baseURL}${DELETE_VACATION_BY_ID}${vacation_id}`);
        const {baseResponse,response}:any = data;
        if (baseResponse.status === 1) {
          Swal.fire({
            title: "Success",
            text: baseResponse.message,
            icon: "success",
          });
          dispatch(GetAllUser());
        }else if (baseResponse.status === 0) {
          Swal.fire({
            title: "error",
            text: baseResponse.message,
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error toggling status:", error);
      }
  }

  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">Vacations</h4>
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
                {user?.vacations?.length > 0 ? (
                        <>
                            {user?.vacations?.map((vacation: any,index:any) => (
                                <tr key={vacation._id}>
                                    <td>{++index}</td>
                                    <td>{moment(vacation.start_date).format("Do MMM YY")}</td>
                                    <td>{moment(vacation.end_date).format("Do MMM YY")}</td>
                                    <td><button className="btn btn-success" onClick={()=>handleEndVacations(vacation._id)}>End vacation</button></td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="text-center">
                                Vacations not found
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

export default Vacations;
