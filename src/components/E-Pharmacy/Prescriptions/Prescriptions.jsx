import React, { useState } from 'react';
import { Paper, Card, Typography, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogContentText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Done, Handshake } from '@mui/icons-material';

const Prescriptions = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const newUploadedFiles = [...uploadedFiles];
    for (let i = 0; i < files.length; i++) {
      newUploadedFiles.push(files[i]);
    }
    setUploadedFiles(newUploadedFiles);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    navigate('/e-pharmacy');
  };

  const proceedToPayment = () => {
    setOpenDialog(true);
  };

  return (
    <Paper
      elevation={3}
      style={{
        height: '100vh',
        width: '1000px',
        backgroundColor: 'f0f0f0',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card style={{ flex: 1, width: '100%', backgroundColor: 'grey', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CardContent>
          <img
            src="https://media.licdn.com/dms/image/D4E12AQFquFze83bWIw/article-cover_image-shrink_720_1280/0/1709291021977?e=2147483647&v=beta&t=sdPQ8q_XLFXW5CeFDRRbhy3BQ9WCNlRZAVyVzino_fs"
            alt="Your photo"
            style={{ width: '100%', objectFit: 'cover', height: '100%' }}
          />
        </CardContent>
      </Card>
      <Card style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h3" style={{ fontSize: '16px', color: 'maroon', fontWeight: 'bolder', marginBottom: '20px', marginTop: '1px' }}>Do you have your medical prescriptions? Please upload the images.</Typography>
          {/* Upload button */}
          <input type="file" style={{ display: 'none' }} id="file-input" onChange={handleFileInputChange} multiple />
          <label htmlFor="file-input">
            <Button variant="contained" component="span" style={{ marginTop: '10px', backgroundColor: 'maroon' }}>
              Upload Photo
            </Button>
          </label>
          {uploadedFiles.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              {uploadedFiles.map((file, index) => (
                <Typography key={index} variant="body1">Uploaded File {index + 1}: {file.name}</Typography>
              ))}
            </div>
          )}
          {uploadedFiles.length > 0 && (
            <Button variant="contained" style={{ marginTop: '20px', backgroundColor: 'maroon' }} onClick={proceedToPayment}>
              Submit
            </Button>
          )}
        <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Done style={{ fontSize: '40px', marginBottom: '10px', borderRadius: '50px', borderStyle: 'solid', color: 'maroon' }} />
              <Typography variant="h3" style={{ color: 'maroon' }}>Submission Successful</Typography>
            </DialogTitle>
          <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Divider style={{ backgroundColor: 'maroon', marginBottom: '20px', width: '100%' }} />
              </div>
            <DialogContentText style={{ marginBottom: '20px' }}>
               Your prescription has been successfully submitted. Kindly wait as we check its validity and availability.
            </DialogContentText>
            <Handshake style={{ fontSize: '40px', marginTop: '20px', borderRadius: '50px', borderStyle: 'solid', color: 'maroon' }} />
            <DialogContentText style={{ marginTop: '20px' }}>
                Thank you for choosing our services.
            </DialogContentText>
            <Button variant="contained" onClick={handleDialogClose} style={{ marginTop: '20px', backgroundColor: 'maroon', color: 'white' }}>Back</Button>
          </DialogContent>
        </Dialog>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default Prescriptions;
