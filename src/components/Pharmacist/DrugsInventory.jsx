import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const ProductInventory = () => {
    const [products, setProducts] = useState([]);
    const [newProductName, setNewProductName] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductImage, setNewProductImage] = useState('');
    const [newProductCategory, setNewProductCategory] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductQuantity, setNewProductQuantity] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://192.168.88.195:5500/api/product/viewallproducts');
                const data = await response.json();
                setProducts(data); // Assuming data is an array of product objects
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleEditProduct = (productId) => {
        // Implement edit product logic here
        console.log('Edit product with ID:', productId);
    };

    const handleDeleteProduct = (productId) => {
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
        // Implement delete product logic here, e.g., make a DELETE request to the backend
        console.log('Delete product with ID:', productId);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        const newProduct = {
            name: newProductName,
            description: newProductDescription,
            image: newProductImage,
            category: newProductCategory,
            price: parseFloat(newProductPrice),
            quantity: parseInt(newProductQuantity),
        };

        try {
            const response = await fetch('http://192.168.88.195:5500/api/product/addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                const result = await response.json();
                setProducts([...products, result]);
                setNewProductName('');
                setNewProductDescription('');
                setNewProductImage('');
                setNewProductCategory('');
                setNewProductPrice('');
                setNewProductQuantity('');
                setOpen(false); // Close the dialog on successful product addition
            } else {
                console.error('Error adding product:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                Product Inventory
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ backgroundColor: '#9C0D0D' }}>
                    Add New Product
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEditProduct(product.id)}>Edit</Button>
                                    <Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleAddProduct}>
                        <TextField
                            label="Product Name"
                            variant="outlined"
                            fullWidth
                            value={newProductName}
                            onChange={(e) => setNewProductName(e.target.value)}
                        />
                        <TextField
                            label="Product Description"
                            variant="outlined"
                            fullWidth
                            value={newProductDescription}
                            onChange={(e) => setNewProductDescription(e.target.value)}
                        />
                        <TextField
                            label="Product Image URL"
                            variant="outlined"
                            fullWidth
                            value={newProductImage}
                            onChange={(e) => setNewProductImage(e.target.value)}
                        />
                        <TextField
                            label="Product Category"
                            variant="outlined"
                            fullWidth
                            value={newProductCategory}
                            onChange={(e) => setNewProductCategory(e.target.value)}
                        />
                        <TextField
                            label="Product Price"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={newProductPrice}
                            onChange={(e) => setNewProductPrice(e.target.value)}
                        />
                        <TextField
                            label="Product Quantity"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={newProductQuantity}
                            onChange={(e) => setNewProductQuantity(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddProduct} type="submit" variant="contained" color="primary">
                        Add Product
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductInventory;
