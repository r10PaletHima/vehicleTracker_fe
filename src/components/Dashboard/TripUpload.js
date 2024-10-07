import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { useAuth } from "../../hooks/useAuth"; // Import useAuth hook

function TripUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("authToken");
    console.log("token", token);

    try {
      const response = await fetch(
        "http://localhost:3001/api/trips/upload-csv",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from the user object
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      onUpload(data); // Assuming you want to do something with the response
      setFile(null); // Reset the file input
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        type="file"
        onChange={handleFileChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          accept: ".csv", // Limit file selection to CSV files
        }}
      />
      <Button type="submit" variant="contained" disabled={!file}>
        Upload CSV
      </Button>
    </Box>
  );
}

export default TripUpload;
