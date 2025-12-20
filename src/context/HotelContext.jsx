import React, { createContext, useContext, useState, useEffect } from 'react';

const HotelContext = createContext();

export const useHotel = () => useContext(HotelContext);

export const HotelProvider = ({ children }) => {
  // --- Initial Data Constants ---
  // --- Initial Data Constants ---
  // ข้อมูลชุดจริงจากเจ้าของโรงแรม (บังคับใช้ชุดนี้)
  const DEFAULT_ROOMS = [
    // ตึก A ชั้น 1 (Standard 400, Twin 500)
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
    // ตึก A ชั้น 2 (Standard 400)
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
    // ตึก B ชั้น 1 (Standard 400, B111 Twin 500)
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
    // ตึก B ชั้น 2 (Standard 400)
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
    // ตึก N (Standard 500, Twin 600)
    { id: 'N1', type: 'Standard Twin', price: 600, status: 'Available', floor: 3 },
    { id: 'N2', type: 'Standard', price: 500, status: 'Available', floor: 3 },
    { id: 'N3', type: 'Standard', price: 500, status: 'Available', floor: 3 },
    { id: 'N4', type: 'Standard Twin', price: 600, status: 'Available', floor: 3 },
    { id: 'N5', type: 'Standard Twin', price: 600, status: 'Available', floor: 3 },
    { id: 'N6', type: 'Standard Twin', price: 600, status: 'Available', floor: 3 },
    { id: 'N7', type: 'Standard', price: 500, status: 'Available', floor: 3 },
  ];

  const DEFAULT_TRANSACTIONS = []; // เริ่มต้นไม่มีรายการ

  const DEFAULT_STATS = {
    arrivals: 0,
    walkIns: 0,
    revenue: 0,
    cleaning: 0,
    totalCleaning: 51
  };

  const DEFAULT_PROMOTIONS = [
    { id: 'PROMO-001', code: 'WELCOME10', name: 'ส่วนลดต้อนรับ', discount: '10%', condition: 'ลูกค้าใหม่' },
  ];

  // --- State Initialization (เปลี่ยน Key เป็น v2 เพื่อล้างข้อมูลเก่าทิ้งทันที) ---
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('hotel_rooms_v2');
    return saved ? JSON.parse(saved) : DEFAULT_ROOMS;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('hotel_transactions_v2');
    return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('hotel_stats_v2');
    return saved ? JSON.parse(saved) : DEFAULT_STATS;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('hotel_user_v2');
    return saved ? JSON.parse(saved) : null;
  });

  const [promotions, setPromotions] = useState(() => {
    const saved = localStorage.getItem('hotel_promotions_v2');
    return saved ? JSON.parse(saved) : DEFAULT_PROMOTIONS;
  });

  // --- Persistence Effects (บันทึกด้วย Key ใหม่ v2) ---
  useEffect(() => localStorage.setItem('hotel_rooms_v2', JSON.stringify(rooms)), [rooms]);
  useEffect(() => localStorage.setItem('hotel_transactions_v2', JSON.stringify(transactions)), [transactions]);
  useEffect(() => localStorage.setItem('hotel_stats_v2', JSON.stringify(stats)), [stats]);
  useEffect(() => localStorage.setItem('hotel_user_v2', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('hotel_promotions_v2', JSON.stringify(promotions)), [promotions]);


  // --- Actions ---
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const bookRoom = (roomId) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, status: 'Occupied' } : room
    ));
    setStats(prev => ({
      ...prev,
      revenue: prev.revenue + rooms.find(r => r.id === roomId).price
    }));
  };

  const updateRoomStatus = (roomId, newStatus) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    ));
  };

  const addRoom = (newRoom) => {
    setRooms(prev => [...prev, newRoom]);
  };

  const deleteRoom = (roomId) => {
    if(confirm('Are you sure you want to delete this room?')) {
        setRooms(prev => prev.filter(r => r.id !== roomId));
    }
  };

  const editRoom = (roomId, updatedData) => {
    setRooms(prev => prev.map(room => 
        room.id === roomId ? { ...room, ...updatedData } : room
    ));
  };

  const addTransaction = (newTrx) => {
    setTransactions(prev => [newTrx, ...prev]);
  };

  return (
    <HotelContext.Provider value={{ rooms, transactions, stats, user, login, logout, bookRoom, updateRoomStatus, addRoom, deleteRoom, editRoom, addTransaction, promotions }}>
      {children}
    </HotelContext.Provider>
  );
};
