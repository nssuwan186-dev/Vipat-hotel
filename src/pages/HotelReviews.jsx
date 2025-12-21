import React from 'react';

const HotelReviews = () => {
  const reviews = [
    { name: 'คุณวิภา', rating: 5, comment: 'ห้องสะอาดมาก บริการดีเยี่ยมค่ะ', date: '2 วันที่แล้ว' },
    { name: 'John Doe', rating: 4, comment: 'Good location and very high speed wifi.', date: '1 สัปดาห์ที่แล้ว' }
  ];

  return (
    <div className="p-6 max-w-[800px] mx-auto text-slate-900 dark:text-white">
      <h1 className="text-2xl font-black mb-6">รีวิวจากผู้เข้าพัก</h1>
      <div className="flex flex-col gap-4">
        {reviews.map((r, i) => (
            <div key={i} className="bg-white dark:bg-[#16212b] p-5 rounded-3xl border border-slate-200 dark:border-[#223649]">
                <div className="flex justify-between items-center mb-2">
                    <p className="font-bold">{r.name}</p>
                    <div className="flex text-yellow-400">
                        {[...Array(r.rating)].map((_, i) => <span key={i} className="material-symbols-outlined text-xs icon-fill">star</span>)}
                    </div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{r.comment}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-2">{r.date}</p>
            </div>
        ))}
        <button className="bg-primary/10 text-primary py-3 rounded-2xl font-bold text-sm mt-4">เขียนรีวิวของคุณ</button>
      </div>
    </div>
  );
};

export default HotelReviews;
