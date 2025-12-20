import React from 'react';
import { useHotel } from '../context/HotelContext';

const Promotions = () => {
  const { promotions } = useHotel();

  return (
    <div className="p-6 md:px-12 lg:px-20 max-w-[1000px] mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-1 mb-4">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">โปรโมชั่นและส่วนลด</h1>
        <p className="text-gray-500 dark:text-gray-400">ข้อเสนอพิเศษสำหรับคุณ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promotions.map(promo => (
            <div key={promo.id} className="relative overflow-hidden bg-gradient-to-br from-primary to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <span className="material-symbols-outlined text-[100px]">campaign</span>
                </div>
                <div className="relative z-10">
                    <div className="bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold mb-3 backdrop-blur-sm">
                        CODE: {promo.code}
                    </div>
                    <h3 className="text-2xl font-black mb-1">{promo.name}</h3>
                    <p className="text-white/90 text-sm mb-4">{promo.condition}</p>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-black">{promo.discount}</span>
                        <span className="text-lg mb-1">ส่วนลด</span>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Promotions;
