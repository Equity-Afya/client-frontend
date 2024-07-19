import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography, Grid, Box, Card, CardMedia, CardContent, Button,
  createTheme, ThemeProvider, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c00100', // maroon color
    },
  },
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const LabResults = () => {
  const [labResults, setLabResults] = useState(null);
  const [error, setError] = useState(null);
  const [expandedResult, setExpandedResult] = useState(null); // State to track expanded result
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLabResults = async () => {
      try {
        const response = await axios.get('https://192.168.89.172:5500/api/viewlabresults');
        setLabResults(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLabResults();
  }, []);

  const handleDownload = (id) => {
    window.open(`https://192.168.89.172:5500/api/downloadlabresults/${id}`, '_blank');
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  const handleBackToHomepage = () => {
    navigate('/health-records');
  };

  const toggleExpand = (index) => {
    setExpandedResult(prevIndex => prevIndex === index ? null : index);
  };

  if (error) {
    return <Typography variant="h6" color="error">Error: {error}</Typography>;
  }

  if (!labResults) {
    return <CircularProgress color="primary" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#800000' }}>Lab Results</Typography>
        <Grid container spacing={2}>
          {labResults.map((result, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
                <Typography
                  variant="h6"
                  onClick={() => toggleExpand(index)}
                  style={{ cursor: 'pointer' }}
                >
                  Result {index + 1}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {formatDate(result.createdAt)}
                </Typography>
                {expandedResult === index && (
                  <Grid container spacing={2} style={{ marginTop: '10px' }}>
                    {result.diagnosisUrls && result.diagnosisUrls.map((url, i) => (
                      <Grid item xs={6} sm={3} key={i}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="140"
                            image={`http://192.168.88.227:5500${url}`}
                            alt={`Diagnosis ${i + 1}`}
                          />
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">Diagnosis {i + 1}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                    {result.xrayUrls && result.xrayUrls.map((url, i) => (
                      <Grid item xs={6} sm={3} key={i}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="140"
                            image={`http://192.168.88.227:5500${url}`}
                            alt={`X-Ray ${i + 1}`}
                          />
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">X-Ray {i + 1}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                    {result.ctscanUrls && result.ctscanUrls.map((url, i) => (
                      <Grid item xs={6} sm={3} key={i}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="140"
                            image={`http://192.168.88.227:5500${url}`}
                            alt={`CT Scan ${i + 1}`}
                          />
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">CT Scan {i + 1}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                    {result.ultrasoundUrls && result.ultrasoundUrls.map((url, i) => (
                      <Grid item xs={6} sm={3} key={i}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="140"
                            image={`http://192.168.88.227:5500${url}`}
                            alt={`Ultrasound ${i + 1}`}
                          />
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">Ultrasound {i + 1}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDownload(result.id)}
                  sx={{ marginTop: 2 }}
                >
                  Download as PDF
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrevious}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToHomepage}
          >
            Back to Homepage
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LabResults;
