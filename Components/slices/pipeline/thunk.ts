import {
  DOWNLOAD_CSV,
  GET_ADMIN_PIPELINE,
  GET_ALL_PIPELINE,
  GET_ALL_PIPELINE_BY_USER,
  GET_DEGREE,
  SAVE_PIPELINE,
  UPLOAD_CSV,
  job_api_host,
} from "Components/helpers/url_helper";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_is_degree_success,
  api_is_pipelinedata_error,
  api_is_pipelinedata_loading,
  api_is_pipelinedata_success,
  api_is_pipelinejobs_success,
} from "./reducer";
import Factory from "Components/APIFactory/Factory";
import Swal from "sweetalert2";

export const fetchPipeline = (id: any) => async (dispatch: any) => {
  try {
    dispatch(api_is_pipelinedata_loading(true));

    const fetch_api: any = axios.get(
      `${job_api_host}${GET_ALL_PIPELINE}/${id}`
    );
    const data = await fetch_api;

    let pipelineArr: any[] = [];
    data.map((ite: any) => {
      pipelineArr.push({
        jobPipeline: ite.jobPipeline,
        jobsFeeds: ite.jobsFeeds,
      });
    });

    dispatch(api_is_pipelinedata_success(pipelineArr));
    toast.success("API Key Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    dispatch(api_is_pipelinedata_error(error));
    toast.error("API Key Added Failed", { autoClose: 3000 });
    console.log("error");
    return error;
  }
};

export const fetchSampleCSV = () => async (dispatch: any) => {
  try {
    const url = `${job_api_host}${DOWNLOAD_CSV}`;
    dispatch(api_is_pipelinedata_loading(true));

    const response = await fetch(url);
    const blob = await response.blob();
    // Create a download link
    const downloadLink = document.createElement("a");
    const url2 = window.URL.createObjectURL(blob);
    downloadLink.href = url2;
    downloadLink.setAttribute("download", "PiplineWithData.xlsx");
    document.body.appendChild(downloadLink);
    // Trigger the click event on the link
    downloadLink.click();

    // Clean up
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(url);

    dispatch(api_is_pipelinedata_success(response));
  } catch (error) {
    dispatch(api_is_pipelinedata_error(error));
  }
};

export const AddNewPipeline =
  (values: any, router: any) => async (dispatch: any) => {
    dispatch(api_is_pipelinedata_loading(true));

    try {
      dispatch(api_is_pipelinedata_loading(true));
      var setter: any = [];
      const url = `${job_api_host}${SAVE_PIPELINE}`;
      const body = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
        availability: values.availability,
        preferredCity: values.city,
        preferredState: values.state,
        totalExp: JSON.parse(values.experience),
        preferredShift: values.shift,
        preferredHours: JSON.parse(values.hours),
        desiredPay: JSON.parse(values.pay),
        isActive: true,
        createdBy: values.userID,
        notes: values.remarks,
        degree: values.degree,
        speciality: values.speciality,
      };
      console.log(body);

      dispatch(api_is_pipelinedata_loading(true));
      const fetch: any = await Factory("POST", setter, url, body);
      console.log("datafetch", fetch);
      dispatch(api_is_pipelinedata_loading(true));
      if (fetch.id) {
        dispatch(api_is_pipelinedata_loading(false));
        Swal.fire("Success", "Pipeline added successfully", "success").then(
          () => {
            router.push("/pipeline/view-pipeline");
          }
        );
      } else {
        Swal.fire({
          title: "Error",
          text: fetch.errors,
          timer: 8000,
        });
      }
    } catch (error) {
      dispatch(api_is_pipelinedata_error(error));
      Swal.fire("Error", "Failed due to invalid or duplicate details");
    }
  };

export const fetchPipelineByIdOfManager =
  (idsArray: any) => async (dispatch: any) => {
    dispatch(api_is_pipelinedata_loading(true));
    try {
      if (localStorage.getItem("authUser")) {
        var obj = JSON.parse(localStorage.getItem("authUser") || "");
        var role = JSON.parse(localStorage.getItem("currentrole") || "");
        dispatch(api_is_pipelinedata_loading(true));
        var currrole = role[0];
        var requestOptions: any = {};
        dispatch(api_is_pipelinedata_loading(true));
        if (
          currrole.role === "ACCOUNTMANAGER" ||
          currrole.role === "GENERALMANAGER"
        ) {
          requestOptions = {
            method: "POST",
            data: { userIds: idsArray },
            url: `${job_api_host}${GET_ALL_PIPELINE_BY_USER}`,
          };

          dispatch(api_is_pipelinedata_loading(true));
          const fetch_api: any = axios.request(requestOptions);
          const data = await fetch_api;
          var pipe = Object.keys(data).map((ite: any) => data[ite]);

          if (data.length !== 0) {
            dispatch(api_is_pipelinedata_loading(false));
            dispatch(api_is_pipelinedata_success(pipe));
          }

          return data;
        } else {
          requestOptions = {
            method: "POST",
            data: { userIds: idsArray },
            url: `${job_api_host}${GET_ALL_PIPELINE_BY_USER}`,
          };
          dispatch(api_is_pipelinedata_loading(true));
          const fetch_api: any = axios.request(requestOptions);
          const data = await fetch_api;
          var pipe = Object.keys(data).map((ite: any) => data[ite]);

          if (data.length !== 0) {
            dispatch(api_is_pipelinedata_loading(false));
            dispatch(api_is_pipelinedata_success(pipe));
          }

          return data;
        }
      }
    } catch (error) {
      dispatch(api_is_pipelinedata_error(error));
      console.log(error);
      return error;
    }
  };

