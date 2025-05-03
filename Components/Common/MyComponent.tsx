// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import axios from "axios";
import { from, interval } from "rxjs";
import { mergeMap } from "rxjs/operators";

// Function to fetch data using RxJS
const fetchDataWithRxJS = () => {
  return from(
    axios.get("https://api.midastech.org/api/allvms/getAllFeeds")
  ).pipe(mergeMap((response) => from(response.data)));
};

// Main component
const PipelinesGrid = () => {
  // State to hold the fetched data
  const [pipelines, setPipelines] = useState<any>([]);

  // Effect to fetch data and update state
  useEffect(() => {
    const subscription = fetchDataWithRxJS().subscribe((data) => {
      setPipelines((prevPipelines: any) => [...prevPipelines, data]);
    });

    return () => {
      // Clean up subscription on component unmount
      subscription.unsubscribe();
    };
  }, []);

  console.log("PipelinesGrid:", pipelines);

  // Render the UI

  return (
    <Grid container>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <Card>
          <CardContent>
            <Typography variant="h6"></Typography>
            {/* <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                {pipelines.map((pipeline, index) => (
                  <tr>
                    <td>{pipeline.firstName}</td>
                    <td>{pipeline.lastName}</td>
                    <td>{pipeline.phone}</td>
                    <td>{pipeline.email}</td>
                    <td>{pipeline.totalExp}</td>
                    <td>{pipeline.firstName}</td>
                    <td>{pipeline.firstName}</td>
                  </tr>
                ))}
              </table>
            </div> */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PipelinesGrid;
