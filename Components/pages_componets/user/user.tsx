import React, { useEffect, useMemo, useState } from "react";
import { Table, Card, Col, FormControl,Button, Modal,Form  , Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUser } from "Components/slices/user/thunk";
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from 'react-data-table-component';

import moment from "moment";
import Link from "next/link";
import { UPDATE_USER_WALLET, baseURL } from "Components/helpers/url_helper";

const User = () => {
  const dispatch: any = useDispatch();
  const [search, setSearch] = useState(""); // State for search input
  const [userId,setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    paymentAmount: ''
  });

  const data = useSelector((state: any) => state.user.userdata || []);

  useEffect(() => {
    dispatch(GetAllUser());
  }, [dispatch]);

  // Columns definition
  const columns: any = [
		{
			name: 'Name',
			id: 'Name',
			selector: (row: any) => `${row.firstName} ${row.lastName}`,
			sortable: true,
		},
		{
			name: 'Email',
			id: 'email',
			selector: (row: any) => row.email,
			sortable: true,
			headerStyle: (selector: any, id: any) => {
				return { textAlign: 'center' }; // removed partial line here
			},
			width: '250px',
		},
		{
			name: 'Action',
			id: 'action',
			sortable: true,
			width: '100px',
		
		},
	];

  // Filter the data based on search input
  const filteredData =[]

  console.log(data);


  return (
    <>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">All Users</h4>
        </Card.Header>

        <Card.Body>
				<Container>
        
          <FormControl
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3"
          />
        
						<DataTable
							columns={columns}
							data={filteredData.length === 0 ? data.user : filteredData}
							pagination
							defaultSortFieldId={1}
							subHeader
							
							persistTableHead
							theme={'default'}
						/>
				</Container>
        </Card.Body>
      </Card>
  
    </>
  );
};

export default User;
