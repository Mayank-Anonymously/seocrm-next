import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import ManualRecharge from "Components/pages_componets/user/manual-recharge/manual-recharge";

const index = ({userId}: any) => {
  
  return (
    <React.Fragment>
      <Head>
        <title>Manual Recharges | Lavya -Admin </title>
      </Head>
      
      <div className="page-content">
        <ManualRecharge userId = {userId} />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = (context: any) => {
  const { userId } = context.query;

  return { props: { userId } };
};

export default index;
