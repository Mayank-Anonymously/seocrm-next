import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import SubscibeMail from "Components/pages_componets/subscibe-mail/SubscibeMail";
const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Subscibe Mail | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <SubscibeMail />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
