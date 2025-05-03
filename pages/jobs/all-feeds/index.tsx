import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Layout from '@common/Layout';
import { Material } from '@common/Material_Table';
import { MRT_ColumnDef } from 'material-react-table';
import { Box } from '@mui/material';
import moment from 'moment';
import { Jobs } from 'Components/interface/jobs';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllJobs } from "Components/slices/jobs/_alljobs/thunk";
import { from } from 'rxjs';
import Loader from '@common/Loader';
import Calculator from 'Components/pages_comp/Calculator';
import { api_is_selected_job_success } from 'Components/slices/calculator/reducers';
import axios from 'axios';
import { GET_ALL_JOBS, job_api_host } from 'Components/helpers/url_helper';
import {
	api_is_jobdata_loading,
	api_is_jobdata_success,
} from 'Components/slices/jobs/_alljobs/reducers';
const AllJobs = (props: any) => {
	const { data } = props;
	const dispatch: any = useDispatch();
	const { isLoading, jobdata, serverSideLoading } = useSelector(
		(state: any) => state.jobFeeds
	);
	const { userdata } = useSelector((state: any) => state.user);
	const [show, setShow] = useState<boolean>(false);
	const [loading, setloading] = useState(false);
	const [newData, setData] = useState<any>([]);
	const [allfeeds, setStructuredFeeds] = useState<any>([]);
	const { selectedJob } = useSelector((state: any) => ({
		selectedJob: state.calc.selectedJob,
	}));
	const [feedsData, setFeedsData] = useState<any>([]);
	var rows: any = [];

	const columns = useMemo<MRT_ColumnDef<Jobs>[]>(
		() => [
			{
				id: 'Job-details', //id used to define `group` column
				header: '',
				columns: [
					{
						accessorFn: (row) => `${row.SourceID}`, //accessorFn used to join multiple data into a single cell
						id: 'SourceID', //id is still required when using accessorFn instead of accessorKey
						header: 'Job-Id',
						enableClickToCopy: true,
						size: 100,
						Cell: ({ renderedCellValue, row }: any) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>{renderedCellValue}</span>
							</Box>
						),
					},
					{
						accessorKey: 'WorkType', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						filterVariant: 'autocomplete',
						header: 'WorkType',
						size: 100,
						Cell: ({ renderedCellValue, row }: any) => {
							const value =
								typeof renderedCellValue === 'string' && renderedCellValue;

							return (
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: '1rem',
									}}>
									{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
									<span>
										{value === '1'
											? 'Travel'
											: value === '2'
											? 'Perm'
											: value === '3'
											? 'Per-Diem'
											: value}
									</span>
								</Box>
							);
						},
						filterFn: 'contains',
						filterSelectOptions: [
							{ label: 'Travel', value: '1' },
							{ label: 'Perm', value: '2' },
							{ label: 'Per-Diem', value: '3' },
						],
					},
					{
						accessorKey: 'Alias', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						filterVariant: 'autocomplete',
						header: 'VMS-Alias',
						size: 100,
						Cell: ({ renderedCellValue, row }: any) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>{renderedCellValue}</span>
							</Box>
						),
					},

					{
						accessorKey: 'StatusString', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						filterVariant: 'autocomplete',
						header: 'StatusString',
						size: 100,
						Cell: ({ renderedCellValue, row, cell }: any) => (
							<Box
								sx={(theme) => ({
									backgroundColor:
										cell.getValue() == 'Closed'
											? theme.palette.error.dark
											: cell.getValue() == 'Cancelled' &&
											  cell.getValue() == 'Frozen'
											? theme.palette.warning.dark
											: theme.palette.success.dark,
									borderRadius: '0.25rem',
									color: '#fff',
									maxWidth: '9ch',
									p: '0.25rem',
								})}>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>
									{renderedCellValue === 'O' ? 'Open' : renderedCellValue}
								</span>
							</Box>
						),
					},
					{
						accessorKey: 'Priority', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						filterVariant: 'autocomplete',
						header: 'Priority',
						size: 100,
						Cell: ({ renderedCellValue, row }: any) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>{renderedCellValue}</span>
							</Box>
						),
					},
					{
						accessorKey: 'Degree', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						filterVariant: 'multi-select',
						header: 'Profession',
						size: 100,
						Cell: ({ renderedCellValue, row }: any) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>{renderedCellValue}</span>
							</Box>
						),
					},
					{
						accessorKey: 'JobSpecialty', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						filterVariant: 'multi-select',
						header: 'Speciality',
						size: 100,
						Cell: ({ renderedCellValue, row }: any) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>{renderedCellValue}</span>
							</Box>
						),
					},
					{
						accessorKey: 'Facility', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						filterVariant: 'multi-select',
						header: 'Facility',
						size: 100,
						Cell: ({ renderedCellValue, row }: any) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>{renderedCellValue}</span>
							</Box>
						),
					},
					{
						accessorKey: 'City', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						filterVariant: 'autocomplete',
						header: 'City',
						size: 100,
						Cell: ({ renderedCellValue, row }: any) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>{renderedCellValue}</span>
							</Box>
						),
					},
					{
						accessorKey: 'State', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						filterVariant: 'autocomplete',
						header: 'State',
						size: 100,
						Cell: ({ renderedCellValue, row }: any) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>{renderedCellValue}</span>
							</Box>
						),
					},
					{
						accessorKey: 'FormattedStartDate', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						filterVariant: 'autocomplete',
						header: 'Start Date',
						size: 100,
						Cell: ({ renderedCellValue, row }: any) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>{renderedCellValue}</span>
							</Box>
						),
					},
					{
						accessorKey: 'FormattedEndDate', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						filterVariant: 'autocomplete',
						header: 'End Date',
						size: 100,
						Cell: ({ renderedCellValue, row }: any) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>{renderedCellValue}</span>
							</Box>
						),
					},
					{
						accessorKey: 'Shift', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						filterVariant: 'autocomplete',
						header: 'Shift',
						size: 100,
						Cell: ({ renderedCellValue, row }: any) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>{renderedCellValue}</span>
							</Box>
						),
					},
					{
						accessorFn: (row) => `${row.DurationWeeks}`, //accessorFn used to join multiple data into a single cell
						id: 'DurationWeeks', //id is still required when using accessorFn instead of accessorKey
						header: 'DurationWeeks',
						size: 100,
					},

					{
						accessorKey: 'BillRate', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						header: 'Bill Rate',
						size: 100,
						Cell: ({ renderedCellValue, row }: any) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>{renderedCellValue}</span>
							</Box>
						),
					},
					{
						accessorKey: 'SourceName', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						filterVariant: 'autocomplete',
						header: 'VMS-Name',
						size: 100,
						Cell: ({ renderedCellValue, row }: any) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>{renderedCellValue}</span>
							</Box>
						),
					},
					{
						accessorKey: 'PostDate', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						header: 'Post Date',
						size: 100,

						Cell: ({ renderedCellValue, row }: any) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>{renderedCellValue}</span>
							</Box>
						),
						sortValue: ({ row }: any) => row.values['PostDate'],
						sortComparator: (a: any, b: any) => {
							var dateA = new Date(a.PostDate);
							var dateB = new Date(b.PostDate);
							if (dateA < dateB) {
								return 1; // Change the return value to put the latest date first
							}
							if (dateA > dateB) {
								return -1; // Change the return value to put the earlier date first
							}
							// If dates are equal, return 0
							return 0;
						},
					},
				],
			},
		],
		[]
	);

	for (let index = 0; index < data.length; index++) {
		const element = data[index];
		rows.push({
			...element,
			PostDate: moment(element.PostDate).format('MM-DD-YYYY'),
		});
	}

	useEffect(() => {
		dispatch(api_is_jobdata_success(data));
	}, []);

  
	return (
		<React.Fragment>
			<Head>
				<title>All_Jobs | Midas</title>
			</Head>

			<div className='page-content'>
				<Material
					columns={columns}
					data={rows}
					jobDetailModal={true}
					exportData={true}
					billCalculator={true}
					dispatch={dispatch}
					setShow={setShow}
					show={show}
				/>

				<Calculator
					show={show}
					setShow={setShow}
					onHide={() => {
						dispatch(api_is_selected_job_success([]));
						setShow(false);
					}}
					values={selectedJob}
				/>
			</div>
		</React.Fragment>
	);
};

export const getServerSideProps = async () => {
	try {
		const fetchApi = await axios.get(`${job_api_host}/allvms/getAllFeeds`);
		const responseData: any = await fetchApi; // Assuming responseData is an array of incremental data

		const data = responseData.map((ite: any) =>
			Object.keys(ite).map((item, index) => ite[item])
		);

		return { props: { data: data[0] } };
	} catch (error) {
		console.error('Error fetching incremental data:', error);
		return { props: { data: [] } }; // Return empty array or handle error accordingly
	}
};

AllJobs.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};

export default AllJobs;
