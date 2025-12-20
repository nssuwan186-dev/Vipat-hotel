import React from 'react';

const Contact = () => {
  return (
    <div className="p-6 md:px-12 lg:px-20 max-w-[1000px] mx-auto flex flex-col gap-8">
      
      {/* About Section */}
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">เกี่ยวกับเรา</h1>
        <div className="bg-white dark:bg-[#16212b] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-[#223649] flex flex-col md:flex-row gap-6 items-center">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuASk_XdzJdYBYLxY_HOOo79Gy_aGoVfttJHKKqlCUBAYk-Bgyi5xh9-dwWPKJAMQNRSilfPrUcaKbwesttpvaIwz4oWkfUYen3Argrkkrhm-qvaBp8-fhpDGqfbHm2rJU0N068tpHmRG2lY3NVsFsFOROozB79Uush30YmbvfU6iHMjDC__ZZVpusfIGIx_kwWVt_NN20_Jd5eJfb7Z9lfduQfnkmlHhLav-HKDJ8dK4aCmPcHqrUaOquMOErJvql4G3bgAYZPXocjj" className="w-full md:w-1/2 h-64 object-cover rounded-xl" />
            <div className="flex-1">
                <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">โรงแรมวิพัฒน์กาลจักร บึงกาฬ</h2>
                <p className="text-slate-500 dark:text-gray-400 mb-4 leading-relaxed">
                    เราคือโรงแรมชั้นนำใจกลางเมืองบึงกาฬ ที่มุ่งเน้นความสะดวกสบาย ทันสมัย และบริการที่เป็นกันเอง ห้องพักทั้ง 51 ห้องของเราได้รับการออกแบบเพื่อตอบโจทย์ทุกความต้องการ ทั้งนักท่องเที่ยวและนักธุรกิจ
                </p>
                <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-gray-300">
                    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">location_on</span> 123 ถนนแม่น้ำโขง อำเภอเมือง จังหวัดบึงกาฬ 38000</div>
                    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">call</span> 081-XXX-XXXX</div>
                    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">mail</span> contact@vipatkanjak.com</div>
                </div>
            </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">สิ่งอำนวยความสะดวก</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { icon: 'wifi', title: 'Free Wi-Fi 5G' },
                { icon: 'local_parking', title: 'ที่จอดรถ 24 ชม.' },
                { icon: 'ac_unit', title: 'เครื่องปรับอากาศ' },
                { icon: 'tv', title: 'Smart TV' },
                { icon: 'shower', title: 'เครื่องทำน้ำอุ่น' },
                { icon: 'cleaning_services', title: 'แม่บ้านทำความสะอาด' },
                { icon: 'security', title: 'กล้องวงจรปิด' },
                { icon: 'water_drop', title: 'น้ำดื่มฟรี' },
            ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-[#16212b] p-4 rounded-xl border border-slate-200 dark:border-[#223649] flex flex-col items-center justify-center gap-2 text-center hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-3xl text-primary">{item.icon}</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-gray-300">{item.title}</span>
                </div>
            ))}
        </div>
      </section>

    </div>
  );
};

export default Contact;
