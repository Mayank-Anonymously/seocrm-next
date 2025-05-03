import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import ContentForm from "Components/pages_componets/content/form";

const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Content | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <ContentForm />
        {/* <HubsTable /> */}
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
