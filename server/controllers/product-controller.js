import Product from '../model/Product.js';

const getAllProducts = async (req, res, next) => {
  let products;

  try {
    products = await Product.find();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server error' });
  }

  if (!products) {
    return res.status(404).json({ message: 'No products found' });
  }

  return res.status(200).json({ products });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let product;

  try {
    product = await Product.findById(id);
  } catch (err) {
    console.error(err);
  }

  if (!product) {
    return res.status(404).json({ message: 'No product found' });
  }

  return res.status(200).json({ product });
};

const addProduct = async (req, res, next) => {
  const { name, description, price, category, materials, height, width, depth, stock, available, image } = req.body;
  let product;

  try {
    product = new Product({
      name,
      description,
      price,
      category,
      materials,
      height,
      width,
      depth,
      stock,
      available,
      image,
    });

    await product.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server error' });
  }

  if (!product) {
    return res.status(500).json({ message: 'Unable to add' });
  }

  return res.status(201).json({ product });
};

const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const { name, description, price, category, materials, height, depth, width, stock, available, image } = req.body;
  let product;

  try {
    product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      materials,
      height,
      width,
      depth,
      stock,
      available,
      image,
    });
    product = await product.save();
  } catch (err) {
    console.error(err);
  }

  if (!product) {
    return res.status(500).json({ message: 'Unable to update by this id' });
  }

  return res.status(200).json({ product });
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { getAllProducts, addProduct, getById, updateProduct, deleteProduct };
