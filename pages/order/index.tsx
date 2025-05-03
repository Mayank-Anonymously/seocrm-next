import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Order from "Components/pages_componets/order/ordertable";

const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Orders | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <Order />
        {/* <LocationForm /> */}
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
