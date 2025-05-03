import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Vacations from "Components/pages_componets/user/vacations/vacations";

const index = ({userId}: any) => {
  
  return (
    <React.Fragment>
      <Head>
        <title>Vacations | Lavya -Admin </title>
      </Head>
      
      <div className="page-content">
        <Vacations userId = {userId} />
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
