import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";

const BloodPressureChart = () => {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://192.168.89.172:5500/api/displaypressuremap');
        console.log('API response:', response.data);
        setUrl(response.data.url);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f0f0f0">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f0f0f0">
        <Typography variant="h6" color="error">
          Error fetching data: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={2} bgcolor="#f0f0f0">
      <Typography variant="h4" gutterBottom>
        Blood Pressure Variation
      </Typography>
      {url ? (
        <Box 
          sx={{ 
            backgroundColor: '#fff', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: 3,
            marginBottom: '20px'
          }}
        >
          <iframe
            src={url}
            width="100%"
            height="600px"
            frameBorder="0"
            allowFullScreen
          />
        </Box>
      ) : (
        <Typography variant="h6" color="error">
          No URL found in the response.
        </Typography>
      )}
    </Box>
  );
};

export default BloodPressureChart;
