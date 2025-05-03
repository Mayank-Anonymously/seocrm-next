import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Review from "Components/pages_componets/review/Review";
const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Review | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <Review />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
