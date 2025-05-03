import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import TransactionForm from "Components/pages_componets/accounting/form";
import Membershiptable from "Components/pages_componets/membership/membershiptbale";
import TotalSaleWithOutVip from "Components/pages_componets/accounting/totalSalewithoutVip";
import Form from "Components/pages_componets/accounting/form";

const totalSalewithoutvip = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Accounting | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <TotalSaleWithOutVip />
      </div>
    </React.Fragment>
  );
};

totalSalewithoutvip.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default totalSalewithoutvip;
