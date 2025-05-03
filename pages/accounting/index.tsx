import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import TransactionForm from "Components/pages_componets/accounting/form";
import Membershiptable from "Components/pages_componets/membership/membershiptbale";
import AccountingTable from "Components/pages_componets/accounting/accountingtable";
import Form from "Components/pages_componets/accounting/form";

const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Accounting | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <Form />
        <AccountingTable />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
