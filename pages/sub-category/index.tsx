import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import SubCategoryTable from "Components/pages_componets/Sub_Category/subCategoryTable";
import SubCatForm from "../../Components/pages_componets/Sub_Category/form";
const Index_Sub_Category = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Index_Category | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <SubCatForm />
        <SubCategoryTable />
      </div>
    </React.Fragment>
  );
};

Index_Sub_Category.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default Index_Sub_Category;
