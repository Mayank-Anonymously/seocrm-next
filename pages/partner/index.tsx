import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import PartnerForm from "Components/pages_componets/partner/form";
import Partnertable from "Components/pages_componets/partner/partnertable";

const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Partner | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <PartnerForm />
        <Partnertable />
      </div>
    </React.Fragment>
  );
};


index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
