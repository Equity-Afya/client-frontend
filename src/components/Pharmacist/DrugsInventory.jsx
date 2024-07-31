import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField
} from '@mui/material';

const ProductInventory = () => {
    const [products, setProducts] = useState([]);
    const [newProductName, setNewProductName] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductImage, setNewProductImage] = useState(null);
    const [newProductCategory, setNewProductCategory] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductQuantity, setNewProductQuantity] = useState('');
    const [open, setOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://192.168.88.141:5500/api/product/viewallproducts');
            const data = await response.json();
            setProducts(data.map(product => ({
                ...product,
                imageUrl: `http://192.168.88.141:5500/api/product/images/${product.image}` // Adjust path as necessary
            })));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleEditProduct = (productId) => {
        const productToEdit = products.find(product => product.id === productId);
        setSelectedProduct(productToEdit);
        setSelectedProductId(productId);
        setEditDialogOpen(true);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://192.168.88.141:5500/api/product/deleteproduct/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Product ${productId} deleted successfully.`);
                setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
                setDeleteDialogOpen(false);
            } else {
                const errorData = await response.json();
                throw new Error(`Failed to delete product ${productId}: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert(`Failed to delete product: ${error.message || 'An unknown error occurred'}`);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', newProductName);
        formData.append('description', newProductDescription);
        formData.append('image', newProductImage);
        formData.append('category', newProductCategory);
        formData.append('price', newProductPrice);
        formData.append('quantity', newProductQuantity);

        try {
            const response = await fetch('http://192.168.88.141:5500/api/product/createproduct', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setProducts([...products, {
                    ...result,
                    imageUrl: `http://192.168.88.141:5500/api/product/images/${result.image}` // Adjust path as necessary
                }]);
                setNewProductName('');
                setNewProductDescription('');
                setNewProductImage(null);
                setNewProductCategory('');
                setNewProductPrice('');
                setNewProductQuantity('');
                setOpen(false);
            } else {
                console.error('Error adding product:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEditSubmit = async () => {
        const formData = new FormData();
        formData.append('name', selectedProduct.name);
        formData.append('description', selectedProduct.description);
        formData.append('image', newProductImage || selectedProduct.image);
        formData.append('category', selectedProduct.category);
        formData.append('price', selectedProduct.price);
        formData.append('quantity', selectedProduct.quantity);

        try {
            const response = await fetch(`http://192.168.88.141:5500/api/product/updateproduct/${selectedProductId}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                const updatedProduct = await response.json();
                const updatedProducts = products.map(product =>
                    product.id === selectedProductId ? {
                        ...updatedProduct,
                        imageUrl: `http://192.168.88.141:5500/api/product/images/${updatedProduct.image}` // Adjust path as necessary
                    } : product
                );
                setProducts(updatedProducts);
                setEditDialogOpen(false);
            } else {
                console.error('Error updating product:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert(`Error updating product: ${error.message || 'An unknown error occurred'}`);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setNewProductImage(e.target.files[0]);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
        setSelectedProductId(null);
        setSelectedProduct(null);
    };

    const handleDeleteDialogOpen = (productId) => {
        setDeleteProductId(productId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setDeleteProductId(null);
    };

    return (
        <Box sx={{ textAlign: 'center', mt: 2, height: '100vh', width: '100vw', padding: '0', marginTop: '20px' }}>
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
                            <TableCell>Image</TableCell>
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
                                    <img 
                                        src={product.imageUrl} 
                                        alt={product.name}
                                        style={{ width: '100px', height: 'auto' }} 
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEditProduct(product.id)}>Edit</Button>
                                    <Button onClick={() => handleDeleteDialogOpen(product.id)}>Delete</Button>
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
                        <input type="file" onChange={handleFileChange} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddProduct} color="primary" type="submit">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    {selectedProduct && (
                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Product Name"
                                variant="outlined"
                                fullWidth
                                value={selectedProduct.name}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                            />
                            <TextField
                                label="Product Description"
                                variant="outlined"
                                fullWidth
                                value={selectedProduct.description}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                            />
                            <TextField
                                label="Product Category"
                                variant="outlined"
                                fullWidth
                                value={selectedProduct.category}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                            />
                            <TextField
                                label="Product Price"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={selectedProduct.price}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                            />
                            <TextField
                                label="Product Quantity"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={selectedProduct.quantity}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, quantity: e.target.value })}
                            />
                            <input type="file" onChange={handleFileChange} />
                            {selectedProduct.imageUrl && (
                                <img 
                                    src={newProductImage ? URL.createObjectURL(newProductImage) : selectedProduct.imageUrl} 
                                    alt={selectedProduct.name} 
                                    style={{ width: '100px', height: 'auto', marginTop: '10px' }} 
                                />
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this product?</DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleDeleteProduct(deleteProductId)} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductInventory;
