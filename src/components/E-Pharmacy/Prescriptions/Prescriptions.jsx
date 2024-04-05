import React, { useState } from 'react';
import { Container, Paper, Card, CardContent, Button, Grid, Modal, Typography} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useNavigate } from 'react-router-dom';

const Prescriptions = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [cardHeight, setCardHeight] = useState('auto');
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const handleFileInputChange = (event) => {
    setSelectedFiles([...selectedFiles, ...event.target.files]);
    setCardHeight('auto');
  };

  const handleCameraCapture = () => {
    console.log('Capture photo');
  };

  const handleUpload = () => {
    openModalHandler();
  };

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const proceedToPayment = () => {
    navigate('/payments');
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b4b4b4',
        height: '100vh',
        marginTop: '-20px',
        marginBottom: '-20px',
        marginLeft: '-20px',
      }}
    >
      <Paper
        elevation={3}
        style={{
          marginTop: '50px',
          padding: '20px',
          height: '500px',
          width: '700px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2>Upload Prescription</h2>
        <Card
          variant="outlined"
          style={{
            height: cardHeight,
            width: '70%',
            paddingBottom: '0px',
            marginBottom: '20px',
            borderStyle: 'dotted',
          }}
        >
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            {selectedFiles.length > 0 && (
              <div>
                <h3>Selected Files:</h3>
                <ul>
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                    multiple
                  />
                  <Button variant="contained" component="label" fullWidth>
                    Choose Files
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      style={{ display: 'none' }}
                      onChange={handleFileInputChange}
                      multiple
                    />
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" onClick={handleCameraCapture} fullWidth>
                    <CameraAltIcon style={{ marginRight: '5px' }} />
                    Take Photo
                  </Button>
                </Grid>
              </Grid>
            </div>
            <Button
              variant="contained"
              style={{ backgroundColor: '#c00100', marginTop: '10px', marginLeft: '170px', marginRight: '170px' }}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </CardContent>
        </Card>
      </Paper>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '40px',
            height: '70vh',
            width: '270px',
            textAlign: 'center',
            fontSize: '24px'
          }}
        >
          <img src="src/assets/checkmark.jpg" alt="checkmark" style={{ position: 'relative', height: '100px', borderRadius: '0px' }} />
          <h3>Upload successful!</h3>
          <Button style={{ backgroundColor: '#c00100', color: '#ffffff' }} onClick={proceedToPayment}>Proceed to payment</Button>
        </div>
      </Modal>
    </Container>
  );
};

export default Prescriptions;