export const UploadNewPipeline =
  (filesToUpload: any, router: any, userID: any) => async (dispatch: any) => {
    dispatch(api_is_pipelinedata_loading(true));
    try {
      var form = new FormData();
      var setter: any = [];
      const url = `${job_api_host}${UPLOAD_CSV}?userId=${userID}`;
      dispatch(api_is_pipelinedata_loading(true));
      form.append("file", filesToUpload[0]);
      dispatch(api_is_pipelinedata_loading(true));
      const options = {
        method: "POST",
        url: url,
        headers: {
          "Content-type": "multipart/form-data",
        },
        data: form,
      };
      dispatch(api_is_pipelinedata_loading(true));
      const fetch_axios = await axios.request(options);
      const response: any = await fetch_axios;
      if (response.pipelineFileUploadWrapper.succeedPipeline.length !== 0) {
        dispatch(api_is_pipelinedata_loading(false));
        Swal.fire({
          title: "Success",
          text: "CSV Uploaded successfully",
          icon: "success",
        }).then((result: any) => {
          if (result.isConfirmed || result.isDismissed) {
            window.location.reload();
          }
        });
      } else if (response.pipelineFileUploadWrapper.failedReason) {
        Swal.fire({
          title: "Submission Error",
          text: response.pipelineFileUploadWrapper.failedReason,
        });
      } 
      return response;
    } catch (error) {
      dispatch(api_is_pipelinedata_error(error));
      Swal.fire("Error", "Invalid or duplicate details");
    }
  };

export const fetchPipelineById =
  (id: any, pipeId: any) => async (dispatch: any) => {
    try {
      dispatch(api_is_pipelinedata_loading(true));
      const fetch_api: any = axios.get(
        `${job_api_host}${GET_ALL_PIPELINE}/${id}`
      );
      console.log(fetch_api);
      const data = await fetch_api;
      let pipeJobs: any[] = [];
      // data.map((ite: any) => {
      //   if (ite.jobPipeline.id === pipeId) {
      //     pipeJobs.push({
      //       jobPipeline: ite.jobPipeline,
      //       jobsFeeds: ite.jobsFeeds,
      //     });
      //   }
      // });

      let jobsFeeds: any[] = [];
      data.forEach((ite: any) => {
        if (ite.jobPipeline.id === pipeId) {
          jobsFeeds = ite.jobsFeeds;
        }
      });
      dispatch(api_is_pipelinejobs_success(jobsFeeds));
      return data;
    } catch (error) {
      dispatch(api_is_pipelinedata_error(error));
      console.log("error");
      return error;
    }
  };

export const fetchDegree = () => async (dispatch: any) => {
  try {
    var setter: any = [];
    const url = `${job_api_host}${GET_DEGREE}`;
    dispatch(api_is_pipelinedata_loading(true));
    const fetch = await Factory("GET", setter, url, {});
    dispatch(api_is_degree_success(fetch));
  } catch (error) {
    dispatch(api_is_pipelinedata_error(error));
  }
};

// export const fetchPipelineForSuperAdmin = () => async (dispatch: any) => {
//   try {
//     dispatch(api_is_pipelinedata_loading(true));
//     var requestOptions = {
//       method: "GET",
//       data: {
//         userIds: [],
//       },
//       url: `${job_api_host}${GET_ADMIN_PIPELINE}`,
//     };
//     const fetch_api: any = axios.post(`${job_api_host}${GET_ADMIN_PIPELINE}`, {
//       data: {
//         userIds: [],
//       },
//     });
//     const data = await fetch_api;
//     let pipelineArr: any[] = [];
//     data.map((ite: any) => {
//       pipelineArr.push({
//         jobPipeline: ite.jobPipeline,
//         jobsFeeds: ite.jobsFeeds,
//       });
//     });

//     dispatch(api_is_pipelinedata_success(pipelineArr));
//     return data;
//   } catch (error) {
//     dispatch(api_is_pipelinedata_error(error));
//     toast.error("API Key Added Failed", { autoClose: 3000 });
//     console.log("error");
//     return error;
//   }
// };

// export const rolesBASEDrequest = (role: any, id: any) => (dispatch: any) => {
//   if (role === "SUPERADMIN") {
//     dispatch(fetchPipelineForSuperAdmin());
//   } else {
//     dispatch(fetchPipeline(id));
//   }
// };
