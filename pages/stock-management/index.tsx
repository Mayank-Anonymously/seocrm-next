import Layout from "@common/Layout";
import StockTable from "Components/pages_componets/stock-managment/stocktable";
import Head from "next/head";
import React from "react";

const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Product | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <StockTable />
      </div>
    </React.Fragment>
  );
};
index.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default index;
