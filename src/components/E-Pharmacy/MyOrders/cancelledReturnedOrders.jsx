import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import axios from 'axios';

const CancelledReturnedOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch cancelled/returned orders
    const fetchCancelledReturnedOrders = async () => {
      try {
        const response = await axios.get('http://192.168.90.52:5500/api/order/cancelorder/321456');
        setOrders(response.data); // Assuming response.data is an array of cancelled/returned orders
      } catch (error) {
        console.error('Error fetching cancelled/returned orders:', error);
      }
    };

    fetchCancelledReturnedOrders();
  }, []); // Run only once on component mount

  const handleSeeDetails = (order) => {
    // Implement functionality to view details similar to MyOrders
    console.log('View details for cancelled/returned order:', order);
    // Example navigation - adjust as per your application flow
    navigate(`/cancelled-returned-orders/${order.orderId}`);
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
        Cancelled/Returned Orders
      </Typography>
      <Card sx={{ marginTop: 2 }}>
        <CardContent>
          {orders.map((order) => (
            <Paper key={order.orderId} sx={{ marginBottom: 2, padding: 2 }}>
              {order.products.map((product, index) => (
                <Box key={index} display="flex" alignItems="center">
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.productUrl} // Use productUrl from backend for image
                    alt={`Product ${index + 1}`}
                  />
                  <CardContent sx={{ marginLeft: 2 }}>
                    <Typography variant="h6" component="div">
                      Product ID: {product.productId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Order Number: {order.orderId} {/* Using orderId instead of orderNumber */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {order.orderStatus} {/* Using orderStatus instead of status */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {new Date(order.createdAt).toLocaleDateString()} {/* Formatting date */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {product.quantity}
                    </Typography>
                  </CardContent>
                  <RedButton variant="contained" onClick={() => handleSeeDetails(order)}>
                    See Details
                  </RedButton>
                </Box>
              ))}
            </Paper>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};

export default CancelledReturnedOrders;
