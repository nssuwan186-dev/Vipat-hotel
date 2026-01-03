const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true, default: 'Available' },
  floor: { type: Number, required: true },
});

module.exports = mongoose.model('Room', RoomSchema);
