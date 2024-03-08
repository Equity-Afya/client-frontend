import React from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import { Search, Notifications } from '@mui/icons-material';

function SearchBar() {
  return (
    <Box sx={{ position: 'fixed', top: 0, right: 0, display: 'flex', alignItems: 'center', gap:55 }}>
      {/* Search bar */}
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        style={{ width: '500px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton size="small">
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Notification bell */}
      <IconButton size="small" sx={{ marginLeft: '16px',color: '#C00100' }}>
        <Notifications />
      </IconButton>
    </Box>
  );
}

export default SearchBar;
