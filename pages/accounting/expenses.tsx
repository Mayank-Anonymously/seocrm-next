import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import ExpensesTable from "Components/pages_componets/accounting/expensesTable";
import AddExpenses from "Components/pages_componets/accounting/addExpenses";

const expenses = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Accounting | Lavya -Admin </title>
      </Head>
      <div className="page-content">
        <AddExpenses />
        <ExpensesTable />
      </div>
    </React.Fragment>
  );
};

expenses.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default expenses;
