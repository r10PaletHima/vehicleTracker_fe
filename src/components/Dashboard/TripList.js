import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Typography,
  Box,
  Collapse,
} from "@mui/material";
import MapView from "../Map/MapView";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function TripList({ trips, onTripSelect, selectedTrips }) {
  const [expandedTrip, setExpandedTrip] = useState(null);

  const handleExpand = (tripId) => {
    setExpandedTrip(expandedTrip === tripId ? null : tripId);
  };

  return (
    <List>
      {trips.map((trip) => (
        <React.Fragment key={trip._id}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => onTripSelect(trip._id)}>
              <Checkbox
                edge="start"
                checked={selectedTrips.some((t) => t._id === trip._id)}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText
                primary={
                  <Typography variant="subtitle1">
                    Trip on {formatDate(trip.startTime)}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Typography variant="body2">
                      Start: {formatTime(trip.startTime)}
                    </Typography>
                    <Typography variant="body2">
                      End: {formatTime(trip.endTime)}
                    </Typography>
                    <Typography variant="body2">
                      Distance: {trip.summary.distance.toFixed(2)} km
                    </Typography>
                    <Typography variant="body2">
                      GPS Data Points: {trip.gpsData.length}
                    </Typography>
                  </Box>
                }
              />
            </ListItemButton>
            <ListItemButton onClick={() => handleExpand(trip._id)}>
              <Typography variant="body2">
                {expandedTrip === trip._id ? "Hide Map" : "Show Map"}
              </Typography>
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedTrip === trip._id} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <MapView selectedTrips={[trip]} activeTrip={trip} />
            </Box>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
}

export default TripList;
