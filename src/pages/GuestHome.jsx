import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import AIChat from '../components/AIChat';

const GuestHome = () => {
  const { rooms } = useHotel();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: 'โรงแรมวิพัฒน์กาลจักร', desc: 'พักผ่อนสบาย สไตล์ทันสมัย ใจกลางเมืองบึงกาฬ', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASk_XdzJdYBYLxY_HOOo79Gy_aGoVfttJHKKqlCUBAYk-Bgyi5xh9-dwWPKJAMQNRSilfPrUcaKbwesttpvaIwz4oWkfUYen3Argrkkrhm-qvaBp8-fhpDGqfbHm2rJU0N068tpHmRG2lY3NVsFsFOROozB79Uush30YmbvfU6iHMjDC__ZZVpusfIGIx_kwWVt_NN20_Jd5eJfb7Z9lfduQfnkmlHhLav-HKDJ8dK4aCmPcHqrUaOquMOErJvql4G3bgAYZPXocjj' },
    { title: 'ห้องพักเริ่มต้น 400.-', desc: 'สะอาด ปลอดภัย บริการเป็นกันเอง 24 ชั่วโมง', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJbVHyGYOEkQpEmdY-P1hFxj1ByMuG5mEoVLtg2_OsnROohmACxm7Jk9DPdDW0mbFm4E0X9tXmjSemXkWYhdHVsyaUzaVOMZMUdTHW0VHd-O1fJEKm0G_DeJ-pQwSg21C9ZpB7Tbu-OqJIv2yn0qpZU2dniR1NslI0P_x7vMZIAa8yQ1Ek7Jokgq9qBelSWW3ov_5SCy429sDmXJPwxvvrpUrYiZMVVEAuf2AhdphN5riOtMaRhv1EXbXrbujOdimq389BaMZLxq8I' }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(s => (s + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const roomTypes = [...new Set(rooms.map(r => r.type))];
  const getRoomTypeInfo = (type) => {
    const roomsOfType = rooms.filter(r => r.type === type);
    const availableCount = roomsOfType.filter(r => r.status === 'Available').length;
    const minPrice = Math.min(...roomsOfType.map(r => r.price));
    let image = type === 'Standard' ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDfoSpnFHftIQUJMNkddLiPu9HJ8phCc956JoN3XgGBB7qCA89H1ZZxd8wk8fNFWrMz2DESIJw9VElbBfZ_rEP-8oc0E-GVfIW68cB2AyUPv4nz70FpGI9n9jxD4gyqoh76VB4xyVelPSMpvIZneyIwRJMPVG2ALnS4cEdshhLzCnhCuPHHGBGjj98iXX65ojsp-gWBm1ef5A2zqoKCD_tiQ2mYtUac09pIUedG08a7QkXSQzthNS-i5FghooBlzen7Eb7T5rStJ7UG" : "https://lh3.googleusercontent.com/aida-public/AB6AXuAS_aGJO9cJsPLgFf6FR0fmQaCE2krrdHv15eme2CKdrwLG3XYYP7xHDJ4nOYmW95J0KZTjwviEKg4CH4AV2GWX1r98KY14sCGuWyMely-KlshuENemt3J1nK8z-NEysklr0N9vHM_25GbYSqZyR5Vh7SZvEi3mejUu5q6wr3pCiP86EFYeJShJY4vh9Qmxt-NBtsw15PMiDJldew-gZ5m-XG2E0SrfE3LjShW5wTtdERTcNukFKLHdKp6iliLdnK-VDyw1GZOA88F8";
    return { availableCount, minPrice, image };
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      
      {/* 1. Hero Banner Section */}
      <div className="relative h-[280px] md:h-[450px] w-full overflow-hidden shadow-md">
        {slides.map((slide, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`} style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url("${slide.img}")`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="flex flex-col items-start justify-end h-full px-6 pb-14 md:pb-20">
                    <h2 className="text-white text-3xl md:text-6xl font-black mb-1 drop-shadow-2xl animate-in fade-in slide-in-from-bottom-2">{slide.title}</h2>
                    <p className="text-gray-200 text-sm md:text-xl opacity-90">{slide.desc}</p>
                </div>
            </div>
        ))}
        <div className="absolute bottom-6 left-6 flex gap-2">
            {slides.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-10 bg-primary' : 'w-2 bg-white/30'}`}></div>
            ))}
        </div>
      </div>

      <div className="px-4 md:px-10 max-w-7xl mx-auto w-full flex flex-col gap-10">
        
        {/* 2. Floating Booking Widget */}
        <div className="bg-white dark:bg-surface-dark -mt-12 relative z-30 p-2 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-[#223649]">
            <div className="flex flex-row items-center gap-2">
                <div className="flex-1 flex items-center gap-3 bg-slate-50 dark:bg-[#1c2a38] px-4 py-3.5 rounded-2xl active:bg-slate-100 transition-colors">
                    <span className="material-symbols-outlined text-primary">calendar_today</span>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-400 uppercase">วันที่เข้าพัก</span>
                        <span className="text-xs font-bold">เลือกวันที่</span>
                    </div>
                </div>
                <button onClick={() => navigate('/booking')} className="bg-primary text-white size-14 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined font-black">search</span>
                </button>
            </div>
        </div>

        {/* 3. Key Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
                { icon: 'wifi', title: 'Free 5G Wi-Fi', sub: 'แรงทุกห้อง' },
                { icon: 'location_on', title: 'ใจกลางเมือง', sub: 'ติดแม่น้ำโขง' },
                { icon: 'local_parking', title: 'ที่จอดรถกว้าง', sub: 'ปลอดภัย 24 ชม.' },
                { icon: 'support_agent', title: 'บริการ 24 ชม.', sub: 'ดูแลด้วยใจ' }
            ].map((f, i) => (
                <div key={i} className="flex flex-col items-center p-4 bg-white dark:bg-[#16212b] rounded-3xl border border-slate-50 dark:border-border-dark shadow-sm">
                    <span className="material-symbols-outlined text-[28px] text-primary mb-1.5">{f.icon}</span>
                    <span className="font-black text-[10px] uppercase text-slate-900 dark:text-white">{f.title}</span>
                    <p className="text-[8px] text-slate-500 font-bold">{f.sub}</p>
                </div>
            ))}
        </div>

        {/* 4. Room Selection (Grid 2-column) */}
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end px-1">
                <div>
                    <h2 className="text-2xl font-black tracking-tight">ห้องพักว่างวันนี้</h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">ราคาดีที่สุดเริ่มต้น 400.-</p>
                </div>
                <button className="text-primary text-xs font-black underline">ดูทั้งหมด</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {roomTypes.map(type => {
                    const info = getRoomTypeInfo(type);
                    return (
                        <div key={type} className="bg-white dark:bg-surface-dark rounded-[2.5rem] overflow-hidden border border-slate-100/50 dark:border-[#223649] shadow-md flex flex-col active:scale-[0.98] transition-all">
                            <div className="h-40 overflow-hidden relative">
                                <img src={info.image} className="w-full h-full object-cover" />
                                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[8px] font-black px-2.5 py-1 rounded-full border border-white/20 uppercase tracking-widest">
                                    ว่าง {info.availableCount} ห้อง
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col gap-3">
                                <div>
                                    <h3 className="text-sm font-black truncate">{type}</h3>
                                    <p className="text-[9px] text-slate-500 font-bold mt-0.5">สิ่งอำนวยความสะดวกครบ</p>
                                    <div className="flex items-baseline gap-0.5 mt-2">
                                        <span className="text-[10px] text-primary font-black">฿</span>
                                        <span className="text-xl font-black text-primary">{info.minPrice}</span>
                                        <span className="text-[8px] text-slate-400 font-bold ml-1">/ คืน</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => navigate(`/book/${rooms.find(r => r.type === type && r.status === 'Available')?.id}`)} 
                                    className="w-full py-2.5 bg-[#1c2a38] dark:bg-primary text-white rounded-2xl text-[10px] font-black shadow-lg active:brightness-110"
                                >
                                    จองเลย
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* 5. Amenities Section */}
        <div className="bg-[#1c2a38] p-8 rounded-[3rem] text-white overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 scale-150">
                <span className="material-symbols-outlined text-[150px]">pool</span>
            </div>
            <div className="relative z-10">
                <h3 className="text-2xl font-black mb-2">สิ่งอำนวยความสะดวก</h3>
                <p className="text-slate-400 text-xs mb-6">เราเตรียมทุกอย่างไว้พร้อมสำหรับการเข้าพักของคุณ</p>
                <div className="grid grid-cols-3 gap-4">
                    {['Smart TV', 'Air Con', 'Shower', 'Coffee', 'Safe', 'Desk'].map(item => (
                        <div key={item} className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                            <span className="text-[10px] font-bold opacity-80">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* 6. Reviews Section */}
        <div className="flex flex-col gap-4">
            <h3 className="text-xl font-black px-1">รีวิวจากผู้เข้าพัก</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
                {[
                    { name: 'คุณวิภา', rating: 5, text: 'ห้องสะอาดมาก บริการดีเยี่ยมค่ะ' },
                    { name: 'สมชาย', rating: 5, text: 'ราคาประหยัด ทำเลดีมากครับ' },
                    { name: 'Lisa', rating: 4, text: 'Great stay, high speed wifi!' }
                ].map((r, i) => (
                    <div key={i} className="min-w-[240px] bg-white dark:bg-[#16212b] p-5 rounded-3xl border border-slate-100 dark:border-border-dark shadow-sm snap-center">
                        <div className="flex text-yellow-400 mb-2">
                            {[...Array(r.rating)].map((_, i) => <span key={i} className="material-symbols-outlined text-xs icon-fill">star</span>)}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 font-medium">"{r.text}"</p>
                        <p className="text-[10px] font-black">{r.name}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* 7. Location & Map Section */}
        <div className="flex flex-col gap-4">
            <h3 className="text-xl font-black px-1">ที่ตั้งของโรงแรม</h3>
            <div className="w-full h-64 rounded-[2.5rem] overflow-hidden relative shadow-lg border border-slate-200 dark:border-[#223649]">
                <img className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZmzE_F6oC6i8LwzjKUDokm99jyNkJQ9RKO8bMSWMzhig_rGyENN0h5PmbjSef-s192YqbDZLHAXhn_dXq24Rk72E8NHhmP10j2Sv8Scx5NqpzXuVWI2_M7CNxj5ix1Zbi4KHtyrpmkUKgkjgYbwWyBZdwsZ2WjZL-Mc6fqTv2qKhReHnKgjRXHREd9j7AmveoxCoKgc-bikySIdA-xat5d7ePE7mHxX7S2e7SxUFB2PzlgSbzqNj22D_8ES3kInb-cCGhmCoqSahA" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-white font-black text-lg">VIPATKANJAK HOTEL</h4>
                    <p className="text-gray-300 text-[10px] mb-3">123 ถนนแม่น้ำโขง อำเภอเมือง จังหวัดบึงกาฬ 38000</p>
                    <button className="bg-white text-black px-5 py-2 rounded-xl text-xs font-black flex items-center gap-2 active:scale-95 transition-transform">
                        <span className="material-symbols-outlined text-[18px]">directions</span> ดูเส้นทาง
                    </button>
                </div>
            </div>
        </div>

      </div>
      <AIChat />
    </div>
  );
};

export default GuestHome;
