const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Room = require('./models/Room');

dotenv.config();

const DEFAULT_ROOMS = [
  { id: 'A101', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'A102', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'A103', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'A104', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'A105', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'A106', type: 'Standard Twin', price: 500, status: 'Available', floor: 1 },
  { id: 'A107', type: 'Standard Twin', price: 500, status: 'Available', floor: 1 },
  { id: 'A108', type: 'Standard Twin', price: 500, status: 'Available', floor: 1 },
  { id: 'A109', type: 'Standard Twin', price: 500, status: 'Available', floor: 1 },
  { id: 'A110', type: 'Standard Twin', price: 500, status: 'Available', floor: 1 },
  { id: 'A111', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'A201', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'A202', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'A203', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'A204', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'A205', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'A206', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'A207', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'A208', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'A209', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'A210', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'A211', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'B101', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'B102', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'B103', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'B104', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'B105', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'B106', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'B107', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'B108', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'B109', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'B110', type: 'Standard', price: 400, status: 'Available', floor: 1 },
  { id: 'B111', type: 'Standard Twin', price: 500, status: 'Available', floor: 1 },
  { id: 'B201', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'B202', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'B203', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'B204', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'B205', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'B206', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'B207', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'B208', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'B209', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'B210', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'B211', type: 'Standard', price: 400, status: 'Available', floor: 2 },
  { id: 'N1', type: 'Standard Twin', price: 600, status: 'Available', floor: 3 },
  { id: 'N2', type: 'Standard', price: 500, status: 'Available', floor: 3 },
  { id: 'N3', type: 'Standard', price: 500, status: 'Available', floor: 3 },
  { id: 'N4', type: 'Standard Twin', price: 600, status: 'Available', floor: 3 },
  { id: 'N5', type: 'Standard Twin', price: 600, status: 'Available', floor: 3 },
  { id: 'N6', type: 'Standard Twin', price: 600, status: 'Available', floor: 3 },
  { id: 'N7', type: 'Standard', price: 500, status: 'Available', floor: 3 },
];

const importData = async () => {
  try {
    await connectDB();
    await Room.deleteMany();
    await Room.insertMany(DEFAULT_ROOMS);
    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Room.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
