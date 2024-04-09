import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, InputBase, Badge, Box, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, AccountCircle, ShoppingCart, CategoryOutlined, FavoriteBorderOutlined, LocalOfferOutlined, DescriptionOutlined, ArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [cartNotification, setCartNotification] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categoryDropdownAnchorEl, setCategoryDropdownAnchorEl] = useState(null);
  const [conditionsDropdownAnchorEl, setConditionsDropdownAnchorEl] = useState(null);

  const products = [
    { 
      name: 'Baclofen',
      price: '$10.00',
      image: 'https://media.post.rvohealth.io/2U4nNZEf7jt4s7fWZRWXPcYsXyz/2023/08/22/2UM7Q8X8MCbyDneO1tpu6lmJxoq.jpg',
      description: 'Description of Baclofen',
      category: 'Category 1'
    },
    { 
      name: 'Bisacodyl',
      price: '$15.00',
      image: 'https://www.findatopdoc.com/var/fatd/storage/images/_aliases/article_main/healthy-living/what-is-bisacodyl-used-for/6978077-2-eng-US/What-Is-Bisacodyl-Used-For.jpg',
      description: 'Description of Bisacodyl',
      category: 'Category 2'
    },
    { name: 'Medicine A', price: '$10.00', image: 'https://via.placeholder.com/150' },
    { name: 'Medicine B', price: '$15.00', image: 'https://via.placeholder.com/150' },
    // Add more products as needed
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
    setCartNotification(true); // Show notification
    navigate('/cart'); // Navigate to the cart tab
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCategoryDropdownAnchorEl(null);
    setConditionsDropdownAnchorEl(null);
  };

  const handleSubmitPrescription = () => {
    navigate('/prescriptions'); // Navigate to the prescriptions tab
    handleMenuClose();
  };

  const handleMyHealthRecords = () => {
    navigate('/health-records'); // Navigate to the my health records tab
    handleMenuClose();
  };

  const handleCategoryDropdownOpen = (event) => {
    setCategoryDropdownAnchorEl(event.currentTarget);
  };

  const handleCategoryDropdownClose = () => {
    setCategoryDropdownAnchorEl(null);
  };

  const handleNavigateToMedicalServices = () => {
    navigate('/medical-services'); // Navigate to the medical services tab
    handleMenuClose();
    handleCategoryDropdownClose();
  };

  const handleConditionsDropdownOpen = (event) => {
    setConditionsDropdownAnchorEl(event.currentTarget);
  };

  const handleConditionsDropdownClose = () => {
    setConditionsDropdownAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#d9d9d9' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleCategoryDropdownOpen}>
              <CategoryOutlined sx={{ marginRight: 1 }} /> Shop by Category <ArrowRight />
            </MenuItem>
            <Menu
              anchorEl={categoryDropdownAnchorEl}
              open={Boolean(categoryDropdownAnchorEl)}
              onClose={handleCategoryDropdownClose}
            >
              <MenuItem onClick={handleCategoryDropdownClose}>Medical Conditions</MenuItem>
              <MenuItem onClick={handleCategoryDropdownClose}>Vitamins and Supplements</MenuItem>
              <MenuItem onClick={handleCategoryDropdownClose}>Personal Care</MenuItem>
              <MenuItem onClick={handleNavigateToMedicalServices}>Medical Services</MenuItem>
            </Menu>
            <MenuItem onClick={handleConditionsDropdownOpen}>
              <FavoriteBorderOutlined sx={{ marginRight: 1 }} /> Shop by Conditions <ArrowRight />
            </MenuItem>
            <Menu
              anchorEl={conditionsDropdownAnchorEl}
              open={Boolean(conditionsDropdownAnchorEl)}
              onClose={handleConditionsDropdownClose}
            >
              <MenuItem onClick={handleConditionsDropdownClose}>Eye care</MenuItem>
              <MenuItem onClick={handleConditionsDropdownClose}>Ear care</MenuItem>
              <MenuItem onClick={handleConditionsDropdownClose}>Cough / Cold and Flu</MenuItem>
              <MenuItem onClick={handleConditionsDropdownClose}>Oral care</MenuItem>
              <MenuItem onClick={handleConditionsDropdownClose}>Diabetes</MenuItem>
              <MenuItem onClick={handleConditionsDropdownClose}>Reproductive health</MenuItem>
              <MenuItem onClick={handleConditionsDropdownClose}>Hypertension</MenuItem>
              <MenuItem onClick={handleConditionsDropdownClose}>Stomach care / Digestive health</MenuItem>
              <MenuItem onClick={handleConditionsDropdownClose}>Bone / joint and muscle aches</MenuItem>
              <MenuItem onClick={handleConditionsDropdownClose}>Allergy relief</MenuItem>
              <MenuItem onClick={handleConditionsDropdownClose}>Wellness checkup</MenuItem>
            </Menu>
            <MenuItem onClick={handleMenuClose}>
              <LocalOfferOutlined sx={{ marginRight: 1 }} /> Offers
            </MenuItem>
            <MenuItem onClick={handleSubmitPrescription}>
              <DescriptionOutlined sx={{ marginRight: 1 }} /> Submit a Prescription
            </MenuItem>
            <MenuItem onClick={handleMyHealthRecords}>
              <FavoriteBorderOutlined sx={{ marginRight: 1 }} /> My Health Records
            </MenuItem>
          </Menu>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for a product..."
            inputProps={{ 'aria-label': 'search' }}
            startAdornment={<SearchIcon position="start" />}
          />
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
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

      <h1>Products</h1>
      <div className="products">
        {products.map((product, index) => (
          <Box sx={{ width: 200, margin: 2 }} key={index}>
            {/* Adjust the width as needed */}
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCart />}
                onClick={() => addToCart(product)}
                size="small"
                sx={{ backgroundColor: '#800000', '&:hover': { backgroundColor: '#800000' } }}
              >
                Add to Cart
              </Button>
            </Card>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
