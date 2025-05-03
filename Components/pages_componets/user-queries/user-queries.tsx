import React, { useEffect, useMemo, useState } from "react";
import { Table, Card, Col, FormControl  } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";
import { GetAllQuery } from "Components/slices/user_vacations/thunk";
import { DELETE_VACATION_BY_ID, baseURL } from "Components/helpers/url_helper";
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from 'react-data-table-component';



const UserVactions = () => {
  const dispatch: any = useDispatch();
  const [search, setSearch] = useState("");

  const data = useSelector((state: any) => state.uservacations.uservacations || []);


  useEffect(() => {
    dispatch(GetAllQuery());
  }, [dispatch]);

  // Columns definition
  const columns = [
		{
			name: 'Title',
			selector: (row: any) => row.title,
			sortable: true,
		},
		{
			name: 'Name',
			selector: (row: any) => row.name,
			sortable: true,
		},
		{
			name: 'Email',
			selector: (row: any) => row.email,
			sortable: true,
		},
		{
			name: 'Contact Number',
			selector: (row: any) => row.contactNo,
			sortable: true,
		},
		{
			name: 'Address',
			selector: (row: any) => row.address,
			sortable: true,
		},
		{
			name: 'Query',
			selector: (row: any) => row.query,
			sortable: false,
		},
		{
			name: 'Created At',
			selector: (row: any) => moment(row.createdAt).format('YYYY-MM-DD HH:mm'),
			sortable: true,
		},
		{
			name: 'Updated At',
			selector: (row: any) => moment(row.updatedAt).format('YYYY-MM-DD HH:mm'),
			sortable: true,
		},
		{
			name: 'Action',
			cell: (row: any) => <></>,
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
	];

  // Filter the data based on search input
  const filteredData =[]

  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">All Users Vactions</h4>
        </Card.Header>
        <Card.Body>
          {/* Search Input */}
    
        <DataTable
							columns={columns}
							data={filteredData.length === 0 ? data : filteredData}
							pagination
							defaultSortFieldId={1}
							subHeader
						
							persistTableHead
							theme={'default'}
						/>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default UserVactions;
