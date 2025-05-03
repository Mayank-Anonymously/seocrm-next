import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import TotalOfferBalance from "Components/pages_componets/accounting/totalOfferBalance";

const TotalOfferBalanceByCompany = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Accounting | Lavya - Admin</title>
      </Head>
      <div className="page-content">
        <TotalOfferBalance />
      </div>
    </React.Fragment>
  );
};

TotalOfferBalanceByCompany.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default TotalOfferBalanceByCompany;
