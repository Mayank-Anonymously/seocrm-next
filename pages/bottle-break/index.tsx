import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import BottleBreak from "Components/pages_componets/bottle-break/bottle-break";

const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Bottle Break | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <BottleBreak />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
