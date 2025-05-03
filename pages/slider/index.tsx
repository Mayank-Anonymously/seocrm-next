import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Form from "Components/pages_componets/slider/form";
import SilderTable from "Components/pages_componets/slider/sliderTable";

const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Slider | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <Form />
        <SilderTable />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
