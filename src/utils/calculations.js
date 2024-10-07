import { getDistance } from "geolib";

export const calculateTripStats = (coordinates) => {
  let totalDistance = 0;
  let totalDuration = 0;
  let idlingDuration = 0;
  let stoppageDuration = 0;
  let maxSpeed = 0;
  let speeds = [];

  for (let i = 1; i < coordinates.length; i++) {
    const prev = coordinates[i - 1];
    const curr = coordinates[i];

    const distance = getDistance(
      { latitude: prev.latitude, longitude: prev.longitude },
      { latitude: curr.latitude, longitude: curr.longitude }
    );

    const timeDiff =
      (new Date(curr.timestamp) - new Date(prev.timestamp)) / 1000 / 60; // in minutes
    const speed = ((distance / timeDiff) * 60) / 1000; // km/h

    totalDistance += distance;
    totalDuration += timeDiff;

    if (speed === 0) {
      if (curr.ignition) {
        idlingDuration += timeDiff;
      } else {
        stoppageDuration += timeDiff;
      }
    }

    maxSpeed = Math.max(maxSpeed, speed);
    speeds.push(speed);
  }

  const avgSpeed =
    speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length;

  return {
    totalDistance: (totalDistance / 1000).toFixed(2), // km
    totalDuration: totalDuration.toFixed(2),
    idlingDuration: idlingDuration.toFixed(2),
    stoppageDuration: stoppageDuration.toFixed(2),
    maxSpeed: maxSpeed.toFixed(2),
    avgSpeed: avgSpeed.toFixed(2),
  };
};
