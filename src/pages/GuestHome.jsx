import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import AIChat from '../components/AIChat';

const GuestHome = () => {
  const { rooms } = useHotel();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { 
        title: 'โรงแรมวิพัฒน์กาลจักร บึงกาฬ', 
        desc: 'สัมผัสประสบการณ์การพักผ่อนระดับพรีเมียม ใจกลางเมือง', 
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASk_XdzJdYBYLxY_HOOo79Gy_aGoVfttJHKKqlCUBAYk-Bgyi5xh9-dwWPKJAMQNRSilfPrUcaKbwesttpvaIwz4oWkfUYen3Argrkkrhm-qvaBp8-fhpDGqfbHm2rJU0N068tpHmRG2lY3NVsFsFOROozB79Uush30YmbvfU6iHMjDC__ZZVpusfIGIx_kwWVt_NN20_Jd5eJfb7Z9lfduQfnkmlHhLav-HKDJ8dK4aCmPcHqrUaOquMOErJvql4G3bgAYZPXocjj' 
    },
    { 
        title: 'ห้องพักปรับปรุงใหม่ 51 ห้อง', 
        desc: 'ครบครันด้วยสิ่งอำนวยความสะดวก พร้อม Smart TV และ Wi-Fi 5G', 
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJbVHyGYOEkQpEmdY-P1hFxj1ByMuG5mEoVLtg2_OsnROohmACxm7Jk9DPdDW0mbFm4E0X9tXmjSemXkWYhdHVsyaUzaVOMZMUdTHW0VHd-O1fJEKm0G_DeJ-pQwSg21C9ZpB7Tbu-OqJIv2yn0qpZU2dniR1NslI0P_x7vMZIAa8yQ1Ek7Jokgq9qBelSWW3ov_5SCy429sDmXJPwxvvrpUrYiZMVVEAuf2AhdphN5riOtMaRhv1EXbXrbujOdimq389BaMZLxq8I' 
    }
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
    
    let image = "https://lh3.googleusercontent.com/aida-public/AB6AXuAS_aGJO9cJsPLgFf6FR0fmQaCE2krrdHv15eme2CKdrwLG3XYYP7xHDJ4nOYmW95J0KZTjwviEKg4CH4AV2GWX1r98KY14sCGuWyMely-KlshuENemt3J1nK8z-NEysklr0N9vHM_25GbYSqZyR5Vh7SZvEi3mejUu5q6wr3pCiP86EFYeJShJY4vh9Qmxt-NBtsw15PMiDJldew-gZ5m-XG2E0SrfE3LjShW5wTtdERTcNukFKLHdKp6iliLdnK-VDyw1GZOA88F8"; 
    if (type === 'Standard') {
        image = "https://lh3.googleusercontent.com/aida-public/AB6AXuDfoSpnFHftIQUJMNkddLiPu9HJ8phCc956JoN3XgGBB7qCA89H1ZZxd8wk8fNFWrMz2DESIJw9VElbBfZ_rEP-8oc0E-GVfIW68cB2AyUPv4nz70FpGI9n9jxD4gyqoh76VB4xyVelPSMpvIZneyIwRJMPVG2ALnS4cEdshhLzCnhCuPHHGBGjj98iXX65ojsp-gWBm1ef5A2zqoKCD_tiQ2mYtUac09pIUedG08a7QkXSQzthNS-i5FghooBlzen7Eb7T5rStJ7UG";
    }
    return { availableCount, minPrice, image };
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Dynamic Slide Banner */}
      <div className="relative h-[450px] w-full overflow-hidden lg:rounded-b-3xl">
        {slides.map((slide, idx) => (
            <div 
                key={idx} 
                className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url("${slide.img}")`, backgroundSize: 'cover', backgroundPosition: 'center'}}
            >
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                    <h2 className="text-white text-4xl md:text-6xl font-black mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">{slide.title}</h2>
                    <p className="text-gray-200 text-lg md:text-xl max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000">{slide.desc}</p>
                </div>
            </div>
        ))}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/50'}`}></div>
            ))}
        </div>
      </div>

      <div className="px-4 md:px-10 max-w-7xl mx-auto w-full flex flex-col gap-12">
        
        {/* Booking Search Widget (Gen Z style) */}
        <div className="bg-white dark:bg-surface-dark -mt-20 relative z-30 p-2 rounded-3xl shadow-2xl border border-slate-100 dark:border-[#223649]">
            <div className="flex flex-col md:flex-row gap-2 p-2">
                <div className="flex-1 flex items-center gap-4 bg-slate-50 dark:bg-[#1c2a38] px-6 py-4 rounded-2xl">
                    <span className="material-symbols-outlined text-primary">calendar_today</span>
                    <div className="flex flex-col"><span className="text-[10px] font-bold text-slate-400 uppercase">วันที่เข้าพัก</span><span className="text-sm font-bold">เลือกวันที่</span></div>
                </div>
                <div className="flex-1 flex items-center gap-4 bg-slate-50 dark:bg-[#1c2a38] px-6 py-4 rounded-2xl">
                    <span className="material-symbols-outlined text-primary">group</span>
                    <div className="flex flex-col"><span className="text-[10px] font-bold text-slate-400 uppercase">ผู้เข้าพัก</span><span className="text-sm font-bold">2 ท่าน</span></div>
                </div>
                <button className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-primary/30 hover:bg-blue-600 transition-all">ค้นหาห้องว่าง</button>
            </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { icon: 'wifi', title: 'Free Wi-Fi 5G' },
                { icon: 'location_on', title: 'ใจกลางเมือง' },
                { icon: 'local_parking', title: 'ที่จอดรถ 24 ชม.' },
                { icon: 'support_agent', title: 'บริการ 24 ชม.' }
            ].map((f, i) => (
                <div key={i} className="flex flex-col items-center p-6 bg-white dark:bg-surface-dark rounded-3xl border border-slate-100 dark:border-border-dark shadow-sm hover:border-primary transition-all group">
                    <span className="material-symbols-outlined text-4xl text-primary mb-2 group-hover:scale-110 transition-transform">{f.icon}</span>
                    <span className="font-bold text-sm">{f.title}</span>
                </div>
            ))}
        </div>

        {/* Room Types */}
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end">
                <div><h2 className="text-3xl font-black">เลือกห้องพักที่ใช่สำหรับคุณ</h2><p className="text-slate-500">มีบริการทั้งหมด 51 ห้อง ครบทุกสไตล์</p></div>
                <button className="text-primary font-bold hover:underline">ดูทั้งหมด</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {roomTypes.map(type => {
                    const info = getRoomTypeInfo(type);
                    return (
                        <div key={type} className="flex flex-col md:flex-row bg-white dark:bg-surface-dark rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-[#223649] shadow-sm hover:shadow-2xl transition-all group">
                            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                                <img src={info.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="p-8 flex flex-col justify-between md:w-1/2">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-black">{type}</h3>
                                        <div className="bg-green-100 dark:bg-green-900/30 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold">ว่าง {info.availableCount} ห้อง</div>
                                    </div>
                                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">สิ่งอำนวยความสะดวกครบครัน สบายเหมือนอยู่บ้าน พร้อมวิวเมืองบึงกาฬสวยงาม</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-bold">ราคาเริ่มต้น</span><span className="text-2xl font-black text-primary">฿{info.minPrice}</span></div>
                                    <button onClick={() => navigate(`/book/${rooms.find(r => r.type === type && r.status === 'Available')?.id}`)} className="bg-[#1c2a38] text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary transition-all">จองเลย</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

      </div>
      <AIChat />
    </div>
  );
};

export default GuestHome;