import React from "react";
import { Typography, Grid } from "@mui/material";

function TripSummary({ trip }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Trip Summary</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Total Distance: {trip.totalDistance} km</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Total Duration: {trip.totalDuration} minutes</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Idling Duration: {trip.idlingDuration} minutes</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          Stoppage Duration: {trip.stoppageDuration} minutes
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Max Speed: {trip.maxSpeed} km/h</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Average Speed: {trip.avgSpeed} km/h</Typography>
      </Grid>
    </Grid>
  );
}

export default TripSummary;
