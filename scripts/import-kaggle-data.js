import fs from 'fs';

// Read CSV file
const csvData = fs.readFileSync('./data/hotel-booking/hotel_booking.csv', 'utf-8');
const lines = csvData.split('\n');
const headers = lines[0].split(',');

console.log('🔄 Importing Kaggle Hotel Booking Data...\n');

// Parse CSV records
const records = [];
for (let i = 1; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  
  const values = lines[i].split(',');
  if (values.length >= headers.length) {
    const record = {};
    headers.forEach((h, idx) => {
      record[h.trim()] = values[idx]?.trim() || '';
    });
    records.push(record);
  }
}

console.log(`✅ Parsed ${records.length} booking records\n`);

// Map room types to our hotel rooms
const roomMapping = {
  'A': ['A101', 'A102', 'A103', 'A104', 'A105'],
  'B': ['A106', 'A107', 'A108', 'A109', 'A110'],
  'C': ['A111', 'A201', 'A202', 'A203', 'A204'],
  'D': ['A205', 'A206', 'A207', 'A208', 'A209'],
  'E': ['A210', 'A211', 'B101', 'B102', 'B103'],
  'F': ['B104', 'B105', 'B106', 'B107', 'B108'],
  'G': ['B109', 'B110', 'B111', 'B201', 'B202'],
  'H': ['B203', 'B204', 'B205', 'B206', 'B207'],
  'L': ['B208', 'B209', 'B210', 'B211', 'N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7']
};

// Convert to our booking format (take recent 500 bookings)
const recentBookings = records
  .filter(r => r.is_canceled === '0' && r.reservation_status === 'Check-Out')
  .slice(0, 500);

const bookings = recentBookings.map((record, index) => {
  const roomType = record.reserved_room_type || 'A';
  const availableRooms = roomMapping[roomType] || roomMapping['A'];
  const roomId = availableRooms[index % availableRooms.length];
  
  const checkInDate = new Date(record.reservation_status_date);
  const nights = parseInt(record.stays_in_week_nights || 0) + parseInt(record.stays_in_weekend_nights || 0);
  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkOutDate.getDate() + nights);
  
  return {
    id: `BK${String(index + 1).padStart(5, '0')}`,
    roomId: roomId,
    guestName: record.name || 'Guest',
    email: record.email || '',
    phone: record['phone-number'] || '',
    checkIn: checkInDate.toISOString().split('T')[0],
    checkOut: checkOutDate.toISOString().split('T')[0],
    nights: nights || 1,
    adults: parseInt(record.adults || 2),
    children: parseInt(parseFloat(record.children || 0)),
    totalPrice: parseFloat(record.adr || 400) * (nights || 1),
    status: 'Completed',
    country: record.country || 'THA',
    marketSegment: record.market_segment || 'Direct',
    specialRequests: parseInt(record.total_of_special_requests || 0)
  };
});

console.log(`✅ Converted ${bookings.length} bookings to our format\n`);

// Generate transactions from bookings
const transactions = bookings.map((booking, index) => ({
  id: `TRX-${Date.now() + index}`,
  desc: `จองห้อง ${booking.roomId} (${booking.guestName})`,
  amount: booking.totalPrice,
  type: 'income',
  date: booking.checkIn,
  status: 'Completed',
  bookingId: booking.id
}));

// Save to JSON files
fs.writeFileSync('./data/kaggle-bookings.json', JSON.stringify(bookings, null, 2));
fs.writeFileSync('./data/kaggle-transactions.json', JSON.stringify(transactions, null, 2));

console.log('💾 Saved files:');
console.log('  - data/kaggle-bookings.json');
console.log('  - data/kaggle-transactions.json');

// Generate statistics
console.log('\n📊 Statistics:');
console.log(`  Total Bookings: ${bookings.length}`);
console.log(`  Total Revenue: ฿${transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}`);
console.log(`  Average Price: ฿${(transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length).toFixed(2)}`);

const roomUsage = {};
bookings.forEach(b => {
  roomUsage[b.roomId] = (roomUsage[b.roomId] || 0) + 1;
});
console.log(`  Unique Rooms Used: ${Object.keys(roomUsage).length}`);

const topRooms = Object.entries(roomUsage)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);
console.log('\n  Top 5 Most Booked Rooms:');
topRooms.forEach(([room, count]) => {
  console.log(`    ${room}: ${count} bookings`);
});

console.log('\n✨ Import completed successfully!');
