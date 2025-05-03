import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import ProductTable from "Components/pages_componets/product/producttable";
import RechargeForm from "Components/pages_componets/first_time_recharge/form";
import Rechargetable from "Components/pages_componets/first_time_recharge/rechargetable";

const Index_Product = () => {
  return (
    <React.Fragment>
      <Head>
        <title>First Time Rechage | Lavya-Admin </title>
      </Head>
      <div className="page-content">
        <RechargeForm />
        <Rechargetable />
      </div>
    </React.Fragment>
  );
};

Index_Product.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default Index_Product;
