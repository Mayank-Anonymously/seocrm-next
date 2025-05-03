import React, { ReactElement } from 'react';
import Head from 'next/head';
import ProductForm from '../../Components/pages_componets/product/form';
import Layout from '@common/Layout';
import ProductTable from 'Components/pages_componets/product/producttable';

const Index_Product = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Product | -Admin </title>
			</Head>
			<div className='page-content'>
				<ProductForm />
				<ProductTable />
			</div>
		</React.Fragment>
	);
};

Index_Product.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};
export default Index_Product;
