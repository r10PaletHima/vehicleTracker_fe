import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

function MapView({ selectedTrips, activeTrip }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([0, 0], 2);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapRef.current
      );
    }

    // Clear existing layers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Polyline || layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });

    // Draw paths for selected trips
    selectedTrips.forEach((trip) => {
      if (trip.summary && trip.summary.startPoint && trip.summary.endPoint) {
        const coordinates = [
          [trip.summary.startPoint.lat, trip.summary.startPoint.lng],
          [trip.summary.endPoint.lat, trip.summary.endPoint.lng],
        ];

        L.polyline(coordinates, {
          color: trip._id === activeTrip?._id ? "red" : "blue",
        }).addTo(mapRef.current);

        // Add markers for start and end points
        L.marker([trip.summary.startPoint.lat, trip.summary.startPoint.lng])
          .addTo(mapRef.current)
          .bindPopup("Start");
        L.marker([trip.summary.endPoint.lat, trip.summary.endPoint.lng])
          .addTo(mapRef.current)
          .bindPopup("End");
      }
    });

    // Fit bounds to show all selected trips
    if (selectedTrips.length > 0 && selectedTrips[0].summary) {
      const bounds = L.latLngBounds(
        selectedTrips.flatMap((trip) => [
          [trip.summary.startPoint.lat, trip.summary.startPoint.lng],
          [trip.summary.endPoint.lat, trip.summary.endPoint.lng],
        ])
      );
      mapRef.current.fitBounds(bounds);
    }
  }, [selectedTrips, activeTrip]);

  return <Box id="map" sx={{ height: 400 }}></Box>;
}

export default MapView;
