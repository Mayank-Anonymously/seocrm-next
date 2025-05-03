import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Membershipform from "Components/pages_componets/membership/form";
import Membershiptable from "Components/pages_componets/membership/membershiptbale";

const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Membership | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <Membershipform />
        <Membershiptable />
        {/* <LocationForm /> */}
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
