import React from 'react';
import { useHotel } from '../context/HotelContext';

const ActivityLogs = () => {
  const { logs } = useHotel();

  return (
    <div className="p-6 md:p-10 max-w-[1000px] mx-auto flex flex-col gap-6 text-slate-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-black">บันทึกการใช้งาน (Activity Logs)</h1>
        <p className="text-slate-500 dark:text-[#90adcb]">ตรวจสอบประวัติการทำงานย้อนหลัง</p>
      </div>

      <div className="bg-white dark:bg-[#16212b] rounded-3xl border border-slate-200 dark:border-[#223649] overflow-hidden shadow-sm">
        <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-[#1c2a38] text-slate-500 dark:text-slate-400 text-xs uppercase">
                <tr>
                    <th className="p-4 w-48">เวลา (Time)</th>
                    <th className="p-4 w-32">ผู้ใช้งาน (User)</th>
                    <th className="p-4 w-32">การกระทำ (Action)</th>
                    <th className="p-4">รายละเอียด (Details)</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-[#223649]">
                {logs.length > 0 ? logs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-white/5">
                        <td className="p-4 text-sm font-mono text-slate-500">{new Date(log.timestamp).toLocaleString('th-TH')}</td>
                        <td className="p-4 font-bold">
                            {log.actor} 
                            <span className="block text-[10px] font-normal opacity-70">{log.role}</span>
                        </td>
                        <td className="p-4 text-xs font-bold text-primary">{log.action}</td>
                        <td className="p-4 text-sm">{log.details}</td>
                    </tr>
                )) : (
                    <tr><td colSpan="4" className="p-8 text-center text-slate-400">ยังไม่มีประวัติการใช้งาน</td></tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLogs;
