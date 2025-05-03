import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Purchase from "Components/pages_componets/vendor/purchaes/purchaes";

const index = ({vendorId}: any) => {
  
  return (
    <React.Fragment>
      <Head>
        <title>User Detail | Lavya -Admin </title>
      </Head>
      
      <div className="page-content">
        <Purchase vendorId = {vendorId} />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = (context: any) => {
  const { vendorId } = context.query;

  return { props: { vendorId } };
};

export default index;
