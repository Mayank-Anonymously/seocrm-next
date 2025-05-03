import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Tax from "Components/pages_componets/accounting/totalTax";

const expenses = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Accounting | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <Tax />
      </div>
    </React.Fragment>
  );
};

expenses.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default expenses;
