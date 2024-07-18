import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import axios from 'axios';

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState('ongoingDelivered');
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://192.168.88.28:5500/api/order/viewuserorder/321456');
        setAllOrders(response.data); // Assuming response.data is an array of orders
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const filterOrders = () => {
      if (activeTab === 'ongoingDelivered') {
        setFilteredOrders(allOrders.filter(order => order.orderStatus === 'Ongoing' || order.orderStatus === 'Delivered'));
      } else if (activeTab === 'cancelledReturned') {
        setFilteredOrders(allOrders.filter(order => order.orderStatus === 'Cancelled' || order.orderStatus === 'Returned'));
      }
    };

    filterOrders();
  }, [activeTab, allOrders]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSeeDetails = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuyAgain = () => {
    navigate('/products'); // Navigating to '/products' page
  };

  const cancelOrder = async (orderId) => {
    try {
      await axios.put(`http://192.168.88.28:5500/api/order/cancelorder/${orderId}`);
      setAllOrders((prevOrders) => prevOrders.map(order =>
        order.orderId === orderId ? { ...order, orderStatus: 'Cancelled' } : order
      ));
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const RedButton = styled(Button)({
    backgroundColor: '#800000',
    color: 'white',
    '&:hover': {
      backgroundColor: '#8e0000',
    },
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="subtitle1"
          sx={{
            textDecoration: activeTab === 'ongoingDelivered' ? 'underline' : 'none',
            fontWeight: activeTab === 'ongoingDelivered' ? 'bold' : 'normal',
            color: activeTab === 'ongoingDelivered' ? 'brown' : 'inherit',
            cursor: 'pointer',
          }}
          onClick={() => handleTabClick('ongoingDelivered')}
        >
          Ongoing/Delivered
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            textDecoration: activeTab === 'cancelledReturned' ? 'underline' : 'none',
            fontWeight: activeTab === 'cancelledReturned' ? 'bold' : 'normal',
            color: activeTab === 'cancelledReturned' ? 'brown' : 'inherit',
            cursor: 'pointer',
          }}
          onClick={() => handleTabClick('cancelledReturned')}
        >
          Cancelled/Returned
        </Typography>
      </Box>
      <Card sx={{ marginTop: 2 }}>
        <CardContent>
          {filteredOrders.map((order) => (
            <Paper key={order.orderId} sx={{ marginBottom: 2, padding: 2 }}>
              {order.products.map((product, index) => (
                <Box key={index} display="flex" alignItems="center">
                  <CardMedia
                    component="img"
                    sx={{ width: 50, height: 50 }} // Adjust the size proportionally here
                    image={product.productUrl}
                    alt={`Product ${index + 1}`}
                  />
                  <CardContent sx={{ marginLeft: 2 }}>
                    <Typography variant="h6" component="div">
                      Product ID: {product.productId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Order Number: {order.orderId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {order.orderStatus}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {product.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: {product.price}
                    </Typography>
                  </CardContent>
                  <RedButton variant="contained" onClick={() => handleSeeDetails(order)}>
                    See Details
                  </RedButton>
                  {activeTab === 'ongoingDelivered' && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => cancelOrder(order.orderId)}
                      sx={{ marginLeft: 2, backgroundColor: '#800000', '&:hover': { backgroundColor: '#800000' } }}
                    >
                      Cancel Order
                    </Button>
                  )}
                </Box>
              ))}
            </Paper>
          ))}
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <div>
              <Typography variant="h6">Order Number: {selectedOrder.orderId}</Typography>
              <Typography variant="body1">Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}</Typography>
              <Typography variant="body1">Status: {selectedOrder.orderStatus}</Typography>
              <Typography variant="h6" style={{ marginTop: 20 }}>Items in Your Order</Typography>
              {selectedOrder.products.map((product, index) => (
                <Card key={index} sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Typography variant="body1">Product ID: {product.productId}</Typography>
                    <Typography variant="body2">Quantity: {product.quantity}</Typography>
                    <Typography variant="body2">Image: <img src={product.productUrl} alt={`Product ${index + 1}`} style={{ width: 50, height: 50 }} /></Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <RedButton onClick={handleBuyAgain} variant="contained">
            Buy Again
          </RedButton>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyOrders;
