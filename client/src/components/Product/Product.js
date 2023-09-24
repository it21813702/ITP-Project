import React, { useState } from 'react';
import { Button, Modal, Paper } from '@mui/material';
import './Product.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommonLayout from '../CommonLayout';
const Product = (props) => {
  const history = useNavigate();
  const {
    _id,
    image,
    name,
    description,
    price,
    category,
    height,
    width,
    depth,
    materials,
    stock,
  } = props.product;
  
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openZoom = () => {
    setIsZoomOpen(true);
  };

  const closeZoom = () => {
    setIsZoomOpen(false);
  };

  const deleteHandler = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:8080/products/${_id}`);
      history('/');
      history('/products');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const categoryMap = {
    1: 'Paintings',
    2: 'Sculptures',
    3: 'Prints and Posters',
    4: 'Ceramics and Pottery',
    5: 'Jewelry',
    6: 'Textiles and Fabrics',
    7: 'Paper craft',
    8: 'Wood craft',
    9: 'Glass craft',
    10: 'Leather craft',
    11: 'Metal craft',
    12: 'Traditional craft',
  };
  const categoryName = categoryMap[category];

  return (
    <CommonLayout><div className='card'>
    <img src={image} alt='' onClick={openZoom} />

   {/* <div className='ratings'>
      <Rating name={`rating-${_id}`} value={4.5} readOnly />
      <span>12 Reviews</span>
</div>  */}
<ul>
    <li>
    <h1 className='title'>{name}</h1>
    <p className='p'>{description}</p>
    <p className='p'>Category: {categoryName}</p>
    <p className='p'>Materials: {materials}</p>
    <p className='p'>Available Stock: {stock}</p>
    <p className='p'>Dimensions: {height} x {width} x {depth} cm</p>
    <h2 className='h2'>Rs.{price}.00</h2>
   </li> 
   </ul>
    <Button LinkComponent={Link} to={`/products/${_id}`}>
      Update
    </Button>
    <Button onClick={deleteHandler} disabled={isDeleting}>
      {isDeleting ? 'Deleting...' : 'Delete'}
    </Button>
    <Button onClick={openZoom}>Zoom Image</Button>

   
    <Modal open={isZoomOpen} onClose={closeZoom}>
      <Paper>
        <img src={image} alt='' className='zoomed-image' />
        <Button onClick={closeZoom}>Close</Button>
      </Paper>
    </Modal>
  </div>
  </CommonLayout>
  );
};

export default Product;
