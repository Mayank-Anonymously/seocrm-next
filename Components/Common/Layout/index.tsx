import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useRouter } from 'next/router';

import { useProfile } from '@common/UserHooks';
import Router from 'next/router';
//redux
import { useSelector, useDispatch } from 'react-redux';
import Footer from './Footer';
import RightSidebar from '@common/RightSidebar';
import LoadingSpinner from 'Components/LoaderSpinner';

const Layout = ({ children }: any) => {
	const { userProfile } = useProfile();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [requestedPath, setRequestedPath] = useState<any>('');

	const redirectLoginFunction = () => {
		if (typeof window !== 'undefined') {
			// Check if we're on the client-side
			if (!userProfile) {
				router.push('/auth/login');
			}
		}
	};

	useEffect(() => {
		redirectLoginFunction();
		const handleRouteChangeStart = (url: string) => {
			setLoading(true);
			setRequestedPath(url);
		};

		const handleRouteChangeComplete = () => {
			setLoading(false);
		};

		const handleRouteChangeError = () => {
			setLoading(false);
		};

		Router.events.on('routeChangeStart', handleRouteChangeStart);
		Router.events.on('routeChangeComplete', handleRouteChangeComplete);
		Router.events.on('routeChangeError', handleRouteChangeError);

		// Cleanup event listeners
		return () => {
			Router.events.off('routeChangeStart', handleRouteChangeStart);
			Router.events.off('routeChangeComplete', handleRouteChangeComplete);
			Router.events.off('routeChangeError', handleRouteChangeError);
		};
	}, []);

	const dispatch: any = useDispatch();
	const {
		leftSidebarType,
		layoutModeType,
		layoutWidthType,
		layoutPositionType,
		topbarThemeType,
		leftsidbarSizeType,
		leftSidebarViewType,
		leftSidebarImageType,
	} = useSelector((state: any) => ({
		leftSidebarType: state.Layout.leftSidebarType,
		layoutModeType: state.Layout.layoutModeType,
		layoutWidthType: state.Layout.layoutWidthType,
		layoutPositionType: state.Layout.layoutPositionType,
		topbarThemeType: state.Layout.topbarThemeType,
		leftsidbarSizeType: state.Layout.leftsidbarSizeType,
		leftSidebarViewType: state.Layout.leftSidebarViewType,
		leftSidebarImageType: state.Layout.leftSidebarImageType,
	}));

	/*
    layout settings
    */
	useEffect(() => {
		if (
			leftSidebarType ||
			layoutModeType ||
			layoutWidthType ||
			layoutPositionType ||
			topbarThemeType ||
			leftsidbarSizeType ||
			leftSidebarViewType ||
			leftSidebarImageType
		) {
		}
	}, [
		leftSidebarType,
		layoutModeType,
		layoutWidthType,
		layoutPositionType,
		topbarThemeType,
		leftsidbarSizeType,
		leftSidebarViewType,
		leftSidebarImageType,
		dispatch,
	]);
	return (
		<React.Fragment>
			<>
				<div>
					<TopBar />
					<Header />
					<Sidebar layoutType={'horizontal'} />
					<div className='main-content'>
						{loading ? (
							<LoadingSpinner requestedPath={requestedPath} />
						) : (
							children
						)}
					</div>
					<Footer />
					<RightSidebar />
				</div>
			</>
		</React.Fragment>
	);
};

export default Layout;
