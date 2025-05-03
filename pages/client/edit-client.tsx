import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@common/Layout';

const EditClient = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Edit Client | Midas - HRMS</title>
			</Head>
		</React.Fragment>
	);
};

EditClient.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};

export default EditClient;
