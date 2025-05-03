import { useEffect, useMemo, useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import moment from "moment";
import AttachMoneyTwoToneIcon from "@mui/icons-material/AttachMoneyTwoTone";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Swal from "sweetalert2";
//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_RowSelectionState,
} from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { mkConfig, generateCsv, download } from "export-to-csv";

//Material UI Imports
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

//Icons Imports
import { IconButton, Tooltip } from "@mui/material";

//Icons Imports
import { deleteVMS } from "Components/slices/vms/thunk";
import { useSelector, useDispatch } from "react-redux";
import { api_is_jobsel_success } from "Components/slices/jobs/_client/reducers";
import { api_is_selected_job_success } from "Components/slices/calculator/reducers";
import { GetTravelRates } from "Components/slices/calculator/thunk";
import { LAYOUT_MODE_TYPES } from "../constants/layout";
import { unassignedJobs } from "Components/slices/jobs/_assigned/thunk";
import { useRouter } from "next/router";
import { fetchPipeline } from "Components/slices/pipeline/thunk";

export const Pipeline = (props: any) => {
  const [open, setOpen] = useState(false);
  const {
    columns,
    data,
    setShow,
    dispatch,
    modalChildren,
    billCalculator,
    unassigned,
    assignJob,
    jobDetailModal,
    exportData,
    show,
  } = props;
  const [selected, setSelected] = useState<any>(data);
  const [rowSelection, setRowSelection] = useState<any>({});
  const [username, setusername] = useState<any>({});
  const [roles, setroles] = useState<any>({});
  const router = useRouter();
  const { query }: any = useRouter();
  const rowData = query.rowData ? JSON.parse(query.rowData) : null;
  const { renderedCellValue } = props;

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      const role = JSON.parse(localStorage.getItem("currentrole") || "");
      setusername(obj);
      setroles(role[0]);
    }
  }, []);

  const { layoutModeType } = useSelector((state: any) => ({
    layoutModeType: state.Layout.layoutModeType,
  }));

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportData = (row: any) => {
    var rows: any = [];
    data.map((item: any) => {
      const { id, ...rest }: any = item.jobPipeline;
      return rows.push({ ...rest, matchesFound: item.jobsFeeds.length });
    });
    const csv = generateCsv(csvConfig)(rows);
    download(csvConfig)(csv);
  };
  console.log("router.asPath:", router.asPath);

  const table = useMaterialReactTable<any>({
    columns,
    data,
    enableColumnFilterModes: true,
    enableFullScreenToggle: false,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableClickToCopy: true,

    enableStickyHeader: true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      density: "compact",
      pagination: { pageIndex: 0, pageSize: 30 },
    },
    paginationDisplayMode: "pages",
    renderTopToolbarCustomActions: ({ table, row }: any) => (
      <>
        {(exportData === true && roles.role === "SUPERADMIN") ||
        roles.role === "GENERALMANAGER" ? (
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              padding: "8px",
              flexWrap: "wrap",
            }}
          >
            <Tooltip title="Export Table Data">
              <Button
                onClick={() => handleExportData(row)}
                startIcon={<FileDownloadIcon />}
              ></Button>
            </Tooltip>
          </Box>
        ) : null}
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            padding: "8px",
            flexWrap: "wrap",
          }}
        ></Box>
      </>
    ),

    positionToolbarAlertBanner: "top",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [30, 50, 100, 150],
      shape: "rounded",
      variant: "outlined",
    },

    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        const pipeId = row.original.jobPipeline.id;
        const createdBy = row.original.jobPipeline.createdBy;
        console.log(row);

        setRowSelection((prev: any) => ({
          ...prev,
          [row.id]: !prev[row.id],
        }));

        console.log("row:", row);
        if (row.groupingValue) {
          window.open(`/pipeline/${createdBy}`, "_blank");
          setRowSelection([]);
        } else if (window.open(`/pipeline/${pipeId}/${createdBy}`, "_blank")) {
          setRowSelection([]);
        }
        // router.push({
        //   pathname: "/pipel   ine/jobsResults/",
        //   query: { id: jobId },
        // });
      },
      selected: rowSelection[row.id],
      sx: {
        cursor: "pointer",
      },
    }),

    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });
  return (
    <>
      {layoutModeType === LAYOUT_MODE_TYPES.DARKMODE ? (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline /> <MaterialReactTable table={table} />
        </ThemeProvider>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </>
  );
};
