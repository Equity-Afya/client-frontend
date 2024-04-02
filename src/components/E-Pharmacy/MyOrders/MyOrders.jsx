import React, { useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState('ongoingDelivered');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const orders = [
    {
      id: 1,
      image: 'path/to/image1.jpg',
      description: 'Order Description 1',
      orderNumber: '12345',
      status: 'Delivered',
      date: '2024-03-31',
    },
    // Add more orders as needed
  ];

  const BrownButton = styled(Button)({
    backgroundColor: 'brown',
    color: 'white',
    '&:hover': {
      backgroundColor: 'darkbrown',
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
          {activeTab === 'ongoingDelivered' &&
            orders.map((order) => (
              <Paper key={order.id} sx={{ marginBottom: 2, padding: 2 }}>
                <Box display="flex" alignItems="center">
                  <CardMedia
                    component="img"
                    height="140"
                    image={order.image}
                    alt={order.description}
                  />
                  <CardContent sx={{ marginLeft: 2 }}>
                    <Typography variant="h6" component="div">
                      {order.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Order Number: {order.orderNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {order.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {order.date}
                    </Typography>
                  </CardContent>
                </Box>
                <BrownButton variant="contained" component={Link} to="/order-details">
                  See Details
                </BrownButton>
              </Paper>
            ))}
          {activeTab === 'cancelledReturned' && (
            <Typography>Content for Cancelled/Returned</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default MyOrders;