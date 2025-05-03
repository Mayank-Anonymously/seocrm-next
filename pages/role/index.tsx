import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import RoleForm from "Components/pages_componets/role/form";
import RoleTable from "Components/pages_componets/role/roletable";

const Index = (): ReactElement => {
  return (
    <React.Fragment>
      <Head>
        <title>Membership | Lavya - Admin</title>
      </Head>
      <div className="page-content">
        <RoleForm />
        <RoleTable />
      </div>
    </React.Fragment>
  );
};

Index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Index;
