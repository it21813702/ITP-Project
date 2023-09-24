import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: [true, 'Username Exist'],
  },
  description: {
    type: String,
    required: true,
    unique: false,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  materials: {
    type: String,
  },
  height: String,
  width: String,
  depth: String,
  stock: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
  },
  image: {
    type: String,
    required: true,
  },
});

export default model('Product', productSchema);
