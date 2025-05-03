import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import OrderAssign from "Components/pages_componets/partner/order-assign/orderassign";

const index = ({partnerId}: any) => {
  
  return (
    <React.Fragment>
      <Head>
        <title>User Detail | Lavya -Admin </title>
      </Head>
      
      <div className="page-content">
        <OrderAssign partnerId = {partnerId} />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = (context: any) => {
  const { partnerId } = context.query;

  return { props: { partnerId } };
};

export default index;
