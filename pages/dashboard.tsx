import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import Layout from '@common/Layout';

const Dashboard = () => {
	return <React.Fragment></React.Fragment>;
};

Dashboard.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};

export default Dashboard;
