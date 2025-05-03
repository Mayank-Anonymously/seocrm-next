import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { from, Observable, of, Subscription } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

interface DataItem {
  id: number;
  // Add other properties as per your data structure
}

const IncrementalDataComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    let subscription: Subscription;

    const fetchData = async () => {
      try {
        const response: AxiosResponse<any[]> = await axios.get<any[]>(
          "https://api.midastech.org/api/allvms/getAllFeeds"
        );

        if (response) {
          console.log("Response data:", response);

          const observable: Observable<any> = of(response.data); // Convert response data to Observable
          let prevData: any[] = []; // Initialize prevData
          subscription = observable
            .pipe(
              map((newDataItem) => {
                prevData = [...prevData, newDataItem]; // Update prevData
                return prevData; // Return updated data
              })
            )
            .subscribe((data) => {
              setData(data); // Update the state with the latest data
            });
        } else {
          console.error("Invalid response data:", response);
        }
      } catch (error) {
        console.error("Error fetching incremental data:", error);
      }
    };

    fetchData();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <div>
      {data.map((item) => {
        console.log("item", item);

        return <div>{/* Render individual data items here */}</div>;
      })}
    </div>
  );
};

export default IncrementalDataComponent;
