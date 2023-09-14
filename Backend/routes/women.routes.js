const express = require('express')
const { womenModel } = require('../model/women.model');

const womenRouter = express.Router()

// Create a new women's product
womenRouter.post('/', async (req, res) => {
    try {
      const { image, title, price, mrp, rating, review } = req.body;
      const newwomenProduct = new womenModel({ image, title, price, mrp, rating, review });
      const savedProduct = await newwomenProduct.save();
      res.status(201).json({"msg":"Product Successfully Added",savedProduct});
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Get a specific women's product by ID
womenRouter.get('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await womenModel.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
});
  
womenRouter.get('/', async (req, res) => {
    try {
      const products = await womenModel.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Filter women's products by a specific condition (e.g., filter by rating)
womenRouter.get('/filter/:rating', async (req, res) => {
    try {
      const rating = parseFloat(req.params.rating);
      const filteredProducts = await womenModel.find({ rating });
      res.json(filteredProducts);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
});
  
// Sort women's products by a specific field (e.g., sort by price in ascending order)
womenRouter.get('/sort/:field', async (req, res) => {
    try {
      const field = req.params.field;
      const sortedProducts = await womenModel.find().sort({ [field]: 1 });
      res.json(sortedProducts);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Update a women's product by ID
womenRouter.put('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const { image, title, price, mrp, rating, review } = req.body;
      const updatedProduct = await womenModel.findByIdAndUpdate(
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
  
// Delete a women's product by ID
womenRouter.delete('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await womenModel.findByIdAndRemove(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({"msg":"Product deleted Successfully",deletedProduct});
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {womenRouter};