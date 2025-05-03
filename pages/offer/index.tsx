import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import ContentForm from "Components/pages_componets/content/form";
import OfferForm from "Components/pages_componets/offer/form";
import OfferTable from "Components/pages_componets/offer/offertable";

const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Offer | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <OfferForm />
        <OfferTable />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
