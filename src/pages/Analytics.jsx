import React, { useMemo } from 'react';
import { useHotel } from '../context/HotelContext';
import { TrendingUp, Users, DollarSign, Calendar, PieChart, BarChart3 } from 'lucide-react';

export default function Analytics() {
  const { bookings, rooms } = useHotel();

  // Calculate analytics
  const analytics = useMemo(() => {
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const totalNights = bookings.reduce((sum, b) => sum + (b.nights || 0), 0);
    const avgPrice = totalRevenue / bookings.length;
    const avgNights = totalNights / bookings.length;

    // Room usage
    const roomUsage = {};
    bookings.forEach(b => {
      roomUsage[b.roomId] = (roomUsage[b.roomId] || 0) + 1;
    });

    // Monthly revenue
    const monthlyRevenue = {};
    bookings.forEach(b => {
      if (b.checkIn) {
        const month = b.checkIn.substring(0, 7); // YYYY-MM
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + (b.totalPrice || 0);
      }
    });

    // Market segments
    const segments = {};
    bookings.forEach(b => {
      const seg = b.marketSegment || b.source || 'Direct';
      segments[seg] = (segments[seg] || 0) + 1;
    });

    // Status distribution
    const statusDist = {};
    bookings.forEach(b => {
      const status = b.status || 'Completed';
      statusDist[status] = (statusDist[status] || 0) + 1;
    });

    // Occupancy rate
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
    const occupancyRate = (occupiedRooms / totalRooms) * 100;

    return {
      totalRevenue,
      totalNights,
      avgPrice,
      avgNights,
      roomUsage,
      monthlyRevenue,
      segments,
      statusDist,
      occupancyRate,
      totalRooms,
      occupiedRooms
    };
  }, [bookings, rooms]);

  const topRooms = Object.entries(analytics.roomUsage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const monthlyData = Object.entries(analytics.monthlyRevenue)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-6);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">การวิเคราะห์ข้อมูล</h1>
          <p className="text-gray-600 mt-1">สถิติและข้อมูลเชิงลึกของโรงแรม</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <DollarSign size={32} />
              <span className="text-sm opacity-80">รายได้รวม</span>
            </div>
            <div className="text-3xl font-bold">฿{analytics.totalRevenue.toLocaleString()}</div>
            <div className="text-sm opacity-80 mt-1">จาก {bookings.length} การจอง</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp size={32} />
              <span className="text-sm opacity-80">ราคาเฉลี่ย</span>
            </div>
            <div className="text-3xl font-bold">฿{analytics.avgPrice.toFixed(0)}</div>
            <div className="text-sm opacity-80 mt-1">ต่อการจอง</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Calendar size={32} />
              <span className="text-sm opacity-80">จำนวนคืน</span>
            </div>
            <div className="text-3xl font-bold">{analytics.totalNights.toLocaleString()}</div>
            <div className="text-sm opacity-80 mt-1">เฉลี่ย {analytics.avgNights.toFixed(1)} คืน/การจอง</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Users size={32} />
              <span className="text-sm opacity-80">อัตราการเข้าพัก</span>
            </div>
            <div className="text-3xl font-bold">{analytics.occupancyRate.toFixed(1)}%</div>
            <div className="text-sm opacity-80 mt-1">{analytics.occupiedRooms}/{analytics.totalRooms} ห้อง</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Rooms */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">ห้องที่ถูกจองมากที่สุด</h2>
            </div>
            <div className="space-y-3">
              {topRooms.map(([room, count], index) => {
                const maxCount = topRooms[0][1];
                const percentage = (count / maxCount) * 100;
                return (
                  <div key={room}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-700">
                        #{index + 1} ห้อง {room}
                      </span>
                      <span className="text-sm font-bold text-blue-600">{count} ครั้ง</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Market Segments */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="text-green-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">ช่องทางการจอง</h2>
            </div>
            <div className="space-y-3">
              {Object.entries(analytics.segments)
                .sort((a, b) => b[1] - a[1])
                .map(([segment, count]) => {
                  const percentage = (count / bookings.length) * 100;
                  return (
                    <div key={segment}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-700">{segment}</span>
                        <span className="text-sm font-bold text-green-600">
                          {count} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-purple-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">รายได้รายเดือน (6 เดือนล่าสุด)</h2>
          </div>
          <div className="flex items-end justify-between gap-4 h-64">
            {monthlyData.map(([month, revenue]) => {
              const maxRevenue = Math.max(...monthlyData.map(d => d[1]));
              const height = (revenue / maxRevenue) * 100;
              return (
                <div key={month} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex items-end justify-center h-full">
                    <div
                      className="w-full bg-gradient-to-t from-purple-500 to-purple-600 rounded-t-lg transition-all hover:from-purple-600 hover:to-purple-700 cursor-pointer relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        ฿{revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2 font-medium">{month}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-orange-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">สถานะการจอง</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(analytics.statusDist).map(([status, count]) => {
              const percentage = (count / bookings.length) * 100;
              const colors = {
                'Completed': 'bg-green-100 text-green-800 border-green-300',
                'เช็คเอาท์แล้ว': 'bg-green-100 text-green-800 border-green-300',
                'Confirmed': 'bg-blue-100 text-blue-800 border-blue-300',
                'Cancelled': 'bg-red-100 text-red-800 border-red-300',
                'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-300'
              };
              const colorClass = colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
              
              return (
                <div key={status} className={`border-2 rounded-lg p-4 ${colorClass}`}>
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm font-medium mt-1">{status}</div>
                  <div className="text-xs mt-1">{percentage.toFixed(1)}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
