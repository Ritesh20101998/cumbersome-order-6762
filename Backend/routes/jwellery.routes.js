const express = require('express')
const { jwelleryModel } = require('../model/jwellery.model');

const jwelleryRouter = express.Router()

// Create a new jwellery's product
jwelleryRouter.post('/', async (req, res) => {
    try {
      const { image, title, price, mrp, rating, review } = req.body;
      const newJwelleryProduct = new jwelleryModel({ image, title, price, mrp, rating, review });
      const savedProduct = await newJwelleryProduct.save();
      res.status(201).json({"msg":"Product Successfully Added",savedProduct});
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Get a specific jwellery's product by ID
jwelleryRouter.get('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await jwelleryModel.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
});
  
jwelleryRouter.get('/', async (req, res) => {
    try {
      const products = await jwelleryModel.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Filter jwellery's products by a specific condition (e.g., filter by rating)
jwelleryRouter.get('/filter/:rating', async (req, res) => {
    try {
      const rating = parseFloat(req.params.rating);
      const filteredProducts = await jwelleryModel.find({ rating });
      res.json(filteredProducts);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
});
  
// Sort jwellery's products by a specific field (e.g., sort by price in ascending order)
jwelleryRouter.get('/sort/:field', async (req, res) => {
    try {
      const field = req.params.field;
      const sortedProducts = await jwelleryModel.find().sort({ [field]: 1 });
      res.json(sortedProducts);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Update a jwellery's product by ID
jwelleryRouter.put('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const { image, title, price, mrp, rating, review } = req.body;
      const updatedProduct = await jwelleryModel.findByIdAndUpdate(
        productId,
        { image, title, price, mrp, rating, review },
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({"msg":"Product updated Successfully",updatedProduct});
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Delete a jwellery's product by ID
jwelleryRouter.delete('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await jwelleryModel.findByIdAndRemove(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({"msg":"Product deleted Successfully",deletedProduct});
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {jwelleryRouter};