import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import UpdateForm from "Components/pages_componets/Sub_Category/updateForm";

const index = ({subcategoryId}: any) => {
  
  return (
    <React.Fragment>
      <Head>
        <title>User Detail | Lavya -Admin </title>
      </Head>
      
      <div className="page-content">
        <UpdateForm subcategoryId = {subcategoryId} />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = (context: any) => {
  const { subcategoryId } = context.query;

  return { props: { subcategoryId } };
};

export default index;
