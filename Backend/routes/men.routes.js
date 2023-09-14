const express = require('express')
const { MenModel } = require('../model/men.model');

const menRouter = express.Router()

// Create a new men's product
menRouter.post('/', async (req, res) => {
    try {
      const { image, title, price, mrp, rating, review } = req.body;
      const newMenProduct = new MenModel({ image, title, price, mrp, rating, review });
      const savedProduct = await newMenProduct.save();
      res.status(201).json({"msg":"Product Successfully Added",savedProduct});
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Get a specific men's product by ID
menRouter.get('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await MenModel.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
});
  
menRouter.get('/', async (req, res) => {
    try {
      const products = await MenModel.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Filter men's products by a specific condition (e.g., filter by rating)
menRouter.get('/filter/:rating', async (req, res) => {
    try {
      const rating = parseFloat(req.params.rating);
      const filteredProducts = await MenModel.find({ rating });
      res.json(filteredProducts);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
});
  
// Sort men's products by a specific field (e.g., sort by price in ascending order)
menRouter.get('/sort/:field', async (req, res) => {
    try {
      const field = req.params.field;
      const sortedProducts = await MenModel.find().sort({ [field]: 1 });
      res.json(sortedProducts);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Update a men's product by ID
menRouter.put('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const { image, title, price, mrp, rating, review } = req.body;
      const updatedProduct = await MenModel.findByIdAndUpdate(
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
  
// Delete a men's product by ID
menRouter.delete('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await MenModel.findByIdAndRemove(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({"msg":"Product deleted Successfully",deletedProduct});
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {menRouter};