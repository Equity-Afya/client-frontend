import React, { useState } from 'react';
import { TextField, Button, Container, CssBaseline, Box, Paper, Card, CardContent, FormControlLabel, Checkbox, Slider, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [passwordLength, setPasswordLength] = useState(8); // Default length is 8 characters
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    setPasswordMatchError(false);
    // Add password reset logic here
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Card>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            className='wrapper'
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              mb={2}
            >
              <Paper elevation={3} style={{ padding: '10px', borderRadius: '50%', width: 'fit-content', borderStyle: 'solid', borderColor: '#C00100'}}>
                <LockIcon alt='Reset Password' />
              </Paper>
              <Typography variant="h4" align="center" gutterBottom>
                Password Reset
              </Typography>
            </Box>
            <form style={{ width: '100%' }}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                id="password"
                label="Password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                mb={2}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                error={passwordMatchError}
                helperText={passwordMatchError ? "Passwords don't match" : ""}
                mb={2}
              />
              <Typography id="password-length-slider" gutterBottom>
                Password Length: {passwordLength}
              </Typography>
              <Slider
                defaultValue={8}
                value={passwordLength}
                onChange={(e, newValue) => setPasswordLength(newValue)}
                aria-labelledby="password-length-slider"
                min={6}
                max={20}
                step={1}
                mb={2}
              />
              <FormControlLabel
                control={<Checkbox checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />}
                label="Include numbers"
                mb={2}
              />
              <FormControlLabel
                control={<Checkbox checked={includeSpecialChars} onChange={(e) => setIncludeSpecialChars(e.target.checked)} />}
                label="Include special characters"
                mb={2}
              />
              <Button
                type='submit'
                fullWidth
                variant="contained"
                color="primary"
                className='submit'
                onClick={handleReset}
                style={{
                  backgroundColor: "#C00100",
                  color: "#fff",
                }}
              >
                Reset
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PasswordReset;
