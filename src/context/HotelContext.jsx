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
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('vipat_user_v3')) || null);
  const [notifications, setNotifications] = useState(() => JSON.parse(localStorage.getItem('vipat_notifs_v3')) || [
    { id: 1, title: 'จองใหม่', message: 'มีการจองใหม่ห้อง A101', time: '10 นาทีที่แล้ว', read: false },
    { id: 2, title: 'การชำระเงิน', message: 'คุณสมชายชำระเงินเรียบร้อย', time: '1 ชม. ที่แล้ว', read: true }
  ]);
  const [promotions, setPromotions] = useState(() => JSON.parse(localStorage.getItem('vipat_promos_v3')) || [
    { id: 'P1', code: 'WELCOME', name: 'ส่วนลดต้อนรับ', discount: '10%', condition: 'ลูกค้าใหม่' }
  ]);
  const [theme, setTheme] = useState(() => localStorage.getItem('vipat_theme_v3') || 'dark');

  useEffect(() => {
    localStorage.setItem('vipat_rooms_v3', JSON.stringify(rooms));
    localStorage.setItem('vipat_trx_v3', JSON.stringify(transactions));
    localStorage.setItem('vipat_user_v3', JSON.stringify(user));
    localStorage.setItem('vipat_notifs_v3', JSON.stringify(notifications));
    localStorage.setItem('vipat_promos_v3', JSON.stringify(promotions));
  }, [rooms, transactions, user, notifications, promotions]);

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
  const login = (u) => setUser(u);
  const logout = () => setUser(null);
  
  const addTransaction = (trx) => setTransactions(prev => [trx, ...prev]);
  const updateRoomStatus = (id, status) => setRooms(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  
  const bookRoom = (id, guestInfo) => {
    updateRoomStatus(id, 'Occupied');
    const room = rooms.find(r => r.id === id);
    addTransaction({
        id: `TRX-${Date.now()}`,
        desc: `จองห้อง ${id} (${guestInfo.firstName})`,
        amount: room.price,
        type: 'income',
        date: new Date().toLocaleDateString('th-TH'),
        status: 'Completed'
    });
    setNotifications(prev => [{
        id: Date.now(),
        title: 'การจองใหม่',
        message: `คุณ ${guestInfo.firstName} จองห้อง ${id} สำเร็จ`,
        time: 'เมื่อสักครู่',
        read: false
    }, ...prev]);
  };

  return (
    <HotelContext.Provider value={{ 
        rooms, transactions, user, notifications, promotions,
        theme, toggleTheme,
        login, logout, addTransaction, updateRoomStatus, bookRoom,
        setRooms, setPromotions, setNotifications
    }}>
      {children}
    </HotelContext.Provider>
  );
};