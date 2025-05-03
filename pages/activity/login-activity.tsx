import React, { ReactElement, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import { Material } from "@common/Material_Table";
import { MRT_ColumnDef } from "material-react-table";
import { Box, Button, Stack } from "@mui/material";
import moment from "moment";
import { Jobs } from "Components/interface/jobs";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "Components/slices/stats/thunk";
import Loader from "@common/Loader";
import { DatePicker } from "@mui/x-date-pickers";
import { fetchActivity } from "Components/slices/activity/thunk";
import { Container } from "react-bootstrap";
import Loader2 from "@common/Loader2";
import DataTable from "react-data-table-component";
import Custom_Filter from "@common/utils/filter/filter_utils";
import { LAYOUT_MODE_TYPES } from "../../Components/Common/constants/layout";
import Breadcrumb from "@common/Breadcrumb";

const LoginActivity = () => {
  const dispatch: any = useDispatch();
  const [filteredData, setFilteredData] = useState<any>([]);
  const { layoutModeType } = useSelector((state: any) => ({
    layoutModeType: state.Layout.layoutModeType,
  }));
  const { activitydata, isLoading } = useSelector(
    (state: any) => state.activityFeed
  );
  const { userdata } = useSelector((state: any) => state.user);
  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });
  const handleChangeDates = (name: any, value: any) => {
    setDates({ ...dates, [name]: moment(value).format("YYYY-MM-DD") });
  };

  const columns: any = [
    {
      name: "Login TIme",
      id: "loginTime",
      selector: (row: any) =>
        moment(row.loginTime).format("MMMM Do YYYY, h:mm:ss a"),
      sortable: true,
    },
    {
      name: "Name",
      id: "user.fullName",
      selector: (row: any) => row.user?.fullName,
      sortable: true,
    },
    {
      name: "Role",
      id: "user.roles.role",
      selector: (row: any) => row.user?.roles[0]?.role,
      sortable: true,
    },
    {
      name: "Email",
      id: "email",
      selector: (row: any) => row.user?.email,
      sortable: true,
    },
  ];

  //   useEffect(() => {
  //     dispatch(fetchActivity(dates.startDate, dates.endDate));
  //   }, []);

  console.log(activitydata);

  return (
    <React.Fragment>
      <Head>
        <title>Login Activity | Midas</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="Login Activity" breadcrumb="Dashboard" />

        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-around"}
          >
            <DatePicker
              label="From Date"
              onChange={(newValue: any) =>
                handleChangeDates("startDate", newValue.$d)
              }
            />
            <DatePicker
              label="To Date"
              onChange={(newValue: any) =>
                handleChangeDates("endDate", newValue.$d)
              }
            />
            <Button
              variant="outlined"
              onClick={() =>
                dispatch(fetchActivity(dates.startDate, dates.endDate))
              }
              disabled={isLoading}
            >
              Search
            </Button>
          </Stack>
        </Box>
        <Container fluid={true}>
          <DataTable
            columns={columns}
            data={filteredData.length === 0 ? activitydata : filteredData}
            pagination
            defaultSortFieldId={1}
            subHeader
            subHeaderComponent={
              <Custom_Filter
                data={activitydata}
                setFilteredData={setFilteredData}
              />
            }
            persistTableHead
            theme={
              layoutModeType === LAYOUT_MODE_TYPES.DARKMODE ? "dark" : "default"
            }
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

LoginActivity.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default LoginActivity;
