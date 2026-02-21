import fs from 'fs';

// Read raw data
const bookingsRaw = JSON.parse(fs.readFileSync('./data/___7.json', 'utf-8'));
const ledgerRaw = JSON.parse(fs.readFileSync('./data/_________.json', 'utf-8'));
const settingsRaw = JSON.parse(fs.readFileSync('./data/Setting.json', 'utf-8'));

// Helper: Convert Excel date to JS Date
function excelDateToJS(excelDate) {
  if (!excelDate || typeof excelDate !== 'number') return null;
  const date = new Date((excelDate - 25569) * 86400 * 1000);
  return date.toLocaleDateString('th-TH');
}

// Process bookings from ชีต7
const bookings = [];
const seenBookings = new Set();

bookingsRaw.forEach(row => {
  // Each row has multiple bookings (columns are paired)
  const processBooking = (docId, checkIn, checkOut, room, name, phone, price, status) => {
    if (!docId || !room || seenBookings.has(docId)) return;
    
    seenBookings.add(docId);
    bookings.push({
      id: docId,
      roomId: room,
      guestName: name || 'ไม่ระบุ',
      phone: phone || '',
      checkIn: excelDateToJS(checkIn),
      checkOut: excelDateToJS(checkOut),
      price: price || 400,
      status: status === 'เช็คเอาท์แล้ว' ? 'Completed' : 'Active',
      nights: 1
    });
  };

  // Process first booking in row
  if (row['VP02151']) {
    processBooking(
      row['VP02151'],
      row['01/01/2026'],
      row['02/01/2026'],
      row['B104'],
      row['ธนากร'],
      row['081-988-3054'],
      row['400'],
      row['เช็คเอาท์แล้ว']
    );
  }

  // Process second booking in row
  if (row['VP02151_1']) {
    processBooking(
      row['VP02151_1'],
      row['01/01/2026'],
      row['02/01/2026'],
      row['A105'],
      row['นรเสฎธิ์  ไหล่จิตรภาชัยกร'],
      row['083-333-3811'],
      row['400_1'],
      row['เช็คเอาท์แล้ว']
    );
  }
});

console.log(`✅ Processed ${bookings.length} bookings`);

// Process transactions from ledger
const transactions = ledgerRaw
  .filter(row => row['รายการ/ชื่อลูกค้า'] && row['รายการ/ชื่อลูกค้า'] !== 'ยอดยกมา')
  .map((row, idx) => ({
    id: `TRX-${Date.now()}-${idx}`,
    desc: `${row['รายการ/ชื่อลูกค้า']} ${row['ห้อง'] ? `(${row['ห้อง']})` : ''}`,
    amount: row['รับ (เข้า)'] || row['จ่าย (ออก)'] || 0,
    type: row['รับ (เข้า)'] ? 'income' : 'expense',
    date: excelDateToJS(row['วันที่']) || 'ไม่ระบุ',
    status: 'Completed',
    category: row['หมวดรายได้'] || row['หมวดรายจ่าย'] || 'อื่นๆ',
    paymentMethod: row['ช่องทางการชำระ (รับ/จ่าย)'] || 'เงินสด'
  }))
  .slice(0, 50); // Limit to recent 50 transactions

console.log(`✅ Processed ${transactions.length} transactions`);

// Extract settings
const settings = {
  companyName: 'บริษัท วิพัฒน์โฮเทล.ดีเวลอปเมนท์ จำกัด',
  address: '426 หมู่ที่9 ตำบลบึงกาฬ อำเภอเมืองบึงกาฬ จังหวัดบึงกาฬ 38000',
  phone: '080-6254859, 042-492641',
  email: 'vipathotel@gmail.com',
  taxId: '0-3855-59000-07-5',
  bookingSources: ['Walk-in', 'โทรศัพท์', 'Line', 'Booking'],
  paymentMethods: ['เงินสด', 'โอนผ่าน QR Code', 'โอนผ่านบัญชีธนาคาร', 'Booking'],
  incomeCategories: ['ค่าห้องรายวัน', 'ค่าห้องรายเดือน', 'ค่าเช่าบ้าน'],
  expenseCategories: [
    'อาหาร',
    'ค่าวัสดุสิ้นเปลือง',
    'ค่าอินเทอร์เน็ต/โทรศัพท์',
    'ค่าน้ำ/ค่าไฟ',
    'ซ่อมบำรุง / อุปกรณ์',
    'ค่าแรง / เงินเดือน',
    'การตลาด & โปรโมชัน',
    'ค่าเช่า/ภาษีโรงเรือน',
    'ค่าที่ปรึกษา/บริการวิชาชีพ',
    'อื่นๆ'
  ]
};

// Save processed data
fs.writeFileSync('./data/processed-bookings.json', JSON.stringify(bookings, null, 2));
fs.writeFileSync('./data/processed-transactions.json', JSON.stringify(transactions, null, 2));
fs.writeFileSync('./data/processed-settings.json', JSON.stringify(settings, null, 2));

console.log('\n✨ Data processing complete!');
console.log(`📁 Files saved:`);
console.log(`   - data/processed-bookings.json (${bookings.length} records)`);
console.log(`   - data/processed-transactions.json (${transactions.length} records)`);
console.log(`   - data/processed-settings.json`);
