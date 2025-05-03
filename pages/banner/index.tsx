import React, { ReactElement } from 'react';
import Head from 'next/head';
import Layout from '@common/Layout';
import BannerTable from 'Components/pages_componets/banner/bannerTable';
import Form from 'Components/pages_componets/banner/form';

const index = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Banner | -Admin </title>
			</Head>
			<div className='page-content'>
				<Form />
				<BannerTable />
			</div>
		</React.Fragment>
	);
};

index.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};
export default index;
