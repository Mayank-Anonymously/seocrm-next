import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import CrmForm from "Components/pages_componets/crm/form";
import CrmTable from "Components/pages_componets/crm/crmtable";

const Index = (): ReactElement => {
  return (
    <React.Fragment>
      <Head>
        <title>Membership | Lavya - Admin</title>
      </Head>
      <div className="page-content">
        <CrmForm />
        <CrmTable />
      </div>
    </React.Fragment>
  );
};

Index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Index;
