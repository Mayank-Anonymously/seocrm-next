import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import LocationForm from "Components/pages_componets/location/form";
import Locationtable from "Components/pages_componets/location/locationtable";

const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>location | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <LocationForm />
        <Locationtable />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
