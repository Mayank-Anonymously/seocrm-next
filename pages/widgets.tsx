import React, { ReactElement } from 'react';
import Head from 'next/head';

import { Col, Container, Row } from 'react-bootstrap';
import Breadcrumb from '@common/Breadcrumb';
import IncomeDetails from '@component/Widgets/IncomeDetails';
import IncomeBreakdown from '@component/Widgets/IncomeBreakdown';
import SessionsbyCountries from '@component/Widgets/SessionsbyCountries';
import AudiencesMetrics from '@component/Widgets/AudiencesMetrics';
import MyPortfolio from '@component/Widgets/MyPortfolio';
import TopReferralsPages from '@component/Widgets/TopReferralsPages';
import TileBoxs from '@component/Widgets/TileBoxs';
import OtherWidgets from '@component/Widgets/OtherWidgets';
import LatestSales from '@component/Widgets/LatestSales';
import UpcomingActivities from '@component/Widgets/UpcomingActivities';
import Connections from '@component/Widgets/Connections';
import ActivityStream from '@component/Widgets/ActivityStream';
import Layout from '@common/Layout';
import TopRetailSalesLocation from '@component/Widgets/TopRetailSalesLocation';
import LiveUsersByCountry from '@component/Widgets/LiveUsersByCountry';
const Widgets = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Widgets | -Admin </title>
			</Head>
			<div className='page-content'></div>
		</React.Fragment>
	);
};

Widgets.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};

export default Widgets;
