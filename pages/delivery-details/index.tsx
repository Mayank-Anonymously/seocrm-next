import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import DeliveryTable from "../../Components/pages_componets/_delivery/deliverytable";
const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>location | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <DeliveryTable />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
