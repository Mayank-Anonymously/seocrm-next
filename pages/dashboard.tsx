import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import MapComponent from "Components/pages_componets/location/maps";
const Dashboard = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Dashboard | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <MapComponent />
      </div>
    </React.Fragment>
  );
};

Dashboard.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
