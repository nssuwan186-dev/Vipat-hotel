import React, { createContext, useContext, useState, useEffect } from 'react';

const HotelContext = createContext();
export const useHotel = () => useContext(HotelContext);

export const HotelProvider = ({ children }) => {
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

  // Persistent States
  const [rooms, setRooms] = useState(() => JSON.parse(localStorage.getItem('vipat_rooms_v3')) || DEFAULT_ROOMS);
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('vipat_trx_v3')) || []);
  const [notifications, setNotifications] = useState(() => JSON.parse(localStorage.getItem('vipat_notifs_v3')) || [
    { id: 1, title: 'จองใหม่', message: 'มีการจองใหม่ห้อง A101', time: '10 นาทีที่แล้ว', read: false },
    { id: 2, title: 'การชำระเงิน', message: 'คุณสมชายชำระเงินเรียบร้อย', time: '1 ชม. ที่แล้ว', read: true }
  ]);
  const [promotions, setPromotions] = useState(() => JSON.parse(localStorage.getItem('vipat_promos_v3')) || [
    { id: 'P1', code: 'WELCOME', name: 'ส่วนลดต้อนรับ', discount: '10%', condition: 'ลูกค้าใหม่' }
  ]);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('vipat_user_session_v3')) || null);
  const [logs, setLogs] = useState(() => JSON.parse(localStorage.getItem('vipat_logs_v3')) || []);
  const [theme, setTheme] = useState(() => localStorage.getItem('vipat_theme_v3') || 'dark');

  useEffect(() => {
    localStorage.setItem('vipat_rooms_v3', JSON.stringify(rooms));
    localStorage.setItem('vipat_trx_v3', JSON.stringify(transactions));
    localStorage.setItem('vipat_notifs_v3', JSON.stringify(notifications));
    localStorage.setItem('vipat_promos_v3', JSON.stringify(promotions));
    localStorage.setItem('vipat_user_session_v3', JSON.stringify(user));
    localStorage.setItem('vipat_logs_v3', JSON.stringify(logs));
  }, [rooms, transactions, notifications, promotions, user, logs]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('vipat_theme_v3', theme);
  }, [theme]);

  // Actions
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const addLog = (action, details) => {
    const newLog = {
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: user ? user.name : 'System',
        role: user ? user.role : 'System',
        action,
        details
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const login = (userData) => {
    setUser(userData);
    addLog('LOGIN', `User ${userData.name} logged in`);
  };

  const logout = () => {
    addLog('LOGOUT', `User ${user?.name} logged out`);
    setUser(null);
  };
  
  const addTransaction = (trx) => {
    setTransactions(prev => [trx, ...prev]);
    addLog('ADD_TRANSACTION', `Created transaction ${trx.id} (${trx.desc})`);
  };

  const updateRoomStatus = (id, status) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    addLog('UPDATE_ROOM', `Changed room ${id} status to ${status}`);
  };
  
  const bookRoom = (id, guestInfo) => {
    updateRoomStatus(id, 'Occupied');
    const roomRate = guestInfo.totalPrice || 0;
    
    // Initial Charge (Room Rent)
    const initialCharges = [{
        id: `CHG-${Date.now()}`,
        desc: `ค่าห้องพัก (${guestInfo.nights} คืน)`,
        amount: roomRate,
        date: new Date().toLocaleDateString('th-TH')
    }];

    addTransaction({
        id: `TRX-${Date.now()}`,
        desc: `จองห้อง ${id} (${guestInfo.firstName} ${guestInfo.lastName})`,
        amount: roomRate, // Total amount
        charges: initialCharges, // Itemized charges
        type: 'income',
        date: new Date().toLocaleDateString('th-TH'),
        status: 'Unpaid', // Default to Unpaid until settled
        roomNo: id,
        checkIn: guestInfo.checkIn,
        checkOut: guestInfo.checkOut,
        customerName: `${guestInfo.firstName} ${guestInfo.lastName}`,
        customerPhone: guestInfo.phone,
        customerAddress: guestInfo.address || '-'
    });
    
    setNotifications(prev => [{
        id: Date.now(),
        title: 'การจองใหม่',
        message: `คุณ ${guestInfo.firstName} จองห้อง ${id}`,
        time: 'เมื่อสักครู่',
        read: false
    }, ...prev]);

    addLog('BOOK_ROOM', `Booked room ${id} for customer ${guestInfo.firstName} ${guestInfo.lastName}`);
  };

  const addChargeToBooking = (trxId, chargeItem) => {
    setTransactions(prev => prev.map(t => {
        if (t.id === trxId) {
            const newCharges = [...(t.charges || []), { ...chargeItem, id: `CHG-${Date.now()}` }];
            const newTotal = newCharges.reduce((sum, c) => sum + c.amount, 0);
            return { ...t, charges: newCharges, amount: newTotal };
        }
        return t;
    }));
    addLog('ADD_CHARGE', `Added charge "${chargeItem.desc}" to transaction ${trxId}`);
  };

  const deleteRoom = (id) => {
    setRooms(prev => prev.filter(r => r.id !== id));
    addLog('DELETE_ROOM', `Deleted room ${id}`);
  };

  const addRoom = (room) => {
    setRooms(prev => [...prev, room]);
    addLog('ADD_ROOM', `Added new room ${room.id} (${room.type})`);
  };

  const updateBooking = (trxId, newData) => {
    setTransactions(prev => prev.map(t => 
        t.id === trxId ? { ...t, ...newData } : t
    ));
    addLog('UPDATE_BOOKING', `Updated booking info for transaction ${trxId}`);
  };

  const cancelBooking = (trxId, roomId) => {
    setTransactions(prev => prev.filter(t => t.id !== trxId));
    if (roomId) updateRoomStatus(roomId, 'Available');
    addLog('CANCEL_BOOKING', `Cancelled booking ${trxId} and freed room ${roomId}`);
  };

  return (
    <HotelContext.Provider value={{ 
        rooms, transactions, notifications, promotions, user, logs,
        theme, toggleTheme,
        login, logout, addLog,
        addTransaction, updateRoomStatus, bookRoom,
        setRooms, setPromotions, setNotifications,
        deleteRoom, addRoom,
        updateBooking, cancelBooking, addChargeToBooking
    }}>
      {children}
    </HotelContext.Provider>
  );
};
