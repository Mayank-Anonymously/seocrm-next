import React, { ReactElement, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import { MRT_ColumnDef } from "material-react-table";
import { Box } from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@common/Loader";
import {
  fetchPipeline,
  // fetchPipelineForSuperAdmin,
  // rolesBASEDrequest,
} from "Components/slices/pipeline/thunk";
import Breadcrumb from "@common/Breadcrumb";
import { JobPipeline } from "Components/interface/JobPipeline";
import { Pipeline } from "@common/Pipeline_Table";
import axios from "axios";
import {
  GET_ALL_MATCHING_JOBS,
  GET_ALL_PIPELINE,
  GET_EVERY_PIPELINE,
  job_api_host,
} from "Components/helpers/url_helper";
import {
  api_is_pipelinedata_loading,
  api_is_pipelinedata_success,
} from "Components/slices/pipeline/reducer";
import { AppDispatch, RootState, store } from "Components/slices";
import { fetchAllUser } from "Components/slices/user/thunk";
const ViewPipeline = (props: any) => {
  const { data } = props;
  const dispatch: any = useDispatch();
  const { isLoading, pipelinedata, serverLoading } = useSelector(
    (state: any) => state.pipelineFeed
  );

  const { userdata } = useSelector((state: any) => state.user);
  const [show, setShow] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<any>({});
  const [feedsData, setFeedsData] = useState<any>([]);

  const columns = useMemo<MRT_ColumnDef<JobPipeline>[]>(
    () => [
      {
        id: "Job-details", //id used to define `group` column
        header: "",
        columns: [
          {
            accessorKey: "jobPipeline.created", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Created-By",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row: any) => `${row.jobsFeeds.length}`,
            accessorKey: "jobsFeeds", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "Match Found",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "jobPipeline.firstName", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "First Name",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "jobPipeline.lastName", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Last Name",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },

          {
            accessorKey: "jobPipeline.phone", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Phone",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "jobPipeline.degree", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Profession",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "jobPipeline.speciality", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Speciality",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },

          {
            accessorKey: "jobPipeline.totalExp", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "text",
            header: "Experience",
            size: 100,
            filterFn: "contains",
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "jobPipeline.availability",
            enableClickToCopy: true,
            header: "Availability",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* Using moment to format the date */}
                <span>{moment(renderedCellValue).format("YYYY-MM-DD")}</span>
              </Box>
            ),
          },
          {
            accessorKey: "jobPipeline.preferredCity", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "multi-select",
            header: "Preferred City",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "jobPipeline.preferredState", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "PreferredState",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "jobPipeline.preferredShift", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Preferred Shift",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "jobPipeline.preferredHours", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "text",
            header: "Preferred Hours",
            size: 100,
            filterFn: "contains",
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "jobPipeline.desiredPay", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "text",
            header: "Desired Pay",
            size: 100,
            filterFn: "contains",
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "jobPipeline.dateCreated", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "Date Create",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{moment(renderedCellValue).format("YYYY-MM-DD")}</span>
              </Box>
            ),
            enableSorting: true,
          },

          {
            accessorKey: "jobPipeline.notes", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "Remarks",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
        ],
      },
    ],
    []
  );

  var pipelines: any = [];

  for (let index = 0; index < userdata.length; index++) {
    const element = userdata[index];

    data
      .filter((item: any) => item.jobPipeline.createdBy === element.id)
      .map((item: any) => {
        return pipelines.push({
          jobPipeline: {
            ...item.jobPipeline,
            created: element.firstName,
            availability: moment(element.availability).format("YYYY-MM-DD"),
            dateCreated: moment(element.dateCreated).format("YYYY-MM-DD"),
          },
          jobsFeeds: item.jobsFeeds,
        });
      });
  }

  useEffect(() => {
    if (localStorage.getItem("currentrole")) {
      var currentRole: any = JSON.parse(
        localStorage.getItem("currentrole") || ""
      );
      dispatch(fetchAllUser());
      setCurrentRole(currentRole[0]);
      dispatch(api_is_pipelinedata_success(data));
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>View Pipeline | Midas</title>
      </Head>
      <div className="page-content">
        <Breadcrumb breadcrumbItem="View Pipeline" breadcrumb="Dashboard" />
        <Pipeline
          columns={columns}
          data={pipelines}
          jobDetailModal={false}
          exportData={true}
          dispatch={dispatch}
          setShow={setShow}
          show={show}
        />
      </div>
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ req }: any) => {
  const cookies = req.headers.cookie || "";
  // Parse cookies into an object for easier access
  const cookiesObject = cookies
    .split(";")
    .map((cookie: any) => cookie.trim())
    .reduce((acc: any, cookie: any) => {
      const [name, value] = cookie.split("=");
      acc[name] = decodeURIComponent(value);
      return acc;
    }, {});

  // Now you can access individual cookies
  // const authUser = JSON.parse(cookiesObject.authUser || "null").id;
  const token = JSON.parse(cookiesObject.token || "null");
  const currentRole: any = JSON.parse(cookiesObject.currentrole || "null");
  const id = JSON.parse(cookiesObject.id || "null");
  try {
    let response: any;
    if (currentRole[0].role === "SUPERADMIN") {
      response = await axios.get(`${job_api_host}${GET_ALL_MATCHING_JOBS}`);
      var data = await Object.keys(response).map((ite: any) => response[ite]);
      return { props: { data: data } };
    } else {
      response = await axios.get(`${job_api_host}${GET_ALL_PIPELINE}/${id}`);
      return { props: { data: response } };
    }
  } catch (error) {
    console.error("Error fetching incremental data:", error);
    return { props: { data: [] } }; // Return empty array or handle error accordingly
  }
};

ViewPipeline.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ViewPipeline;
