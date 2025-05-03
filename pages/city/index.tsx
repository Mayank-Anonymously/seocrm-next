import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import CityForm from "Components/pages_componets/city/form";
import CityTable from "Components/pages_componets/city/citytable";

const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>City | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <CityForm />
        <CityTable />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
