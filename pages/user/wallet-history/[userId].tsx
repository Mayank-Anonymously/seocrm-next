import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import WalletHistory from "Components/pages_componets/user/wallet-history/wallet-history";

const index = ({userId}: any) => {
  
  return (
    <React.Fragment>
      <Head>
        <title>User Detail | Lavya -Admin </title>
      </Head>
      
      <div className="page-content">
        <WalletHistory userId = {userId} />
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
