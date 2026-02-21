import fs from 'fs';

// Read CSV file
const csvData = fs.readFileSync('./data/hotel-booking/hotel_booking.csv', 'utf-8');
const lines = csvData.split('\n');
const headers = lines[0].split(',');

console.log('📊 Hotel Booking Dataset Analysis\n');
console.log(`Total Records: ${lines.length - 1}`);
console.log(`\nColumns (${headers.length}):`);
headers.forEach((h, i) => console.log(`  ${i + 1}. ${h}`));

// Parse first 1000 records for analysis
const records = [];
for (let i = 1; i < Math.min(1001, lines.length); i++) {
  const values = lines[i].split(',');
  if (values.length === headers.length) {
    const record = {};
    headers.forEach((h, idx) => {
      record[h] = values[idx];
    });
    records.push(record);
  }
}

console.log(`\n\n📈 Statistics (from first 1000 records):`);
console.log(`\nHotel Types:`);
const hotelTypes = {};
records.forEach(r => {
  hotelTypes[r.hotel] = (hotelTypes[r.hotel] || 0) + 1;
});
Object.entries(hotelTypes).forEach(([type, count]) => {
  console.log(`  ${type}: ${count}`);
});

console.log(`\nCancellation Rate:`);
const canceled = records.filter(r => r.is_canceled === '1').length;
console.log(`  Canceled: ${canceled} (${(canceled/records.length*100).toFixed(1)}%)`);
console.log(`  Not Canceled: ${records.length - canceled} (${((records.length-canceled)/records.length*100).toFixed(1)}%)`);

console.log(`\nTop 10 Countries:`);
const countries = {};
records.forEach(r => {
  countries[r.country] = (countries[r.country] || 0) + 1;
});
Object.entries(countries)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .forEach(([country, count]) => {
    console.log(`  ${country}: ${count}`);
  });

console.log(`\nMarket Segments:`);
const segments = {};
records.forEach(r => {
  segments[r.market_segment] = (segments[r.market_segment] || 0) + 1;
});
Object.entries(segments).forEach(([seg, count]) => {
  console.log(`  ${seg}: ${count}`);
});

console.log(`\n\n💡 Sample Record:`);
console.log(JSON.stringify(records[0], null, 2));
