import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, InputBase, Badge, Paper, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, AccountCircle, ShoppingCart, HelpOutline, ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [cart, setCart] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productQuantities, setProductQuantities] = useState({});

  const exampleProducts = [
    { id: 1, name: 'Baclofen', price: 10.00, imageUrl: 'https://media.post.rvohealth.io/2U4nNZEf7jt4s7fWZRWXPcYsXyz/2023/08/22/2UM7Q8X8MCbyDneO1tpu6lmJxoq.jpg', description: 'Description of Baclofen', category: 'Category 1' },
    { id: 2, name: 'Bisacodyl', price: 15.00, imageUrl: 'https://www.findatopdoc.com/var/fatd/storage/images/_aliases/article_main/healthy-living/what-is-bisacodyl-used-for/6978077-2-eng-US/What-Is-Bisacodyl-Used-For.jpg', description: 'Description of Bisacodyl', category: 'Category 2' },
    { id: 3, name: 'Diclofenac Potassium', price: 20.00, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgDI9D5tgYZFVnVWThTi1LDeERcoCT6pd172UoZRcF5g&s', description: 'Description of Diclofenac Potassium', category: 'Category 3' },
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

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleQuantityChange = (productId, quantity) => {
    setProductQuantities({ ...productQuantities, [productId]: quantity });
  };

  const handleProceedWithOrder = () => {
    if (selectedProduct && productQuantities[selectedProduct.id] > 0) {
      const updatedCart = [...cart, { ...selectedProduct, quantity: productQuantities[selectedProduct.id] }];
      setCart(updatedCart);
      setOpenDialog(false);
      setProductQuantities({});
    }
  };

  const handleContinueShopping = () => {
    setOpenDialog(false);
    navigate('/products');
  };

  const handleCheckout = () => {
    navigate('/payments');
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
            aria-controls="primary-search-account-menu"
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
            aria-controls="mobile-more-menu"
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Select Options</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type: {selectedProduct && selectedProduct.name}
            <br />
            Amount in Ksh: {selectedProduct && selectedProduct.price}
            <br />
            <TextField
              label="Quantity"
              type="number"
              value={productQuantities[selectedProduct?.id] || 0}
              onChange={(e) => handleQuantityChange(selectedProduct.id, parseInt(e.target.value))}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{ marginRight: 1 }}
            />
            <br />
            Status: Available
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProceedWithOrder} sx={{ backgroundColor: '#c00100', '&:hover': { backgroundColor: '#c00100' } }}>Proceed with Order</Button>
          <Button onClick={handleContinueShopping} sx={{ backgroundColor: '#c00100', '&:hover': { backgroundColor: '#c00100' } }}>Continue to Shopping</Button>
        </DialogActions>
      </Dialog>
      <Paper elevation={3} sx={{ margin: 2, padding: 2, width: '90%', height: '45%', overflow: 'auto' }}>
        {cart.length > 0 ? (
          <>
            <Typography variant="h6" align="center">
              Cart Summary
            </Typography>
            {cart.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <CardMedia
                  component="img"
                  height="100"
                  image={item.imageUrl}
                  alt={item.name}
                  sx={{ marginRight: 2 }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {item.category}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Price: ${item.price}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Quantity: {item.quantity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleRemoveItem(item.id)} sx={{ backgroundColor: '#c00100', '&:hover': { backgroundColor: '#c00100' } }}>REMOVE</Button>
                </CardActions>
              </Box>
            ))}
            <Button onClick={handleCheckout} sx={{ marginTop: 2, backgroundColor: '#c00100', '&:hover': { backgroundColor: '#c00100' } }}>CHECKOUT ({totalAmount} Ksh)</Button>
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
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {product.category}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Price: ${product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleAddToCart(product)} sx={{ backgroundColor: '#c00100', '&:hover': { backgroundColor: '#c00100' } }}>Add to Cart</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
        <Typography variant="h6" sx={{ color: '#c00100' }}>New to EquityAfia?</Typography>
        <Typography variant="body1">Subscribe to our e-pharmacy to get updates on our latest offers!</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginTop: 1, width: '50%' }}>
          <TextField
            label="Enter Email Address"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" color="primary" sx={{ display: 'flex', textAlign: 'center', marginLeft: 1, paddingBottom: 2, paddingTop: 2, backgroundColor: '#c00100', '&:hover': { backgroundColor: '#c00100' } }}>
            Submit
          </Button>
        </Box>
        {/* Gender selection buttons */}
      </Box>
      
    </div>
  );
};

export default Cart;