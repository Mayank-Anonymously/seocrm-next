import Layout from "@common/Layout";
import IncrementalDataComponent from "pages/PipelinesforGrid";
import React, { ReactElement } from "react";

const alljobs = () => {
  return (
    <div>
      <IncrementalDataComponent />
    </div>
  );
};

alljobs.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default alljobs;
