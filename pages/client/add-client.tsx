import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@common/Layout';

const AddClient = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Add Client | Midas - HRMS</title>
			</Head>
		</React.Fragment>
	);
};

AddClient.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};

export default AddClient;
