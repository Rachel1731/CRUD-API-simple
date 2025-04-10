const Pet = require('./models/pet.js');

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

// Routes go here

// CREATE - POST - /pets
app.post('/pets', async (req, res) => {
    const createdPet = await Pet.create(req.body);
  res.json(createdPet)
});

// READ - GET - /pets
app.get('/pets', async (req, res) => {
   // Add a message to test the route
	const foundPets = await Pet.find();
    res.json(foundPets);
  });

  app.delete('/pets/:petId', async (req, res) => {
	// Add a message to test the route
	const deletedPet = await Pet.findByIdAndDelete(req.params.petId);
    res.json(deletedPet);
});

// UPDATE - PUT - /pets/:petId
app.put('/pets/:petId', async (req, res) => {
    res.json({ message: `Update route with the param ${req.params.petId}` });
});

// UPDATE - PUT - /pets/:petId
app.put('/:petId', async (req, res) => {
    // Add { new: true } as the third argument
    const updatedPet = await Pet.findByIdAndUpdate(
	    req.params.petId, 
	    req.body,
	    {new: true}
    );
});

const cors = require('cors');
app.use(cors());

app.listen(3000, () => {
  console.log('The express app is ready!');
});