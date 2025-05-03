import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import OfferHeading from "Components/pages_componets/offer-heading/OfferHeading";
import OfferHeadingForm from "Components/pages_componets/offer-heading/OfferHeadingForm";
const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Offer Heading| Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <OfferHeadingForm/>
        <OfferHeading />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
