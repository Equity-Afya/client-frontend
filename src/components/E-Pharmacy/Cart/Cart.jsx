import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, InputBase, Badge, Paper, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, AccountCircle, ShoppingCart, HelpOutline, ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';

const Cart = () => {
 const navigate = useNavigate();
 const [anchorEl, setAnchorEl] = useState(null);
 const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
 const [cart, setCart] = useState([]);
 const [openDialog, setOpenDialog] = useState(false);
 const [selectedProduct, setSelectedProduct] = useState(null);

 // Example products
 const exampleProducts = [
    { id: 1, name: 'Medicine A', price: 10.00, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Medicine B', price: 15.00, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Medicine C', price: 20.00, imageUrl: 'https://via.placeholder.com/150' },
 ];

 const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
 const isMenuOpen = Boolean(anchorEl);

 const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
 };

 const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
 };

 const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
 };

 const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
 };

 const menuId = 'primary-search-account-menu';
 const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Orders</MenuItem>
      <MenuItem onClick={handleMenuClose}>Saved Items</MenuItem>
    </Menu>
 );

 const renderHelpMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>Help Center</MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>Place an order</MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>Track your order</MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>Cancel order</MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>Returns and Refund</MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>Payment</MenuItem>
    </Menu>
 );

 const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
 };

 return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#d9d9d9' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="help"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <HelpOutline />
          </IconButton>
          <Button variant="contained" color="primary" sx={{ marginLeft: 2, backgroundColor: '#c00100', '&:hover': { backgroundColor: '#c00100' } }}>
            Live Chart
          </Button>
          <IconButton
            size="large"
            edge="end"
            aria-label="cart"
            color="inherit"
            onClick={() => navigate('/cart')}
          >
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderHelpMenu}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Select Options</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select options for the product before proceeding.
          </DialogContentText>
          {/* Add your options selection UI here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Continue Shopping</Button>
          <Button onClick={() => {
            setCart((prevCart) => [...prevCart, selectedProduct]);
            setOpenDialog(false);
          }}>Proceed with Order</Button>
        </DialogActions>
      </Dialog>
      <Paper elevation={3} sx={{ margin: 2, padding: 2, width: '90%', height: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {cart.length > 0 ? (
          <>
            <Typography variant="h6" align="center">
              Cart Summary
            </Typography>
            <Typography variant="body1" align="center">
              Items in your cart:
            </Typography>
            {cart.map((item) => (
              <Typography key={item.id} variant="body2" align="center">
                {item.name} - ${item.price}
              </Typography>
            ))}
          </>
        ) : (
          <>
            <Typography variant="h6" align="center">
              <ShoppingCart /> Cart
            </Typography>
            <Typography variant="body1" align="center">
              Your cart is empty
            </Typography>
            <Typography variant="body2" align="center">
              Browse our products and add items to your cart
            </Typography>
          </>
        )}
        <Button variant="contained" color="primary" sx={{ marginTop: 2, backgroundColor: '#c00100', '&:hover': { backgroundColor: '#c00100' } }}>
          Start Shopping
        </Button>
      </Paper>
      <Paper elevation={3} sx={{ margin: 2, padding: 2, width: '90%', height: '55%' }}>
        <Typography variant="h6" align="left">
          Products
          <IconButton edge="end" aria-label="see all" sx={{ color: '#c00100' }}>
            <ArrowForwardIos />
          </IconButton>
        </Typography>
        <Grid container spacing={2}>
          {exampleProducts.map((product) => (
            <Grid item xs={4} key={product.id}>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
        <Typography variant="h6" sx={{ color: '#c00100' }}>New to EquityAfia?</Typography>
        <Typography variant="body1">Subscribe to our e-pharmacy to get updates on our latest offers!</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, width: '50%' }}>
          <TextField
            label="Enter Email Address"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" color="primary" sx={{ marginLeft: 1, backgroundColor: '#c00100', '&:hover': { backgroundColor: '#c00100' } }}>
            Submit
          </Button>
        </Box>
        {/* Gender selection buttons */}
      </Box>
    </div>
 );
};

export default Cart;

