import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import HubForm from "Components/pages_componets/hub/form";
import HubsTable from "Components/pages_componets/hub/hubtable";

const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Hub | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <HubForm />
        <HubsTable />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
