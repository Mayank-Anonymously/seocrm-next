import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import html2canvas from 'html2canvas';
import { Input } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import Loader2 from '@common/Loader2';
import Case_one from 'Components/payppackge/case_one_lesser_forty';
import Case_two from 'Components/payppackge/case_two_greater_forty';
import Case_three from 'Components/payppackge/case_three_state_ca';

const Calculator = ({ values, onHide, show, setShow }: any) => {
	const dispatch: any = useDispatch();
	const { mealRate, lodgingRate, lodgemonth } = useSelector(
		(state: any) => state.calc
	);
	const { selectedJob } = useSelector((state: any) => ({
		selectedJob: state.calc.selectedJob,
	}));

	// const seljob: any = JSON.parse(localStorage.getItem("selectedjob") || "");
	const targetElementRef = useRef(null);
	const tableRef = useRef(null);
	var currdata: any = selectedJob;
	var lodgeRate: any = (lodgingRate.value + mealRate) * 7;
	let [data, setData] = useState<any>(lodgeRate);
	const [currentData, setCurrentData] = useState<any>(values);

	const [shiftHours, setShiftHours] = useState<any>([]);
	//Screenshot Logic **************************
	const captureScreenshot = () => {
		const element = targetElementRef.current;

		if (!element) {
			console.error('Target element not found.');
			return;
		}
		html2canvas(element).then((canvas) => {
			const screenshotUrl = canvas.toDataURL();
			const a = document.createElement('a');
			a.href = screenshotUrl;
			a.download = 'pay_package.png';
			a.click();
		});
	};

	//Screenshot Logic *************************
	const handleChange = (name: any, e: any) => {
		setCurrentData(values);
		if (name === 'GuaranteedHours' && e.target.value === '') {
			setCurrentData({
				...values,
				[name]: 0,
			});
		} else {
			setCurrentData({
				...values,
				[name]: e.target.value,
			});
		}
	};

	useEffect(() => {
		if (localStorage.getItem('selectedjob')) {
			const jobs = JSON.parse(localStorage.getItem('selectedjob') || '');
			setShiftHours(jobs.Shift.split('x'));
		}
	}, []);

	let gHours = currentData
		? currentData.GuaranteedHours
		: values.GuaranteedHours;
	let guaranteedHours = parseInt(gHours);
	var hours = parseInt(shiftHours[1]);

	return (
		<>
			<Modal
				onHide={() => {
					onHide();
					setCurrentData('');
					setData('');
				}}
				show={show}
				size='xl'
				contentClassName='bill-calculator'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header className='mb-3'>
					<Modal.Title id='contained-modal-title-vcenter'>
						Deal Sheet
					</Modal.Title>
					<Button
						variant='danger'
						onClick={() => {
							setShow(false);
							setData('');
							setCurrentData('');
						}}>
						<i className='bi bi-x-lg'></i>
					</Button>
				</Modal.Header>
				<div>
					<div
						className='download-buttons mt-2 d-flex justify-content-end me-4'
						style={{ gap: '15px' }}>
						<button
							className='btn btn-primary'
							onClick={captureScreenshot}>
							Image <i className='bi bi-card-image'></i>
						</button>
						<DownloadTableExcel
							filename='users table'
							sheet='users'
							currentTableRef={tableRef.current}>
							<button className='btn btn-secondary'>
								Export excel <i className='bi bi-download'></i>{' '}
							</button>
						</DownloadTableExcel>
					</div>
				</div>
				{!values ? (
					''
				) : (
					<Modal.Body>
						{currentData.State === 'CA' && hours > 8 ? (
							<Case_three
								currentValue={currentData ? currentData : values}
								onChange={handleChange}
								targetElementRef={targetElementRef}
								tableRef={tableRef}
								values={selectedJob}
								gHours={guaranteedHours}
								BRate={currentData ? currentData.BillRate : values.BillRate}
								mealRate={mealRate}
								lodgingRate={lodgingRate}
								lodgemonth={lodgemonth}
							/>
						) : guaranteedHours <= 40 ? (
							<Case_one
								currentValue={currentData ? currentData : values}
								onChange={handleChange}
								targetElementRef={targetElementRef}
								tableRef={tableRef}
								values={values}
								gHours={guaranteedHours}
								BRate={currentData ? currentData.BillRate : values.BillRate}
								mealRate={mealRate}
								lodgingRate={lodgingRate}
								lodgemonth={lodgemonth}
							/>
						) : guaranteedHours > 40 ? (
							<Case_two
								currentValue={currentData ? currentData : values}
								onChange={handleChange}
								targetElementRef={targetElementRef}
								tableRef={tableRef}
								values={values}
								gHours={guaranteedHours}
								BRate={currentData ? currentData.BillRate : values.BillRate}
								mealRate={mealRate}
								lodgingRate={lodgingRate}
								lodgemonth={lodgemonth}
							/>
						) : (
							<Case_one
								currentValue={currentData ? currentData : values}
								onChange={handleChange}
								targetElementRef={targetElementRef}
								tableRef={tableRef}
								values={values}
								gHours={guaranteedHours}
								BRate={currentData ? currentData.BillRate : values.BillRate}
								mealRate={mealRate}
								lodgingRate={lodgingRate}
								lodgemonth={lodgemonth}
							/>
						)}
					</Modal.Body>
				)}
			</Modal>
		</>
	);
};

export default Calculator;
