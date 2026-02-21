import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Search, Filter, Calendar, User, Mail, Phone, MapPin } from 'lucide-react';

export default function BookingHistory() {
  const { bookings } = useHotel();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

  // Statistics
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalNights = bookings.reduce((sum, b) => sum + b.nights, 0);
  const avgPrice = totalRevenue / bookings.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">ประวัติการจอง</h1>
          <p className="text-gray-600 mt-1">ข้อมูลจาก Kaggle Hotel Booking Dataset</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="text-sm opacity-90">จำนวนการจองทั้งหมด</div>
            <div className="text-4xl font-bold mt-2">{bookings.length}</div>
            <div className="text-xs opacity-75 mt-1">รายการ</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="text-sm opacity-90">รายได้รวม</div>
            <div className="text-4xl font-bold mt-2">
              ฿{(totalRevenue / 1000).toFixed(0)}K
            </div>
            <div className="text-xs opacity-75 mt-1">฿{totalRevenue.toLocaleString()}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="text-sm opacity-90">จำนวนคืนทั้งหมด</div>
            <div className="text-4xl font-bold mt-2">{totalNights}</div>
            <div className="text-xs opacity-75 mt-1">คืน</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="text-sm opacity-90">ราคาเฉลี่ย/การจอง</div>
            <div className="text-4xl font-bold mt-2">
              ฿{avgPrice.toFixed(0)}
            </div>
            <div className="text-xs opacity-75 mt-1">บาท</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ค้นหาชื่อ, ห้อง, อีเมล..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium bg-white"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="Completed">เสร็จสิ้น</option>
              <option value="เช็คเอาท์แล้ว">เช็คเอาท์แล้ว</option>
              <option value="Confirmed">ยืนยันแล้ว</option>
              <option value="Cancelled">ยกเลิก</option>
            </select>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              พบ <span className="font-bold text-blue-600">{filteredBookings.length}</span> รายการ
            </div>
            <div className="text-xs text-gray-500">
              แสดง {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredBookings.length)} จาก {filteredBookings.length}
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ห้อง</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ชื่อลูกค้า</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ติดต่อ</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Check-in</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">คืน</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ผู้เข้าพัก</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ราคา</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ช่องทาง</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedBookings.map((booking, idx) => (
                  <tr key={booking.id} className={`hover:bg-blue-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{booking.id}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-bold shadow-sm">
                        {booking.roomId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{booking.guestName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {booking.email && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Mail size={12} />
                            <span className="truncate max-w-[150px]">{booking.email}</span>
                          </div>
                        )}
                        {booking.phone && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Phone size={12} />
                            <span>{booking.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                      {booking.checkIn}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-sm font-bold">
                        {booking.nights}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.adults}ผู้ใหญ่ {booking.children > 0 && `${booking.children}เด็ก`}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">
                      ฿{booking.totalPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                        {booking.marketSegment || booking.source}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-200 flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">
                แสดง <span className="text-blue-600 font-bold">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredBookings.length)}</span> จาก <span className="text-blue-600 font-bold">{filteredBookings.length}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 hover:border-gray-400 transition-all font-medium"
                >
                  ก่อนหน้า
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                            : 'border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 hover:border-gray-400 transition-all font-medium"
                >
                  ถัดไป
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
