import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '@common/Layout';
import Breadcrumb from '@common/Breadcrumb';
import { Container } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Custom_Filter from '@common/utils/filter/filter_utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQueries } from 'Components/slices/client/thunk';
import { useRouter } from 'next/router';
import Loader2 from '@common/Loader2';
import Swal from 'sweetalert2';
import moment from 'moment';

const ViewClient = () => {
	const router = useRouter();
	const dispatch: any = useDispatch();
	const { customerQuery } = useSelector((state: any) => state.customer);
	const [filteredData, setFilteredData] = useState<any>([]);
	const [currentRole, setCurrentRole] = useState<any>({});

	const { isLoading } = useSelector((state: any) => ({
		isLoading: state.customer.isLoading,
	}));

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
			cell: (row: any) => (
				<>
					{currentRole.role === 'SUPERADMIN' && (
						<span
							className='cursor-pointer'
							title='Delete'
							onClick={() => {
								Swal.fire({
									title: 'Delete Query?',
									text: 'Are you sure you want to delete this record?',
									showCancelButton: true,
									showCloseButton: true,
								}).then((results) => {
									if (results.isConfirmed) {
										// dispatch(deleteClient(row._id));
									}
								});
							}}>
							<i
								style={{ fontSize: '18px', color: 'red' }}
								className='bi bi-trash'></i>
						</span>
					)}
				</>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
	];

	useEffect(() => {
		const roleData = localStorage.getItem('currentrole');
		if (roleData) {
			const parsedRole = JSON.parse(roleData);
			setCurrentRole(parsedRole[0] || {});
		}
		dispatch(fetchQueries());
	}, [dispatch]);

	return (
		<React.Fragment>
			<Head>
				<title>View Queries | Midas - HRMS</title>
			</Head>
			<div className='page-content'>
				<Breadcrumb
					breadcrumbItem='View Clients'
					breadcrumb='Dashboard'
				/>
				<Container fluid>
					{isLoading ? (
						<Loader2 />
					) : (
						<DataTable
							columns={columns}
							data={filteredData.length ? filteredData : customerQuery}
							pagination
							defaultSortFieldId={1}
							subHeader
							subHeaderComponent={
								<Custom_Filter
									data={customerQuery}
									setFilteredData={setFilteredData}
								/>
							}
							persistTableHead
						/>
					)}
				</Container>
			</div>
		</React.Fragment>
	);
};

ViewClient.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default ViewClient;
