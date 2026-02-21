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
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600">จำนวนการจองทั้งหมด</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">{bookings.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600">รายได้รวม</div>
            <div className="text-3xl font-bold text-green-600 mt-2">
              ฿{totalRevenue.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600">จำนวนคืนทั้งหมด</div>
            <div className="text-3xl font-bold text-purple-600 mt-2">{totalNights}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600">ราคาเฉลี่ย/การจอง</div>
            <div className="text-3xl font-bold text-orange-600 mt-2">
              ฿{avgPrice.toFixed(0)}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ค้นหาชื่อ, ห้อง, อีเมล..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="Completed">เสร็จสิ้น</option>
              <option value="Confirmed">ยืนยันแล้ว</option>
              <option value="Cancelled">ยกเลิก</option>
            </select>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            พบ {filteredBookings.length} รายการ
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ห้อง</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อลูกค้า</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ติดต่อ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-in</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">คืน</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ผู้เข้าพัก</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ราคา</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ช่องทาง</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{booking.id}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                        {booking.roomId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-900">{booking.guestName}</span>
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
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.checkIn}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {booking.nights}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.adults}ผู้ใหญ่ {booking.children > 0 && `${booking.children}เด็ก`}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-green-600">
                      ฿{booking.totalPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        {booking.marketSegment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <div className="text-sm text-gray-600">
                แสดง {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredBookings.length)} จาก {filteredBookings.length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
                        className={`px-3 py-1 rounded ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border hover:bg-gray-50'
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
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
