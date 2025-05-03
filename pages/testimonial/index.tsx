import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import TestimonialTable from "Components/pages_componets/testimonial/testimonialtable";
import Form from "Components/pages_componets/testimonial/form";

const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Testimonial | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <Form />
        <TestimonialTable />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
