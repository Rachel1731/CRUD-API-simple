const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
  });

  const Pet = mongoose.model('Pet', petSchema);

  module.exports = Pet;