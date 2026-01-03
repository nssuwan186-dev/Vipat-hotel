const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  guestName: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', BookingSchema);
