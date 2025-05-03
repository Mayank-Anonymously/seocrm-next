import Layout from '@common/Layout';
import React, { ReactElement } from 'react';

const alljobs = () => {
	return <div></div>;
};

alljobs.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};

export default alljobs;
