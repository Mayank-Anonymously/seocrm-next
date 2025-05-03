import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Card, Col, NavItem, Row } from 'react-bootstrap';
import Head from 'next/head';
import Layout from '@common/Layout';
import CountUp from 'react-countup';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import Loader from '@common/Loader';
import { MRT_ColumnDef } from 'material-react-table';
import { Jobs } from 'Components/interface/jobs';
import moment from 'moment';
import sampleJobs from '../Components/Common/sampleJobs';
import DashBoardTable from '@common/DashboardTable';
import DataTable from 'react-data-table-component';
import banner from '../Components/assets/images/bannerimg.jpg';
import BarCharts from '@component/index';
import ZoomIntegrationPage from '@common/ZoomIntegrationPage';
import IncrementalDataComponent from 'pages/PipelinesforGrid';
import axios, { AxiosResponse } from 'axios';
import { from, Observable, of, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

const Dashboard = (props: any) => {
	const dispatch: any = useDispatch();
	const [feedsData, setFeedsData] = useState<any>([]);
	const [username, setusername] = useState<any>({});
	const [loading, setloading] = useState(true);
	const [jobdata, setData] = useState<any>([]);
	const { userdata, isLoading, selectedJob, assigntouser } = useSelector(
		(state: any) => ({
			isLoading: state.jobFeeds.isLoading,
			selJobs: state.clientFeeds.selJobs,
			userdata: state.user.userdata,
			selectedJob: state.calc.selectedJob,
			assigntouser: state.VMS.assigntouser,
		})
	);

	useEffect(() => {
		if (localStorage.getItem('authUser')) {
			const obj = JSON.parse(localStorage.getItem('authUser') || '');
			setusername(obj);
			// dispatch(fetchAllJobs());
		}
	}, []);

	const openFilterJob =
		jobdata.length !== 0
			? jobdata
					.filter(
						(item: any) =>
							item.StatusString === 'Open' || item.StatusString === 'O'
					)
					.map((ite: any) => ite)
			: [];

	return (
		<React.Fragment>
			<Head>
				<title>Dashboard | Midas - Jobs Portal</title>
			</Head>

			<div className='page-content'>
				<div
					className='d-flex align-items-center mb-1'
					style={{ gap: '10px' }}>
					<div className='avatar-sm flex-shrink-0'>
						<span className='avatar-title bg-success-subtle rounded fs-3'>
							<i className='bx bx-user-circle text-info'></i>
						</span>
					</div>
					<div className='heading-container'>
						<h2>Anaylatics Dashboard</h2>
						<h6>
							Navigating Opportunities with Our Job Portal Admin Dashboard
						</h6>
					</div>
				</div>
				<Row>
					<Col
						xl={4}
						md={4}>
						<Card className='card-animate'>
							<Card.Body>
								<div className='d-flex justify-content-between'>
									<div className='flex-grow-1'>
										<p className='text-uppercase fw-medium text-muted text-truncate fs-13'>
											Active Users
										</p>
										<h4 className='fs-22 fw-semibold mb-3'>
											<CountUp
												start={0}
												end={userdata.length}
												duration={3}
											/>
										</h4>
										<div className='d-flex align-items-center gap-2'>
											<h5 className='text-success fs-12 mb-0'>
												<i className='ri-arrow-right-up-line fs-13 align-middle'></i>
												+29.08 %
											</h5>
											<p className='text-muted mb-0'>than last week</p>
										</div>
									</div>
									<div className='avatar-sm flex-shrink-0'>
										<span className='avatar-title bg-warning-subtle rounded fs-3'>
											<i className='bx bx-user-circle text-warning'></i>
										</span>
									</div>
								</div>
							</Card.Body>
							<div className='animation-effect-6 text-warning opacity-25'>
								<i className='bi bi-person'></i>
							</div>
							<div className='animation-effect-4 text-warning opacity-25'>
								<i className='bi bi-person-fill'></i>
							</div>
							<div className='animation-effect-3 text-warning opacity-25'>
								<i className='bi bi-people'></i>
							</div>
						</Card>
					</Col>
					{/* {loading === true ? (
            <div>
              <Loader />
            </div>
          ) : (
            <>
              {jobdata.map((item: any) => {
                return <div key={item.id}>{item.SourceID}</div>;
              })}
            </>
          )} */}
					<Col
						xl={4}
						md={4}>
						<Card className='card-animate'>
							<Card.Body>
								<div className='d-flex justify-content-between'>
									<div className='flex-grow-1'>
										<p className='text-uppercase fw-medium text-muted text-truncate fs-13'>
											ALL Jobs
										</p>
										<h4 className='fs-22 fw-semibold mb-3'>
											<>
												{jobdata.length > 0 ? (
													<CountUp
														start={0}
														end={jobdata > 0 ? jobdata.length : 0}
														duration={3}
														// prefix="$"
													/>
												) : (
													<CircularProgress />
												)}
											</>
										</h4>
										<div className='d-flex align-items-center gap-2'>
											<h5 className='text-success fs-12 mb-0'>
												<i className='ri-arrow-right-up-line fs-13 align-middle'></i>{' '}
												+18.30 %
											</h5>
											<p className='text-muted mb-0'>than last week</p>
										</div>
									</div>
									<div className='avatar-sm flex-shrink-0'>
										<span className='avatar-title bg-success-subtle rounded fs-3'>
											<i className='bx bx-dollar-circle text-success'></i>
										</span>
									</div>
								</div>
							</Card.Body>
							<div className='animation-effect-6 text-success opacity-25'>
								<i className='bi bi-currency-dollar'></i>
							</div>
							<div className='animation-effect-4 text-success opacity-25'>
								<i className='bi bi-currency-pound'></i>
							</div>
							<div className='animation-effect-3 text-success opacity-25'>
								<i className='bi bi-currency-euro'></i>
							</div>
						</Card>
					</Col>

					<Col
						xl={4}
						md={4}>
						<Card className='card-animate'>
							<Card.Body>
								<div className='d-flex justify-content-between'>
									<div className='avatar-sm flex-shrink-0'>
										<span className='avatar-title bg-info-subtle rounded fs-3'>
											<i className='bx bx-shopping-bag text-info'></i>
										</span>
									</div>
									<div className='text-end flex-grow-1'>
										<p className='text-uppercase fw-medium text-muted text-truncate fs-13'>
											Open Jobs
										</p>
										<h4 className='fs-22 fw-semibold mb-3'>
											{openFilterJob.length > 0 ? (
												<CountUp
													start={0}
													end={openFilterJob.length}
													duration={3}
												/>
											) : (
												<CircularProgress />
											)}
										</h4>
										<div className='d-flex align-items-center justify-content-end gap-2'>
											<h5 className='text-danger fs-12 mb-0'>
												<i className='ri-arrow-right-down-line fs-13 align-middle'></i>{' '}
												-2.74 %
											</h5>
											<p className='text-muted mb-0'>than last week</p>
										</div>
									</div>
								</div>
							</Card.Body>
							<div className='animation-effect-6 text-info opacity-25 left'>
								<i className='bi bi-handbag'></i>
							</div>
							<div className='animation-effect-4 text-info opacity-25 left'>
								<i className='bi bi-shop'></i>
							</div>
							<div className='animation-effect-3 text-info opacity-25 left'>
								<i className='bi bi-bag-check'></i>
							</div>
						</Card>
					</Col>

					<Col
						xl={12}
						md={12}>
						<div
							className='welcome-banner d-flex justify-content-between mb-2'
							style={{ backgroundColor: '#a9d0fb', borderRadius: '5px' }}>
							<div className='welcome-text mt-5 ms-3'>
								<h2>Welcome back,</h2>
								<h3>{username.fullName} !</h3>
								<h5 className='mt-3'>
									Welcome to <strong>Midas Job Portal.</strong>
								</h5>
							</div>
							<div className='welcome-image'>
								<Image
									src={banner}
									alt='dummyuser'
									style={{ width: '150px', height: 'auto' }}
								/>
							</div>
						</div>
					</Col>
					{/* <ZoomIntegrationPage /> */}
				</Row>
			</div>
		</React.Fragment>
	);
};
// export const getServerSideProps = async () => {
//   try {
//     const fetchApi = await axios.get(
//       "https://api.midastech.org/api/allvms/getAllFeeds"
//     );
//     const responseData: any = await fetchApi; // Assuming responseData is an array of incremental data

//     const data = responseData.map((ite: any) =>
//       Object.keys(ite).map((item, index) => ite[item])
//     );

//     return { props: { data: data[0] } };
//   } catch (error) {
//     console.error("Error fetching incremental data:", error);
//     return { props: { data: [] } }; // Return empty array or handle error accordingly
//   }
// };

Dashboard.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};

export default Dashboard;
