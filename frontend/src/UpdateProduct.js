import {React, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Container, TextField,  Snackbar, Alert, TableCell, TableBody, TableRow, Paper, Table, TableContainer, TableHead  } from '@mui/material';

const UpdateProduct = () => {

    const { productID } = useParams();
    const [product, setProduct] = useState({
        ID: '',
        Name: '',
        Type: '',
        ISBN: '',
        Title: '',
        Author: '',
        PublishDate: '',
        Publisher: '',
        Price: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const url = `http://localhost:5000/getProduct?productID=${productID}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('yippeeee', data);
                setProduct(data[0]);

            }catch(error){
                console.error('Error fetching books:', error);
            }
        }

        fetchProduct();
    },[productID]);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleUpdateProduct = async () => {
        try {
            const response = await fetch('http://localhost:5000/updateProduct', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle success, maybe show a notification
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return(
        // <Container style={{margin: 'auto'}}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>ISBN</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Publish Date</TableCell>
                            <TableCell>Publisher</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                            {Object.entries(product).map(([key, value]) => (
                                <TableCell key={key}>
                                    <TextField
                                        name={key}
                                        value={value}
                                        onChange={handleFieldChange}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        label={key}
                                    />
                                </TableCell>
                            ))}
                            {/* <TableCell>{product.ID}</TableCell>
                            <TableCell>
                                <TextField
                                    name="Name"
                                    value={product.Name}
                                    onChange={handleFieldChange}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="Type"
                                    value={product.Type}
                                    onChange={handleFieldChange}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="ISBN"
                                    value={product.ISBN}
                                    onChange={handleFieldChange}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="Title"
                                    value={product.Title}
                                    onChange={handleFieldChange}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="Author"
                                    value={product.Author}
                                    onChange={(e) => handleFieldChange(product.Author, e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="PublishDate"
                                    value={product.PublishDate}
                                    onChange={handleFieldChange}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="Publisher"
                                    value={product.Publisher}
                                    onChange={handleFieldChange}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="Price"
                                    value={product.Price}
                                    onChange={handleFieldChange}
                                />
                            </TableCell> */}
                            <TableCell>
                                <Button variant="outlined" onClick={handleUpdateProduct}>Update</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        // </Container>
    )
}

export default UpdateProduct;