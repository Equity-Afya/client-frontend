import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Avatar, IconButton, Typography, Card, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import { useAvatar } from './AvatarContext';

const ViewProfile = () => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const { avatarSrc, setAvatarSrc, name, setName } = useAvatar();
    const [openDialog, setOpenDialog] = useState(false);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchProfileDetails();
    }, []);

    const fetchProfileDetails = async () => {
        try {
            const response = await axios.get('https://b776-102-210-244-74.ngrok-free.app/user/viewProfile'); // Adjust the endpoint based on your backend API
            const { email, phoneNumber, idNumber, password, backgroundImage, avatarSrc, name } = response.data;
            setEmail(email);
            setPhoneNumber(phoneNumber);
            setIdNumber(idNumber);
            setPassword(password);
            setBackgroundImage(backgroundImage);
            setAvatarSrc(avatarSrc);
            setName(name);
        } catch (error) {
            console.error('Error fetching profile details:', error);
        }
    };

    const handleBackgroundChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setAvatarSrc(reader.result);
            setBackgroundImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setAvatarSrc(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleEditProfileClick = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveChanges = () => {
        // Save changes here
        setOpenDialog(false);
    };

    return (
        <Container maxWidth='sm' sx={{ backgroundColor: '#b4b4b4', padding: '50px', borderRadius: '10px', marginTop: '-45px' }}>
            <Box display="flex" flexDirection="column" height="100vh">
                <Box
                    flex="1"
                    bgcolor="#b00000"
                    position="relative"
                    sx={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleBackgroundChange}
                        id="background-input"
                    />
                    <label htmlFor="background-input">
                        <IconButton
                            sx={{ position: 'absolute', top: 10, right: 10, color: '#ffffff' }}
                            aria-label="edit-background-photo"
                            component="span"
                        >
                            <CameraAltIcon />
                        </IconButton>
                    </label>
                    <Box
                        position="absolute"
                        bottom={-50}
                        left={10}
                        width={100}
                        height={100}
                        borderRadius="40%"
                        overflow="hidden"
                        zIndex={1}
                    >
                        <label htmlFor="avatar-input">
                            <Avatar
                                alt="Profile Picture"
                                src={avatarSrc}
                                sx={{ width: '90%', height: '90%', cursor: 'pointer' }}
                            />
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            capture="camera"
                            style={{ display: 'none' }}
                            onChange={handleAvatarChange}
                            id="avatar-input"
                        />
                    </Box>

                    <Typography variant="subtitle1" color="textSecondary" sx={{ position: 'absolute', bottom: -70, left: 10, color: '#000000', fontWeight: 'bold' }}>
                        {name}
                    </Typography>
                </Box>
                <Box flex="2" flexShrink="10" bgcolor="#f0f0f0" display="flex" justifyContent="flex-end" alignItems="flex-start" sx={{ marginBottom: '10px' }}>
                    <IconButton aria-label="edit-profile" onClick={handleEditProfileClick}>
                        <EditIcon />
                    </IconButton>
                </Box>
                <Card
                    flex="3"
                    position="relative"
                    padding="20px"
                    borderRadius="40px"
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, backgroundColor: 'f0f0f0' }}
                >
                    {/* Profile information */}
                    <Typography variant="body1" mb={2} sx={{ fontWeight: 'bold' }}>
                        Email: {email}
                    </Typography>
                    <Typography variant="body1" mb={2} sx={{ fontWeight: 'bold' }}>
                        Phone Number: {phoneNumber}
                    </Typography>
                    <Typography variant="body1" mb={2} sx={{ fontWeight: 'bold' }}>
                        ID Number: {idNumber}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Password: {password}
                    </Typography>
                </Card>
                {/* Edit profile dialog */}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <br/>
                    <DialogContent>
                        {/* Full name input */}
                        <TextField
                            label=" Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            sx={{mb: 2}}
                        />
                        {/* Email input */}
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{mb: 2}}
                        />
                        {/* Phone number input */}
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />
                        {/* ID number input */}
                        <TextField
                            label="ID Number"
                            variant="outlined"
                            fullWidth
                            value={idNumber}
                            onChange={(e) => setIdNumber(e.target.value)}
                            required
                            sx={{mb: 2}}
                        />
                        {/* Password input */}
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{mb: 2}}
                        />
                     </DialogContent>
                     <DialogActions>
                     <Button onClick={handleCloseDialog}>Cancel</Button>
                     <Button onClick={handleSaveChanges}>Save</Button>
                     </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default ViewProfile;
