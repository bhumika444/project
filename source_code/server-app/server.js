const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
//cors enabled on server side
app.use(cors()); 

// MongoDB Atlas connection URL
const mongoDBUri = 'mongodb+srv://dommarajubhumika444:2FEhKUBFCczVFrXI@cluster0.9pw1jcq.mongodb.net/';

// Connect to MongoDB Atlas
mongoose.connect(mongoDBUri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB successfully');
});
// Define Inventory Item Schema
const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  // image: { type: String, required: true }
});

// Create Inventory Item model
const InventoryItem = mongoose.model('InventoryItem', inventorySchema);

// Get all inventory items
app.get('/api/inventory', async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find();
    res.json(inventoryItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new inventory item
app.post('/api/inventory', async (req, res) => {
  const newItem = new InventoryItem({
    name: req.body.name,
    quantity: req.body.quantity,
    image: req.body.image
  });
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an inventory item by ID
app.put('/api/inventory/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete an inventory item by ID
app.delete('/api/inventory/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await InventoryItem.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const port = process.env.PORT || 3001;
// app.use(express.static(path.join(__dirname,'public')));
// app.use(bodyParser.json());
// //cors enabled on server side
app.use(cors()); 

// Define route for handling addition
app.post('/api/add', (req, res) => {
  const { num1, num2 } = req.body;
  //For ensuring that the data is being currently transmitted correctly
  console.log('Received data:', num1, num2);
  const sum = parseFloat(num1) + parseFloat(num2);
  console.log('Sum:', sum);
  res.json({ sum });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
