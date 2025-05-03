import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import PurchaseTable from "Components/pages_componets/accounting/purchseTable";
import AddPurchase from "Components/pages_componets/accounting/addPurchase";

const purchase = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Accounting | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <AddPurchase />
        <PurchaseTable />
      </div>
    </React.Fragment>
  );
};

purchase.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default purchase;
