import { GET_ALL_JOBS, job_api_host } from "Components/helpers/url_helper";
import axios, { AxiosResponse } from "axios";
import { from, Observable, of, Subscription } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import {
  api_is_jobdata_error,
  api_is_jobdata_loading,
  api_is_jobdata_success,
} from "./reducers";

export const fetchAllJobs = () => async (dispatch: any) => {
  let subscription: Subscription;
  dispatch(api_is_jobdata_loading(true));

  try {
    dispatch(api_is_jobdata_loading(true));

    const response: any = await axios.get<any[]>(
      "https://api.midastech.org/api/allvms/getAllFeeds"
    );

    if (response) {
      var resp = response.map((ite: any) =>
        Object.keys(ite).map((item: any) => ite[item])
      );
      dispatch(api_is_jobdata_success(resp[0]));
      dispatch(api_is_jobdata_loading(false));
      const observable: Observable<any> = of(response.data); // Convert response data to Observable
      let prevData: any[] = []; // Initialize prevData
      observable
        .pipe(
          map((newDataItem) => {
            prevData = [...prevData, newDataItem]; // Update prevData
            return prevData; // Return updated data
          })
        )
        .subscribe((data: any) => {
          console.log("data", data);
        });
    } else {
      console.error("Invalid response data:", response);
    }
  } catch (error) {
    console.error("Error fetching incremental data:", error);
  }

  return () => {
    if (subscription) {
      subscription.unsubscribe();
    }
  };
};
