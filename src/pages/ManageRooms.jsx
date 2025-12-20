import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const ManageRooms = () => {
  const { rooms, deleteRoom, addRoom } = useHotel();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoom, setNewRoom] = useState({ id: '', type: 'Standard', price: 1000, status: 'Available' });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newRoom.id && newRoom.price) {
        addRoom(newRoom);
        setShowAddModal(false);
        setNewRoom({ id: '', type: 'Standard', price: 1000, status: 'Available' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 ring-green-600/20';
      case 'Occupied': return 'bg-primary/10 text-primary ring-primary/20';
      case 'Maintenance': return 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 ring-amber-600/20';
      case 'Cleaning': return 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 ring-orange-600/20';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 ring-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white">
      {/* Admin Header (Simplified for this view) */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e7edf3] dark:border-gray-800 bg-white dark:bg-[#1a2634] px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h2 className="text-lg font-bold">จัดการห้องพัก</h2>
        </div>
        <div className="flex gap-4 items-center">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                <Link to="/admin" className="text-gray-500 hover:text-primary">แดชบอร์ด</Link>
                <Link to="/admin/rooms" className="text-primary font-bold">ห้องพัก</Link>
                <Link to="/admin/finances" className="text-gray-500 hover:text-primary">บัญชี</Link>
                <Link to="/reports" className="text-gray-500 hover:text-primary">รายงาน</Link>
            </div>
            <button className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-100 dark:bg-gray-700 text-gray-500">
                <span className="material-symbols-outlined">notifications</span>
            </button>
        </div>
      </header>

      <div className="p-6 md:px-12 lg:px-20 max-w-[1200px] mx-auto flex flex-col gap-6">
        
        {/* Actions */}
        <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black">รายการห้องพักทั้งหมด</h1>
                <p className="text-gray-500 dark:text-gray-400">จัดการข้อมูลห้องพักและราคา</p>
            </div>
            <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary hover:bg-blue-600 text-white text-sm font-bold shadow-md transition-all"
            >
                <span className="material-symbols-outlined text-[20px]">add</span>
                เพิ่มห้องใหม่
            </button>
        </div>

        {/* Room Table */}
        <div className="overflow-hidden rounded-xl border border-[#cfdbe7] dark:border-gray-700 bg-white dark:bg-[#1a2634] shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#f8fafc] dark:bg-gray-800/50 border-b border-[#cfdbe7] dark:border-gray-700">
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500 w-16">#</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">หมายเลขห้อง</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">ประเภท</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">สถานะ</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">ราคา</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7edf3] dark:divide-gray-700">
                        {rooms.map((room, idx) => (
                            <tr key={room.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="p-4 text-gray-500">{idx + 1}</td>
                                <td className="p-4">
                                    <span className="font-bold">{room.id}</span>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10">
                                        {room.type}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(room.status)}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${room.status === 'Available' ? 'bg-green-500' : room.status === 'Occupied' ? 'bg-primary' : 'bg-amber-500'}`}></span>
                                        {room.status === 'Available' ? 'ว่าง' : room.status === 'Occupied' ? 'มีแขกพัก' : 'ปิดซ่อม'}
                                    </span>
                                </td>
                                <td className="p-4 font-medium">฿{room.price.toLocaleString()}</td>
                                <td className="p-4 text-right">
                                    <button 
                                        onClick={() => deleteRoom(room.id)}
                                        className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-600 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* Add Room Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#1a2634] p-6 rounded-2xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4">เพิ่มห้องพักใหม่</h3>
                <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
                    <label>
                        <span className="text-sm font-medium text-gray-500">หมายเลขห้อง</span>
                        <input required className="form-input w-full rounded-lg mt-1 dark:bg-gray-800 dark:border-gray-600" value={newRoom.id} onChange={e => setNewRoom({...newRoom, id: e.target.value})} placeholder="เช่น A101" />
                    </label>
                    <label>
                        <span className="text-sm font-medium text-gray-500">ประเภท</span>
                        <select className="form-select w-full rounded-lg mt-1 dark:bg-gray-800 dark:border-gray-600" value={newRoom.type} onChange={e => setNewRoom({...newRoom, type: e.target.value})}>
                            <option>Standard</option>
                            <option>Standard Twin</option>
                        </select>
                    </label>
                    <label>
                        <span className="text-sm font-medium text-gray-500">ราคา (฿)</span>
                        <input required type="number" className="form-input w-full rounded-lg mt-1 dark:bg-gray-800 dark:border-gray-600" value={newRoom.price} onChange={e => setNewRoom({...newRoom, price: Number(e.target.value)})} />
                    </label>
                    <div className="flex gap-3 mt-4">
                        <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 font-bold hover:bg-gray-50 dark:hover:bg-gray-700">ยกเลิก</button>
                        <button type="submit" className="flex-1 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/30">บันทึกข้อมูล</button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
};

export default ManageRooms;
