import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import CommonLayout from '../CommonLayout';

import {
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@mui/material';

const steps = ['Product Details', 'Dimensions', 'Stock and Availability'];

const ProductDetail = () => {

    const [inputs,setInputs]=useState({});
    const [loading, setLoading] = useState(true);
    const id = useParams().id;
    const history = useNavigate();
  
    useEffect(() => {
      const fetchHandler = async () => {
       
        try {
            const response = await axios.get(`http://localhost:8080/products/${id}`);
            const data = response.data;
            if (data && data.product) {
              setInputs(data.product);
            } else {
              console.error('Product data not found in the response');
            }
          } catch (error) {
            console.error('Error:', error);
          }
          finally {
            setLoading(false);
          }
        };
    
        fetchHandler();
      }, [id]);

      const sendRequest = async() =>{
        await axios.put(`http://localhost:8080/products/${id}`,{
            name:String(inputs.name),
            description:String(inputs.description),
            category:String(inputs.category),     
            height:String(inputs.height),
            width:String(inputs.width),
            depth:String(inputs.depth),
            image:String(inputs.image),
            materials:String(inputs.materials),
            price:String(inputs.price),
            stock:String(inputs.stock),
            available:Boolean(inputs.available)
      }).then(res=>res.data)
      }
  

  const [activeStep, setActiveStep] = useState(0);
 
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    
    const { name, value, type, checked } = e.target;
    setInputs({
      ...inputs,
      [name]: type === 'checkbox' ? checked : value,
      
    });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    sendRequest().then(()=>history("/products"))
  }

  return (
    <CommonLayout>
      <Box maxWidth={700} m="auto" mt={5} p={3}>
    <Paper elevation={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Add a New Product
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {loading ? (
        <div>Loading...</div>
      ):(
      <form onSubmit={handleSubmit}>
        {activeStep === 0 && (
          <Box p={3}>
            <Box mb={2}>
              <TextField
                label="Product Name"
                fullWidth
                variant="outlined"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                required
                
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Description"
                fullWidth
                variant="outlined"
                name="description"
                value={inputs.description}
                onChange={handleChange}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Image"
                fullWidth
                variant="outlined"
                name="image"
                value={inputs.image}
                onChange={handleChange}
                placeholder="Paste the Image URL here"
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Materials"
                fullWidth
                variant="outlined"
                name="materials"
                value={inputs.materials}
                onChange={handleChange}
              />
            </Box>
            <Box mb={2}>
              <InputLabel>Select The Category</InputLabel>
              <Select
                fullWidth
                variant="outlined"
                name="category"
                value={inputs.category}
                onChange={handleChange}
                required
              >
                <MenuItem value={1}>Paintings</MenuItem>
                <MenuItem value={2}>Sculptures</MenuItem>
                <MenuItem value={3}>Prints and Posters</MenuItem>
                <MenuItem value={4}>Ceramics and Pottery</MenuItem>
                <MenuItem value={5}>Jewelry</MenuItem>
                <MenuItem value={6}>Textiles and Fabrics</MenuItem>
                <MenuItem value={7}>Paper craft</MenuItem>
                <MenuItem value={8}>Wood craft</MenuItem>
                <MenuItem value={9}>Glass craft</MenuItem>
                <MenuItem value={10}>Leather craft</MenuItem>
                <MenuItem value={11}>Metal craft</MenuItem>
                <MenuItem value={12}>Traditional craft</MenuItem>
              </Select>
            </Box>
            <Box mb={2}>
              <TextField
                label="Price (in LKR)"
                fullWidth
                variant="outlined"
                type="number"
                name="price"
                value={inputs.price}
                onChange={handleChange}
                required
              />
            </Box>
          </Box>
        )}

        {activeStep === 1 && (
          <Box p={3}>
            <Box mb={1}>
              <TextField
                label="Height (cm)"
                fullWidth
                variant="outlined"
                type="number"
                name="height"
                value={inputs.height}
                onChange={handleChange}
                required
              />
            </Box>
            <Box mb={1}>
              <TextField
                label="Width (cm)"
                fullWidth
                variant="outlined"
                type="number"
                name="width"
                value={inputs.width}
                onChange={handleChange}
                required
              />
            </Box>
            <TextField
              label="Depth (cm)"
              fullWidth
              variant="outlined"
              type="number"
              name="depth"
              value={inputs.depth}
              onChange={handleChange}
              required
            />
          </Box>
        )}

        {activeStep === 2 && (
          <Box p={3}>
            <TextField
              label="Stock"
              fullWidth
              variant="outlined"
              type="number"
              name="stock"
              value={inputs.stock}
              onChange={handleChange}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="available"
                  checked={inputs.available}
                  onChange={handleChange}
                />
              }
              label="Available"
            />
            
          </Box>
        )}

        <Box display="flex" justifyContent="space-between" p={3}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} variant="outlined">
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 && (
            <Button onClick={handleNext} variant="contained" color="primary">
              Next
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button type="submit" variant="contained" color="primary">
              Update Product
            </Button>
          )}
          
        </Box>
      </form>
      )}
    </Paper>
  </Box>
      
    </CommonLayout>
  );
};

export default ProductDetail;
