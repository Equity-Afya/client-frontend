import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, InputBase, Badge, Paper, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle, ShoppingCart, HelpOutline, ArrowForwardIos } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';

const Cart = () => {
  const { cart, addToCart, removeFromCart, updateCart } = useCart();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productQuantities, setProductQuantities] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.88.141:5500/api/product/viewallproducts'); // Replace with your actual endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.slice(0, 5)); // Fetching only the first four products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
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
      const updatedProduct = { ...selectedProduct, quantity: productQuantities[selectedProduct.id] };
      updateCart(updatedProduct);
      setOpenDialog(false);
      setProductQuantities({});
    }
  };

  const handleContinueShopping = () => {
    setOpenDialog(false);
  };

  const handleCheckout = async () => {
    try {
      const orderData = {
        products: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          productUrl: item.imageUrl,
          productPrice: item.price
        }))
      };

      const response = await fetch('http://192.168.88.141:5500/api/order/createorder/321456', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to checkout');
      }

      const data = await response.json();
      console.log('Checkout successful:', data);
      navigate('/delivery-info');
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
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
            color="inherit"
          >
            <HelpOutline />
          </IconButton>
          <Button variant="contained" color="primary" sx={{ marginLeft: 2, backgroundColor: '#800000', '&:hover': { backgroundColor: '#c00100' } }}>
            Live Chart
          </Button>
          <IconButton
            size="large"
            edge="end"
            aria-label="cart"
            color="inherit"
            onClick={() => navigate('/cart')}
          >
            <Badge badgeContent={cart.length} color="#800000">
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
      <Paper elevation={3} sx={{ margin: 2, padding: 2, width: '90%', height: '50vh', overflow: 'auto' }}>
        {cart.length > 0 ? (
          <>
            <Typography variant="h6" align="center">
              Cart Summary
            </Typography>
            {cart.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <CardMedia
                  component="img"
                  height="80"
                  sx={{ width: '80px', marginRight: 2 }}
                  image={item.imageUrl}
                  alt={item.name}
                />
                <CardContent sx={{ padding: '8px' }}>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {item.category}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Price: Ksh{item.price}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Quantity: {item.quantity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleRemoveItem(item.id)} sx={{ color:'white', backgroundColor: '#800000', '&:hover': { backgroundColor: '#800000' } }}>REMOVE</Button>
                </CardActions>
              </Box>
            ))}
            <Button onClick={handleCheckout} sx={{ marginTop: 2, color: 'white', backgroundColor: '#800000', '&:hover': { backgroundColor: '#800000' } }}>CHECKOUT ({totalAmount} Ksh)</Button>
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
      <Paper elevation={3} sx={{ margin: 2, padding: 2, width: '90%', height: '75vh', overflow: 'auto' }}>
        <Typography variant="h6" align="left">
          <Link to="/products" style={{ textDecoration: 'none', color: '#000' }}>
            Products
            <IconButton edge="end" aria-label="see all" sx={{ color: '#800000' }}>
              <ArrowForwardIos />
            </IconButton>
          </Link>
        </Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleAddToCart(product)} sx={{ color: 'white', backgroundColor: '#800000', '&:hover': { backgroundColor: '#800000' } }}>Add to Cart</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default Cart;
