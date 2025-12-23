import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const ManageRooms = () => {
  const { rooms, deleteRoom, addRoom, updateRoomStatus } = useHotel(); // Add updateRoomStatus
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoom, setNewRoom] = useState({ id: '', type: 'Standard', price: 400, status: 'Available' });
  const [mode, setMode] = useState('management'); // management | housekeeping

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newRoom.id && newRoom.price) {
        addRoom(newRoom);
        setShowAddModal(false);
        setNewRoom({ id: '', type: 'Standard', price: 400, status: 'Available' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Occupied': return 'bg-primary/10 text-primary border-primary/20';
      case 'Cleaning': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Maintenance': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  const cycleStatus = (id, currentStatus) => {
    const sequence = ['Occupied', 'Cleaning', 'Available', 'Maintenance'];
    // Simple logic: cleaning -> available is the most common action for housekeeping
    if (currentStatus === 'Occupied') updateRoomStatus(id, 'Cleaning');
    else if (currentStatus === 'Cleaning') updateRoomStatus(id, 'Available');
    else if (currentStatus === 'Available') updateRoomStatus(id, 'Maintenance');
    else updateRoomStatus(id, 'Available');
  };

  return (
    <div className="p-4 md:p-10 max-w-[1200px] mx-auto flex flex-col gap-6 text-slate-900 dark:text-white pb-24">
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-2xl font-black">จัดการห้องพัก</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">ทั้งหมด {rooms.length} ห้อง</p>
        </div>
        <div className="flex gap-2">
            <button onClick={() => setMode('management')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'management' ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 dark:bg-[#1c2a38] text-slate-500'}`}>Admin</button>
            <button onClick={() => setMode('housekeeping')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'housekeeping' ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-[#1c2a38] text-slate-500'}`}>แม่บ้าน</button>
            {mode === 'management' && (
                <button onClick={() => setShowAddModal(true)} className="size-10 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shadow-lg"><span className="material-symbols-outlined">add</span></button>
            )}
        </div>
      </div>

      {mode === 'housekeeping' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {rooms.map(room => (
                <button 
                    key={room.id} 
                    onClick={() => cycleStatus(room.id, room.status)}
                    className={`p-6 rounded-3xl border-2 flex flex-col items-center justify-center gap-2 aspect-square transition-all active:scale-95 ${getStatusColor(room.status)}`}
                >
                    <span className="text-3xl font-black">{room.id}</span>
                    <span className="text-xs font-bold uppercase px-2 py-1 rounded-full bg-white/50">{room.status}</span>
                    {room.status === 'Cleaning' && <span className="material-symbols-outlined animate-spin">autorenew</span>}
                </button>
            ))}
        </div>
      ) : (
        <>
        {/* Mobile Card View (Visible on Small Screens) */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
        {rooms.map(room => (
            <div key={room.id} className="bg-white dark:bg-[#16212b] p-4 rounded-[2rem] border border-slate-200 dark:border-[#223649] flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary text-lg">{room.id}</div>
                    <div>
                        <p className="font-bold text-sm">{room.type}</p>
                        <p className="text-primary font-black text-xs">฿{room.price}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {room.status === 'Available' && (
                        <Link to={`/admin/book/${room.id}`} className="p-2 text-primary">
                            <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
                        </Link>
                    )}
                    <span className={`text-[8px] font-black px-2 py-1 rounded-full border ${getStatusColor(room.status)}`}>{room.status === 'Available' ? 'ว่าง' : 'ไม่ว่าง'}</span>
                    <button onClick={() => deleteRoom(room.id)} className="p-2 text-red-500"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                </div>
            </div>
        ))}
      </div>

      {/* Desktop Table View (Visible on Large Screens) */}
      <div className="hidden md:block overflow-hidden rounded-3xl border border-slate-200 dark:border-[#223649] bg-white dark:bg-[#16212b]">
        <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-[#1c2a38] text-slate-500 dark:text-slate-400 text-xs">
                <tr>
                    <th className="p-4">หมายเลข</th>
                    <th className="p-4">ประเภท</th>
                    <th className="p-4">สถานะ</th>
                    <th className="p-4">ราคา</th>
                    <th className="p-4 text-right">จัดการ</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-[#223649]">
                {rooms.map(room => (
                    <tr key={room.id}>
                        <td className="p-4 font-bold">{room.id}</td>
                        <td className="p-4">{room.type}</td>
                        <td className="p-4"><span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(room.status)}`}>{room.status}</span></td>
                        <td className="p-4 font-black">฿{room.price}</td>
                        <td className="p-4 text-right flex justify-end gap-2">
                            {room.status === 'Available' && (
                                <Link to={`/admin/book/${room.id}`} className="text-primary hover:bg-primary/10 p-1 rounded-full"><span className="material-symbols-outlined">calendar_add_on</span></Link>
                            )}
                            <button onClick={() => deleteRoom(room.id)} className="text-red-500 hover:bg-red-500/10 p-1 rounded-full"><span className="material-symbols-outlined">delete</span></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      </>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
            <div className="bg-white dark:bg-[#16212b] p-8 rounded-t-[3rem] sm:rounded-3xl w-full max-w-md border-t sm:border border-slate-200 dark:border-[#223649] animate-in slide-in-from-bottom duration-300">
                <h3 className="text-xl font-black mb-6">เพิ่มห้องพักใหม่</h3>
                <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
                    <input required className="bg-slate-100 dark:bg-[#1c2a38] border-none rounded-2xl h-14 px-6 text-slate-900 dark:text-white" value={newRoom.id} onChange={e => setNewRoom({...newRoom, id: e.target.value})} placeholder="หมายเลขห้อง" />
                    <select className="bg-slate-100 dark:bg-[#1c2a38] border-none rounded-2xl h-14 px-6 text-slate-900 dark:text-white" value={newRoom.type} onChange={e => setNewRoom({...newRoom, type: e.target.value})}>
                        <option>Standard</option>
                        <option>Standard Twin</option>
                    </select>
                    <input required type="number" className="bg-slate-100 dark:bg-[#1c2a38] border-none rounded-2xl h-14 px-6 text-slate-900 dark:text-white" value={newRoom.price} onChange={e => setNewRoom({...newRoom, price: Number(e.target.value)})} placeholder="ราคาต่อคืน" />
                    <div className="flex gap-3 mt-4">
                        <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-4 rounded-2xl text-slate-500 font-bold">ยกเลิก</button>
                        <button type="submit" className="flex-1 py-4 rounded-2xl bg-primary text-slate-900 dark:text-white font-black shadow-lg shadow-primary/20">บันทึก</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default ManageRooms;