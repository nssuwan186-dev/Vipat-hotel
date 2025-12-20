import React from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const AdminDashboard = () => {
  const { rooms, stats, transactions, updateRoomStatus } = useHotel();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'Occupied': return 'bg-red-500/20 border-red-500/30 text-red-400';
      case 'Cleaning': return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
      case 'Maintenance': return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
      default: return 'bg-surface-dark border-border-dark text-white';
    }
  };

  const handleRoomClick = (room) => {
    const statuses = ['Available', 'Occupied', 'Cleaning', 'Maintenance'];
    const currentIndex = statuses.indexOf(room.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    updateRoomStatus(room.id, nextStatus);
  };

  return (
    <div className="min-h-screen bg-[#0b1218] text-white font-display">
      <div className="py-8 px-4 md:px-10 border-b border-border-dark bg-[#101a23]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
                <Link to="/" className="p-2 bg-surface-dark rounded-lg border border-border-dark hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <div>
                    <span className="text-primary text-xs font-bold uppercase tracking-widest">Wipatkanjak Hotel</span>
                    <h2 className="text-2xl font-bold mt-1">Management Dashboard</h2>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                    AD
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-sm font-bold">Manager</p>
                    <p className="text-text-secondary text-xs">Admin Access</p>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 md:px-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="hidden lg:flex flex-col gap-2 p-4 rounded-2xl bg-surface-dark border border-border-dark h-fit sticky top-6">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-bold">
                <span className="material-symbols-outlined">dashboard</span> Dashboard
            </a>
            <Link to="/admin/rooms" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined">meeting_room</span> Room Management
            </Link>
            <Link to="/admin/finances" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined">payments</span> Manage Finances
            </Link>
            <Link to="/reports" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined">assessment</span> Reports & Stats
            </Link>
            <div className="h-px bg-border-dark my-2"></div>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined">settings</span> Settings
            </a>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-surface-dark border border-border-dark flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-3 opacity-10"><span className="material-symbols-outlined text-6xl text-primary">login</span></div>
                    <div className="flex items-center gap-2 text-text-secondary text-sm font-medium">Today's Arrivals</div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{stats.arrivals}</span>
                        <span className="text-sm text-green-500 font-bold">+{stats.walkIns} walk-ins</span>
                    </div>
                </div>
                <div className="p-5 rounded-2xl bg-surface-dark border border-border-dark flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-3 opacity-10"><span className="material-symbols-outlined text-6xl text-green-500">payments</span></div>
                    <div className="flex items-center gap-2 text-text-secondary text-sm font-medium">Daily Revenue</div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">฿{stats.revenue.toLocaleString()}</span>
                    </div>
                </div>
                <div className="p-5 rounded-2xl bg-surface-dark border border-border-dark flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-3 opacity-10"><span className="material-symbols-outlined text-6xl text-orange-400">cleaning_services</span></div>
                    <div className="flex items-center gap-2 text-text-secondary text-sm font-medium">Rooms to Clean</div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{rooms.filter(r => r.status === 'Cleaning').length}</span>
                        <span className="text-sm text-text-secondary">/ {rooms.length} Total</span>
                    </div>
                </div>
            </div>

            {/* Room Status Grid */}
            <div className="rounded-2xl bg-surface-dark border border-border-dark p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-bold text-lg">Live Room Status</h3>
                    <div className="text-xs text-text-secondary">Click room to change status</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {rooms.map(room => (
                        <button 
                            key={room.id}
                            onClick={() => handleRoomClick(room)}
                            className={`p-3 border rounded-lg text-center transition-all hover:scale-105 ${getStatusColor(room.status)}`}
                        >
                            <span className="font-bold text-sm">{room.id}</span>
                            <p className="text-[10px] opacity-80">{room.status}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Transactions Table */}
            <div className="rounded-2xl bg-surface-dark border border-border-dark overflow-hidden">
                <div className="p-6 border-b border-border-dark flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg">Recent Financials</h3>
                    <button className="px-3 py-1.5 rounded-lg bg-[#223649] text-xs text-white hover:bg-primary transition-colors">Export Report</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-text-secondary">
                        <thead className="bg-[#101a23] text-white uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4 font-bold">Transaction ID</th>
                                <th className="px-6 py-4 font-bold">Details</th>
                                <th className="px-6 py-4 font-bold">Date</th>
                                <th className="px-6 py-4 font-bold">Amount</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-dark">
                            {transactions.map((trx, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium">{trx.id}</td>
                                    <td className="px-6 py-4 text-white">{trx.desc}</td>
                                    <td className="px-6 py-4">{trx.date}</td>
                                    <td className={`px-6 py-4 font-bold ${trx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {trx.amount > 0 ? '+' : ''}฿{Math.abs(trx.amount).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                                            trx.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                                            trx.status === 'Recorded' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-orange-500/20 text-orange-400'
                                        }`}>
                                            {trx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
