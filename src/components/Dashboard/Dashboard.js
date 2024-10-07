import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import TripList from "./TripList";
import TripUpload from "./TripUpload";
import api from "../../services/api";

function Dashboard() {
  const [tripsData, setTripsData] = useState({
    trips: [],
    page: 1,
    pages: 1,
    total: 0,
  });
  const [selectedTrips, setSelectedTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await api.get("/trips");
      setTripsData(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const handleTripSelect = (tripId) => {
    setSelectedTrips((prevSelected) => {
      if (prevSelected.some((trip) => trip._id === tripId)) {
        return prevSelected.filter((trip) => trip._id !== tripId);
      } else {
        const tripToAdd = tripsData.trips.find((trip) => trip._id === tripId);
        return [...prevSelected, tripToAdd];
      }
    });
  };

  const handleTripUpload = (newTrip) => {
    setTripsData((prevData) => ({
      ...prevData,
      trips: [...prevData.trips, newTrip],
      total: prevData.total + 1,
    }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Trips Dashboard</Typography>
        <Typography variant="subtitle1">
          Total Trips: {tripsData.total} | Page {tripsData.page} of{" "}
          {tripsData.pages}
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper>
          <TripList
            trips={tripsData.trips}
            onTripSelect={handleTripSelect}
            selectedTrips={selectedTrips}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper>
          <TripUpload onUpload={handleTripUpload} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
