import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import TransactionForm from "Components/pages_componets/accounting/form";
import Membershiptable from "Components/pages_componets/membership/membershiptbale";
import TotalSaleWithVip from "Components/pages_componets/accounting/totalSalewithVip";
import Form from "Components/pages_componets/accounting/form";

const totalSalewithvip = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Accounting | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <TotalSaleWithVip />
      </div>
    </React.Fragment>
  );
};

totalSalewithvip.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default totalSalewithvip;
