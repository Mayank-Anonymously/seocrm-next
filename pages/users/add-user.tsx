import React, { ReactElement } from 'react';
import Layout from '@common/Layout';

const AddUser = (props: any) => {
	return <React.Fragment></React.Fragment>;
};

AddUser.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};
export default AddUser;
