import React, { useState } from 'react';
import { Paper, Card, Typography, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Done, ChevronLeft, ChevronRight } from '@mui/icons-material';
import "./Prescription.css";

const Prescriptions = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % uploadedFiles.length);
  };

  const handlePreviousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + uploadedFiles.length) % uploadedFiles.length);
  };

  const proceedToReview = () => {
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    try {
      // Create a new FormData object
      const formData = new FormData();
  
      // Append each file to the FormData object
      uploadedFiles.forEach((file) => {
        formData.append('prescription-image', file)
      });
  
      // Make a POST request to your backend endpoint
      const response = await fetch('http://192.168.89.43:5500/api/prescription/uploadprescriptionimage/37449211', {
        method: 'POST',
        body: formData,
      });
  
      // Check if the request was successful
      if (response.ok) {
        // Handle success
        setOpenDialog(false);
        navigate('/e-pharmacy');
      } else {
        // Handle error
        console.error('Failed to submit files to the backend');
      }
    } catch (error) {
      console.error('Error submitting files:', error);
    }
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
      <Card style={{ flex: 1, width: '100%', backgroundColor: 'grey', height: '300px' }}>
        <CardContent>
          <img
            src="https://media.licdn.com/dms/image/D4E12AQFquFze83bWIw/article-cover_image-shrink_720_1280/0/1709291021977?e=2147483647&v=beta&t=sdPQ8q_XLFXW5CeFDRRbhy3BQ9WCNlRZAVyVzino_fs"
            alt="Your photo"
            style={{ width: '100%', objectFit: 'cover', height: 'auto' }}
            className="responsive-image"
          />
        </CardContent>
      </Card>
      <Card style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h3" style={{ fontSize: '16px', color: 'maroon', fontWeight: 'bolder', marginBottom: '20px', marginTop: '1px' }}>
            Do you have your medical prescriptions? Please upload the images.
          </Typography>
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
            <Button variant="contained" style={{ marginTop: '20px', backgroundColor: 'maroon' }} onClick={proceedToReview}>
              View
            </Button>
          )}
          <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
            <DialogTitle style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h3" style={{ color: 'maroon' }}>Review Your Uploads</Typography>
              <IconButton onClick={handleDialogClose}>
                <Done style={{ color: 'maroon' }} />
              </IconButton>
            </DialogTitle>
            <DialogContent style={{ textAlign: 'center', margin: '0 auto' }}>
              {uploadedFiles.length > 0 && (
                <>
                  <Typography variant="body1">File {currentIndex + 1}: {uploadedFiles[currentIndex].name}</Typography>
                  <div style={{ maxHeight: '50vh', overflowY: 'auto', margin: '20px auto' }}>
                    <img
                      src={URL.createObjectURL(uploadedFiles[currentIndex])}
                      alt={`Preview ${currentIndex + 1}`}
                      style={{ maxWidth: '100%', maxHeight: '50vh', objectFit: 'contain', marginBottom: '10px' }}
                    />
                  </div>
                </>
              )}
            </DialogContent>
            <DialogActions style={{ justifyContent: 'space-between', margin: '0 auto' }}>
              <IconButton onClick={handlePreviousImage} disabled={uploadedFiles.length <= 1}>
                <ChevronLeft style={{ color: 'maroon' }} />
              </IconButton>
              <IconButton onClick={handleNextImage} disabled={uploadedFiles.length <= 1}>
                <ChevronRight style={{ color: 'maroon' }} />
              </IconButton>
              {currentIndex === uploadedFiles.length - 1 && (
                <Button onClick={handleSubmit} style={{ backgroundColor: 'maroon', color: 'white' }}>Submit</Button>
              )}
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default Prescriptions;
