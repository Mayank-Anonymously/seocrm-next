import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { withRouter } from 'next/router';
import { useRouter } from 'next/router';

//SimpleBar
import SimpleBar from 'simplebar-react';
import classnames from 'classnames';

import { Offcanvas, Collapse, Button } from 'react-bootstrap';

//import Constant
import {
	LAYOUT_TYPES,
	LAYOUT_SIDEBAR_TYPES,
	LAYOUT_MODE_TYPES,
	LAYOUT_WIDTH_TYPES,
	LAYOUT_POSITION_TYPES,
	LAYOUT_TOPBAR_THEME_TYPES,
	LEFT_SIDEBAR_SIZE_TYPES,
	LEFT_SIDEBAR_VIEW_TYPES,
	LEFT_SIDEBAR_IMAGE_TYPES,
	PERLOADER_TYPES,
} from '../Common/constants/layout';

//import Images
import img01 from '@assets/images/sidebar/img-1.jpg';
import img02 from '@assets/images/sidebar/img-2.jpg';
import img03 from '@assets/images/sidebar/img-3.jpg';
import img04 from '@assets/images/sidebar/img-4.jpg';
import { useSelector } from 'react-redux';

const RightSidebar = () => {
	const router = useRouter();

	const [show, setShow] = useState<boolean>(false);
	function tog_show() {
		setShow(!show);
	}

	useEffect(() => {
		if (
			show &&
			document.getElementById('sidebar-color-dark') &&
			document.getElementById('sidebar-color-light')
		) {
			const darkele = document.getElementById(
				'sidebar-color-dark'
			) as HTMLInputElement;
			const lightele = document.getElementById(
				'sidebar-color-dark'
			) as HTMLInputElement;
			darkele!.checked = false;
			lightele!.checked = false;
		}
	});

	const {
		leftSidebarType,
		layoutModeType,
		layoutWidthType,
		layoutPositionType,
		topbarThemeType,
		leftsidbarSizeType,
		leftSidebarViewType,
		leftSidebarImageType,
		preloader,
	} = useSelector((state: any) => ({
		leftSidebarType: state.Layout.leftSidebarType,
		layoutModeType: state.Layout.layoutModeType,
		layoutWidthType: state.Layout.layoutWidthType,
		layoutPositionType: state.Layout.layoutPositionType,
		topbarThemeType: state.Layout.topbarThemeType,
		leftsidbarSizeType: state.Layout.leftsidbarSizeType,
		leftSidebarViewType: state.Layout.leftSidebarViewType,
		leftSidebarImageType: state.Layout.leftSidebarImageType,
		preloader: state.Layout.preloader,
	}));

	// open offcanvas
	const [open, setOpen] = useState(false);
	const toggleLeftCanvas = () => {
		setOpen(!open);
	};

	if (typeof window !== 'undefined') {
		window.onscroll = function () {
			scrollFunction();
		};
	}

	const scrollFunction = () => {
		const element = document.getElementById('back-to-top');
		if (element) {
			if (
				document.body.scrollTop > 100 ||
				document.documentElement.scrollTop > 100
			) {
				element.style.display = 'block';
			} else {
				element.style.display = 'none';
			}
		}
	};

	const toTop = () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	};

	const pathName = router.pathname;

	useEffect(() => {
		const preloader = document.getElementById('preloader');
		if (preloader) {
			document.getElementById('preloader')!.style.opacity = '1';
			document.getElementById('preloader')!.style.visibility = 'visible';
			setTimeout(function () {
				document.getElementById('preloader')!.style.opacity = '0';
				document.getElementById('preloader')!.style.visibility = 'hidden';
			}, 1000);
		}
	}, [preloader, pathName]);

	return (
		<React.Fragment>
			<Button
				variant='danger'
				onClick={() => toTop()}
				className='btn-icon'
				id='back-to-top'>
				<i className='ri-arrow-up-line'></i>
			</Button>

			{preloader === 'enable' && (
				<div id='preloader'>
					<div id='status'>
						<div
							className='spinner-border text-primary avatar-sm'
							role='status'>
							<span className='visually-hidden'>Loading...</span>
						</div>
					</div>
				</div>
			)}

			<div>
				<div className='customizer-setting d-none d-md-block'>
					<div
						onClick={toggleLeftCanvas}
						className='btn-info btn-rounded shadow-lg btn btn-icon btn-lg p-2'>
						<i className='mdi mdi-spin mdi-cog-outline fs-22'></i>
					</div>
				</div>
				<Offcanvas
					show={open}
					onHide={toggleLeftCanvas}
					placement='end'
					className='offcanvas-end border-0'>
					<Offcanvas.Header
						className='d-flex align-items-center bg-primary bg-gradient p-3 offcanvas-header-dark'
						closeButton
						closeVariant='white'>
						<h5 className='m-0 me-2 text-white'>Theme Customizer</h5>
					</Offcanvas.Header>
					<Offcanvas.Body className='p-0'>
						<SimpleBar className='h-100'>
							<div className='p-4'>
								<h6 className='fw-semibold fs-15'>Layout</h6>
								<p className='text-muted fs-13'>Choose your layout</p>

								<div className='row'>
									<div className='col-4'>
										<div className='form-check card-radio'>
											<input
												id='customizer-layout01'
												name='data-layout'
												type='radio'
												value={LAYOUT_TYPES.VERTICAL}
												onChange={(e) => {
													if (e.target.checked) {
													}
												}}
												className='form-check-input'
											/>
											<label
												className='form-check-label p-0 avatar-md w-100'
												htmlFor='customizer-layout01'>
												<span className='d-flex gap-1 h-100'>
													<span className='flex-shrink-0'>
														<span className='bg-light d-flex h-100 flex-column gap-1 p-1'>
															<span className='d-block p-1 px-2 bg-primary-subtle rounded mb-2'></span>
															<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
															<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
															<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
														</span>
													</span>
													<span className='flex-grow-1'>
														<span className='d-flex h-100 flex-column'>
															<span className='bg-light d-block p-1'></span>
															<span className='bg-light d-block p-1 mt-auto'></span>
														</span>
													</span>
												</span>
											</label>
										</div>
										<h5 className='fs-13 text-center mt-2'>Vertical</h5>
									</div>
									<div className='col-4'>
										<div className='form-check card-radio'>
											<input
												id='customizer-layout02'
												name='data-layout'
												type='radio'
												value={LAYOUT_TYPES.HORIZONTAL}
												onChange={(e) => {
													if (e.target.checked) {
													}
												}}
												className='form-check-input'
											/>
											<label
												className='form-check-label p-0 avatar-md w-100'
												htmlFor='customizer-layout02'>
												<span className='d-flex h-100 flex-column gap-1'>
													<span className='bg-light d-flex p-1 gap-1 align-items-center'>
														<span className='d-block p-1 bg-primary-subtle rounded me-1'></span>
														<span className='d-block p-1 pb-0 px-2 bg-primary-subtle ms-auto'></span>
														<span className='d-block p-1 pb-0 px-2 bg-primary-subtle'></span>
													</span>
													<span className='bg-light d-block p-1'></span>
													<span className='bg-light d-block p-1 mt-auto'></span>
												</span>
											</label>
										</div>
										<h5 className='fs-13 text-center mt-2'>Horizontal</h5>
									</div>
									<div className='col-4'>
										<div className='form-check card-radio'>
											<input
												id='customizer-layout03'
												name='data-layout'
												type='radio'
												value={LAYOUT_TYPES.TWOCOLUMN}
												onChange={(e) => {
													if (e.target.checked) {
													}
												}}
												className='form-check-input'
											/>
											<label
												className='form-check-label p-0 avatar-md w-100'
												htmlFor='customizer-layout03'>
												<span className='d-flex gap-1 h-100'>
													<span className='flex-shrink-0'>
														<span className='bg-light d-flex h-100 flex-column gap-1'>
															<span className='d-block p-1 bg-primary-subtle mb-2'></span>
															<span className='d-block p-1 pb-0 bg-primary-subtle'></span>
															<span className='d-block p-1 pb-0 bg-primary-subtle'></span>
															<span className='d-block p-1 pb-0 bg-primary-subtle'></span>
														</span>
													</span>
													<span className='flex-shrink-0'>
														<span className='bg-light d-flex h-100 flex-column gap-1 p-1'>
															<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
															<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
															<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
															<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
														</span>
													</span>
													<span className='flex-grow-1'>
														<span className='d-flex h-100 flex-column'>
															<span className='bg-light d-block p-1'></span>
															<span className='bg-light d-block p-1 mt-auto'></span>
														</span>
													</span>
												</span>
											</label>
										</div>
										<h5 className='fs-13 text-center mt-2'>Two Column</h5>
									</div>
								</div>

								<h6 className='mt-4 fw-semibold fs-15'>Color Scheme</h6>
								<p className='text-muted fs-13'>Choose Light or Dark Scheme.</p>

								<div className='colorscheme-cardradio'>
									<div className='row'>
										<div className='col-4'>
											<div className='form-check card-radio'>
												<input
													className='form-check-input'
													type='radio'
													name='data-layout-mode'
													id='layout-mode-light'
													value={LAYOUT_MODE_TYPES.LIGHTMODE}
													checked={
														layoutModeType === LAYOUT_MODE_TYPES.LIGHTMODE
													}
													onChange={(e) => {
														if (e.target.checked) {
														}
													}}
												/>
												<label
													className='form-check-label p-0 avatar-md w-100'
													htmlFor='layout-mode-light'>
													<span className='d-flex gap-1 h-100'>
														<span className='flex-shrink-0'>
															<span className='bg-light d-flex h-100 flex-column gap-1 p-1'>
																<span className='d-block p-1 px-2 bg-primary-subtle rounded mb-2'></span>
																<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
																<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
																<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
															</span>
														</span>
														<span className='flex-grow-1'>
															<span className='d-flex h-100 flex-column'>
																<span className='bg-light d-block p-1'></span>
																<span className='bg-light d-block p-1 mt-auto'></span>
															</span>
														</span>
													</span>
												</label>
											</div>
											<h5 className='fs-13 text-center mt-2'>Light</h5>
										</div>

										<div className='col-4'>
											<div className='form-check card-radio dark'>
												<input
													className='form-check-input'
													type='radio'
													name='data-layout-mode'
													id='layout-mode-dark'
													value={LAYOUT_MODE_TYPES.DARKMODE}
													checked={
														layoutModeType === LAYOUT_MODE_TYPES.DARKMODE
													}
													onChange={(e) => {
														if (e.target.checked) {
														}
													}}
												/>
												<label
													className='form-check-label p-0 avatar-md w-100 bg-dark'
													htmlFor='layout-mode-dark'>
													<span className='d-flex gap-1 h-100'>
														<span className='flex-shrink-0'>
															<span className='d-flex h-100 flex-column gap-1 p-1'>
																<span className='d-block p-1 px-2 bg-white bg-opacity-10 rounded mb-2'></span>
																<span className='d-block p-1 px-2 pb-0 bg-white bg-opacity-10'></span>
																<span className='d-block p-1 px-2 pb-0 bg-white bg-opacity-10'></span>
																<span className='d-block p-1 px-2 pb-0 bg-white bg-opacity-10'></span>
															</span>
														</span>
														<span className='flex-grow-1'>
															<span className='d-flex h-100 flex-column'>
																<span className='bg-white bg-opacity-10 d-block p-1'></span>
																<span className='bg-white bg-opacity-10 d-block p-1 mt-auto'></span>
															</span>
														</span>
													</span>
												</label>
											</div>
											<h5 className='fs-13 text-center mt-2'>Dark</h5>
										</div>
									</div>
								</div>

								<h6 className='mt-4 fw-semibold fs-15'>Topbar Color</h6>
								<p className='text-muted fs-13'>
									Choose Light or Dark Topbar Color.
								</p>

								<div className='row'>
									<div className='col-4'>
										<div className='form-check card-radio'>
											<input
												className='form-check-input'
												type='radio'
												name='data-topbar'
												id='topbar-color-light'
												value={LAYOUT_TOPBAR_THEME_TYPES.LIGHT}
												checked={
													topbarThemeType === LAYOUT_TOPBAR_THEME_TYPES.LIGHT
												}
												onChange={(e) => {
													if (e.target.checked) {
													}
												}}
											/>
											<label
												className='form-check-label p-0 avatar-md w-100'
												htmlFor='topbar-color-light'>
												<span className='d-flex gap-1 h-100'>
													<span className='flex-shrink-0'>
														<span className='bg-light d-flex h-100 flex-column gap-1 p-1'>
															<span className='d-block p-1 px-2 bg-primary-subtle rounded mb-2'></span>
															<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
															<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
															<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
														</span>
													</span>
													<span className='flex-grow-1'>
														<span className='d-flex h-100 flex-column'>
															<span className='bg-light d-block p-1'></span>
															<span className='bg-light d-block p-1 mt-auto'></span>
														</span>
													</span>
												</span>
											</label>
										</div>
										<h5 className='fs-13 text-center mt-2'>Light</h5>
									</div>
									<div className='col-4'>
										<div className='form-check card-radio'>
											<input
												className='form-check-input'
												type='radio'
												name='data-topbar'
												id='topbar-color-dark'
												value={LAYOUT_TOPBAR_THEME_TYPES.DARK}
												checked={
													topbarThemeType === LAYOUT_TOPBAR_THEME_TYPES.DARK
												}
												onChange={(e) => {
													if (e.target.checked) {
													}
												}}
											/>
											<label
												className='form-check-label p-0 avatar-md w-100'
												htmlFor='topbar-color-dark'>
												<span className='d-flex gap-1 h-100'>
													<span className='flex-shrink-0'>
														<span className='bg-light d-flex h-100 flex-column gap-1 p-1'>
															<span className='d-block p-1 px-2 bg-primary-subtle rounded mb-2'></span>
															<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
															<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
															<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
														</span>
													</span>
													<span className='flex-grow-1'>
														<span className='d-flex h-100 flex-column'>
															<span className='bg-primary d-block p-1'></span>
															<span className='bg-light d-block p-1 mt-auto'></span>
														</span>
													</span>
												</span>
											</label>
										</div>
										<h5 className='fs-13 text-center mt-2'>Dark</h5>
									</div>
								</div>

								<div id='preloader-menu'>
									<h6 className='mt-4 fw-semibold fs-15'>Preloader</h6>
									<p className='text-muted fs-13'>Choose a preloader.</p>

									<div className='row'>
										<div className='col-4'>
											<div className='form-check sidebar-setting card-radio'>
												<input
													className='form-check-input'
													type='radio'
													name='data-preloader'
													id='preloader-view-custom'
													value={PERLOADER_TYPES.ENABLE}
													checked={preloader === PERLOADER_TYPES.ENABLE}
													onChange={(e) => {
														if (e.target.checked) {
														}
													}}
												/>

												<label
													className='form-check-label p-0 avatar-md w-100'
													htmlFor='preloader-view-custom'>
													<span className='d-flex gap-1 h-100'>
														<span className='flex-shrink-0'>
															<span className='bg-light d-flex h-100 flex-column gap-1 p-1'>
																<span className='d-block p-1 px-2 bg-primary-subtle rounded mb-2'></span>
																<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
																<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
																<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
															</span>
														</span>
														<span className='flex-grow-1'>
															<span className='d-flex h-100 flex-column'>
																<span className='bg-light d-block p-1'></span>
																<span className='bg-light d-block p-1 mt-auto'></span>
															</span>
														</span>
													</span>
													{/* <!-- <div id="preloader"> --> */}
													<div
														id='status'
														className='d-flex align-items-center justify-content-center'>
														<div
															className='spinner-border text-primary avatar-xxs m-auto'
															role='status'>
															<span className='visually-hidden'>
																Loading...
															</span>
														</div>
													</div>
													{/* <!-- </div> --> */}
												</label>
											</div>
											<h5 className='fs-13 text-center mt-2'>Enable</h5>
										</div>
										<div className='col-4'>
											<div className='form-check sidebar-setting card-radio'>
												<input
													className='form-check-input'
													type='radio'
													name='data-preloader'
													id='preloader-view-none'
													value={PERLOADER_TYPES.DISABLE}
													checked={preloader === PERLOADER_TYPES.DISABLE}
													onChange={(e) => {
														if (e.target.checked) {
														}
													}}
												/>
												<label
													className='form-check-label p-0 avatar-md w-100'
													htmlFor='preloader-view-none'>
													<span className='d-flex gap-1 h-100'>
														<span className='flex-shrink-0'>
															<span className='bg-light d-flex h-100 flex-column gap-1 p-1'>
																<span className='d-block p-1 px-2 bg-primary-subtle rounded mb-2'></span>
																<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
																<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
																<span className='d-block p-1 px-2 pb-0 bg-primary-subtle'></span>
															</span>
														</span>
														<span className='flex-grow-1'>
															<span className='d-flex h-100 flex-column'>
																<span className='bg-light d-block p-1'></span>
																<span className='bg-light d-block p-1 mt-auto'></span>
															</span>
														</span>
													</span>
												</label>
											</div>
											<h5 className='fs-13 text-center mt-2'>Disable</h5>
										</div>
									</div>
								</div>
							</div>
						</SimpleBar>
					</Offcanvas.Body>
				</Offcanvas>
			</div>
		</React.Fragment>
	);
};

export default withRouter(RightSidebar);
