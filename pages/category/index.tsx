import React, { ReactElement } from "react";
import Head from "next/head";
import ReactForm from "../../Components/pages_componets/category/form";
import Categorytable from "./../../Components/pages_componets/category/categorytable";
import Layout from "@common/Layout";

const Index_Category = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Index_Category | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <ReactForm />
        <Categorytable />
      </div>
    </React.Fragment>
  );
};

Index_Category.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default Index_Category;
