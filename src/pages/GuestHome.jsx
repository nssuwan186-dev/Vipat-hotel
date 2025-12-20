import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChat from '../components/AIChat';
import { useHotel } from '../context/HotelContext';

const GuestHome = () => {
  const { rooms } = useHotel();
  const navigate = useNavigate();

  // Group rooms by type to display unique cards
  const roomTypes = [...new Set(rooms.map(r => r.type))];
  
  const getRoomTypeInfo = (type) => {
    const roomsOfType = rooms.filter(r => r.type === type);
    const availableCount = roomsOfType.filter(r => r.status === 'Available').length;
    const minPrice = Math.min(...roomsOfType.map(r => r.price));
    
    // Assign images based on type (Placeholder logic)
    let image = "https://lh3.googleusercontent.com/aida-public/AB6AXuAS_aGJO9cJsPLgFf6FR0fmQaCE2krrdHv15eme2CKdrwLG3XYYP7xHDJ4nOYmW95J0KZTjwviEKg4CH4AV2GWX1r98KY14sCGuWyMely-KlshuENemt3J1nK8z-NEysklr0N9vHM_25GbYSqZyR5Vh7SZvEi3mejUu5q6wr3pCiP86EFYeJShJY4vh9Qmxt-NBtsw15PMiDJldew-gZ5m-XG2E0SrfE3LjShW5wTtdERTcNukFKLHdKp6iliLdnK-VDyw1GZOA88F8"; // Standard Twin
    if (type === 'Standard') {
        image = "https://lh3.googleusercontent.com/aida-public/AB6AXuDfoSpnFHftIQUJMNkddLiPu9HJ8phCc956JoN3XgGBB7qCA89H1ZZxd8wk8fNFWrMz2DESIJw9VElbBfZ_rEP-8oc0E-GVfIW68cB2AyUPv4nz70FpGI9n9jxD4gyqoh76VB4xyVelPSMpvIZneyIwRJMPVG2ALnS4cEdshhLzCnhCuPHHGBGjj98iXX65ojsp-gWBm1ef5A2zqoKCD_tiQ2mYtUac09pIUedG08a7QkXSQzthNS-i5FghooBlzen7Eb7T5rStJ7UG";
    }

    return { availableCount, minPrice, image };
  };

  const handleBook = (type) => {
    const availableRoom = rooms.find(r => r.type === type && r.status === 'Available');
    if (availableRoom) {
      navigate(`/book/${availableRoom.id}`);
    } else {
      alert('ขออภัย ห้องพักประเภทนี้เต็มแล้วครับ');
    }
  };

  return (
    <div className="relative flex flex-col w-full min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative w-full">
        <div 
          className="flex min-h-[560px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 relative" 
          style={{backgroundImage: 'linear-gradient(rgba(16, 25, 34, 0.4) 0%, rgba(16, 25, 34, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuASk_XdzJdYBYLxY_HOOo79Gy_aGoVfttJHKKqlCUBAYk-Bgyi5xh9-dwWPKJAMQNRSilfPrUcaKbwesttpvaIwz4oWkfUYen3Argrkkrhm-qvaBp8-fhpDGqfbHm2rJU0N068tpHmRG2lY3NVsFsFOROozB79Uush30YmbvfU6iHMjDC__ZZVpusfIGIx_kwWVt_NN20_Jd5eJfb7Z9lfduQfnkmlHhLav-HKDJ8dK4aCmPcHqrUaOquMOErJvql4G3bgAYZPXocjj")'}}
        >
          <div className="flex flex-col gap-3 text-center z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold w-fit mx-auto backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              ประสบการณ์ใหม่แห่งการพักผ่อน ณ บึงกาฬ
            </div>
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em]">
              โรงแรมวิพัฒน์กาลจักร<br />
              <span className="text-3xl md:text-5xl font-bold opacity-90">พักผ่อนสบาย สไตล์ทันสมัย</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg font-medium leading-normal max-w-xl mx-auto">
              บริการห้องพัก 51 ห้องที่ได้รับการปรับปรุงใหม่ พร้อมสิ่งอำนวยความสะดวกครบครัน Wi-Fi ความเร็วสูง และที่จอดรถปลอดภัย
            </p>
          </div>

          {/* Booking Search Widget (UI Only) */}
          <div className="w-full max-w-[800px] z-10 mt-8 p-1 rounded-2xl bg-surface-dark/50 backdrop-blur-lg border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center w-full gap-2 p-2">
              <div className="flex-1 w-full bg-surface-dark rounded-xl border border-border-dark px-4 py-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-text-secondary">date_range</span>
                <div className="flex flex-col w-full">
                  <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">วันที่เข้าพัก</span>
                  <input type="text" placeholder="เช็คอิน - เช็คเอาท์" className="bg-transparent border-none p-0 text-white text-sm focus:ring-0 placeholder:text-gray-500 font-medium w-full" />
                </div>
              </div>
              <div className="flex-1 w-full md:w-1/3 bg-surface-dark rounded-xl border border-border-dark px-4 py-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-text-secondary">group</span>
                <div className="flex flex-col w-full">
                  <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">ผู้เข้าพัก</span>
                  <select className="bg-transparent border-none p-0 text-white text-sm focus:ring-0 w-full cursor-pointer bg-surface-dark">
                    <option>ผู้ใหญ่ 2 ท่าน</option>
                    <option>ผู้ใหญ่ 1 ท่าน</option>
                    <option>มาเป็นครอบครัว (4 ท่าน)</option>
                  </select>
                </div>
              </div>
              <button onClick={() => document.getElementById('rooms').scrollIntoView({behavior: 'smooth'})} className="w-full md:w-auto h-14 md:h-full px-8 bg-primary hover:bg-primary/90 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25">
                <span className="material-symbols-outlined">search</span>
                ค้นหา
              </button>
            </div>
          </div>
        </div>

        {/* Promotions & Features Grid */}
        <div className="px-4 md:px-10 py-12 flex justify-center w-full">
          <div className="max-w-7xl w-full flex flex-col gap-12">
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: 'wifi', title: 'ฟรี 5G Wi-Fi', subtitle: 'อินเทอร์เน็ตความเร็วสูง' },
                { icon: 'location_on', title: 'ทำเลดีเยี่ยม', subtitle: 'ใจกลางเมืองบึงกาฬ' },
                { icon: 'local_parking', title: 'ที่จอดรถปลอดภัย', subtitle: 'มีกล้องวงจรปิด 24 ชม.' },
                { icon: 'support_agent', title: 'บริการ 24 ชม.', subtitle: 'พร้อมดูแลตลอดเวลา' }
              ].map((feature, idx) => (
                <div key={idx} className="bg-surface-dark border border-border-dark p-5 rounded-2xl flex flex-col gap-3 hover:border-primary/50 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{feature.title}</h3>
                    <p className="text-text-secondary text-xs mt-1">{feature.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Rooms Section (Dynamic from Real Data) */}
            <div id="rooms" className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">ห้องพักว่างให้บริการ</h2>
                <span className="text-primary text-sm font-bold">ทั้งหมด 51 ห้อง</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roomTypes.map((type) => {
                  const { availableCount, minPrice, image } = getRoomTypeInfo(type);
                  return (
                    <div key={type} className="bg-surface-dark rounded-2xl overflow-hidden border border-border-dark hover:shadow-2xl hover:shadow-primary/5 transition-all group">
                      <div className="h-48 bg-cover bg-center relative" style={{backgroundImage: `url("${image}")`}}>
                        {availableCount > 0 ? (
                            <div className="absolute top-3 right-3 bg-green-500 px-2 py-1 rounded-lg text-xs font-bold text-white shadow-sm">
                                ว่าง {availableCount} ห้อง
                            </div>
                        ) : (
                            <div className="absolute top-3 right-3 bg-red-500 px-2 py-1 rounded-lg text-xs font-bold text-white shadow-sm">
                                เต็มแล้ว
                            </div>
                        )}
                      </div>
                      <div className="p-5 flex flex-col gap-4">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{type}</h3>
                            <p className="text-primary font-bold">฿{minPrice.toLocaleString()}</p>
                          </div>
                          <p className="text-text-secondary text-sm mt-1">
                            {type === 'Standard' ? 'เตียงใหญ่ 1 เตียง • สำหรับ 2 ท่าน' : 'เตียงเดี่ยว 2 เตียง • สำหรับ 2 ท่าน'}
                          </p>
                        </div>
                        <div className="flex gap-2 text-text-secondary">
                          <span className="material-symbols-outlined text-[18px]" title="Wifi">wifi</span>
                          <span className="material-symbols-outlined text-[18px]" title="TV">tv</span>
                          <span className="material-symbols-outlined text-[18px]" title="AC">ac_unit</span>
                          <span className="material-symbols-outlined text-[18px]" title="Shower">shower</span>
                        </div>
                        <button 
                          onClick={() => handleBook(type)}
                          disabled={availableCount === 0}
                          className={`w-full py-2.5 rounded-xl text-white text-sm font-bold transition-colors ${availableCount > 0 ? 'bg-primary hover:bg-primary/90' : 'bg-gray-600 cursor-not-allowed'}`}
                        >
                          {availableCount > 0 ? 'จองห้องพัก' : 'เต็มแล้ว'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full h-80 rounded-2xl overflow-hidden relative border border-border-dark">
              <img className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZmzE_F6oC6i8LwzjKUDokm99jyNkJQ9RKO8bMSWMzhig_rGyENN0h5PmbjSef-s192YqbDZLHAXhn_dXq24Rk72E8NHhmP10j2Sv8Scx5NqpzXuVWI2_M7CNxj5ix1Zbi4KHtyrpmkUKgkjgYbwWyBZdwsZ2WjZL-Mc6fqTv2qKhReHnKgjRXHREd9j7AmveoxCoKgc-bikySIdA-xat5d7ePE7mHxX7S2e7SxUFB2PzlgSbzqNj22D_8ES3kInb-cCGhmCoqSahA" alt="Map" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
              <div className="absolute bottom-6 left-6 max-w-sm">
                <h3 className="text-white text-xl font-bold">โรงแรมวิพัฒน์กาลจักร</h3>
                <p className="text-text-secondary text-sm mb-4">123 ถนนแม่น้ำโขง อำเภอเมือง จังหวัดบึงกาฬ 38000</p>
                <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg flex items-center gap-2 hover:bg-gray-200">
                  <span className="material-symbols-outlined text-[18px]">directions</span> ดูแผนที่
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
      <AIChat />
    </div>
  );
};

export default GuestHome;