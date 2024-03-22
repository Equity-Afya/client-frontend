import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function AvatarWithProfileDetails() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState("avatar.jpg");

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarSrc(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <input type="file" onChange={handleAvatarChange} style={{ display: "none" }} accept="image/*" id="avatarInput" />
      <label htmlFor="avatarInput">
        <Avatar
          alt="Profile Avatar"
          src={avatarSrc}
          sx={{ width: 50, height: 50, cursor: 'pointer' }}
          onClick={handleClick}
        />
      </label>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        getContentAnchorEl={null}
      >
        <Box sx={{ textAlign: 'center', padding: 2 }}>
          <Avatar
            alt="Profile Avatar"
            src={avatarSrc}
            sx={{ width: 100, height: 100, margin: '0 auto' }}
          />
          <p>John Doe</p>
        </Box>
        <MenuItem component={Link} to="/profile" onClick={handleClose}>View Profile</MenuItem>
        <MenuItem component={Link} to="/settings" onClick={handleClose}>Settings & Privacy</MenuItem>
        <MenuItem component={Link} to="/help" onClick={handleClose}>Help</MenuItem>
        <MenuItem component={Link} to="/language" onClick={handleClose}>Language</MenuItem>
        <MenuItem component={Link} to="/sign-out" onClick={handleClose}>Sign Out</MenuItem>
      </Menu>
    </div>
  );
}

export default AvatarWithProfileDetails;
