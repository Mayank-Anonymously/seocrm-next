import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import ContactFormPage from "Components/pages_componets/contact-form/contactForm"
const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Contact Form | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <ContactFormPage />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default index;
