import React, { useState, useEffect } from 'react';
import { useHotel } from '../context/HotelContext';

const AdminSettings = () => {
  const { theme, toggleTheme } = useHotel();
  const [deployUrl, setDeployUrl] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    // Load saved URL from localStorage
    const savedUrl = localStorage.getItem('vipat_deploy_url');
    if (savedUrl) setDeployUrl(savedUrl);
  }, []);

  const handleSaveDeployUrl = () => {
    localStorage.setItem('vipat_deploy_url', deployUrl);
    alert('บันทึก Vercel Deploy Hook URL เรียบร้อยแล้ว');
  };

  const triggerDeploy = async () => {
    if (!deployUrl) {
        alert('กรุณาระบุ Vercel Deploy Hook URL ก่อน');
        return;
    }
    
    if(!confirm('ยืนยันที่จะสั่งอัปเดตระบบ (Deploy) ใหม่? เว็บไซต์อาจจะใช้ไม่ได้ชั่วคราวขณะอัปเดต')) return;

    setIsDeploying(true);
    try {
        const response = await fetch(deployUrl, { method: 'POST' });
        if (response.ok) {
            alert('สั่ง Deploy เรียบร้อย! ระบบ Vercel กำลังทำการอัปเดตเว็บไซต์ กรุณารอประมาณ 2-3 นาที');
        } else {
            alert('เกิดข้อผิดพลาดในการสั่ง Deploy: ' + response.statusText);
        }
    } catch (error) {
        alert('ไม่สามารถเชื่อมต่อกับ Vercel ได้: ' + error.message);
    } finally {
        setIsDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white pb-20">
      <div className="p-6 md:px-12 lg:px-20 max-w-[800px] mx-auto flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-black">ตั้งค่าระบบ</h1>
            <p className="text-gray-500 dark:text-gray-400">จัดการข้อมูลโรงแรมและระบบหลังบ้าน</p>
        </div>

        {/* Deployment Section */}
        <section className="bg-white dark:bg-surface-dark rounded-3xl border border-slate-200 dark:border-border-dark overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-gray-700 flex items-center gap-3">
                <div className="size-10 rounded-full bg-black text-white flex items-center justify-center">
                    <span className="material-symbols-outlined">rocket_launch</span>
                </div>
                <div>
                    <h3 className="font-bold text-lg">การอัปเดตเว็บไซต์ (Vercel Deploy)</h3>
                    <p className="text-xs text-slate-500">สั่งให้ระบบอัปเดตหน้าเว็บใหม่ทันที</p>
                </div>
            </div>
            <div className="p-6 flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-bold text-slate-700 dark:text-gray-300">Vercel Deploy Hook URL</span>
                    <div className="flex gap-2">
                        <input 
                            className="form-input flex-1 rounded-xl dark:bg-gray-800 dark:border-gray-600 px-4 h-12" 
                            placeholder="https://api.vercel.com/v1/integrations/deploy/..." 
                            value={deployUrl}
                            onChange={e => setDeployUrl(e.target.value)}
                        />
                        <button onClick={handleSaveDeployUrl} className="bg-slate-200 dark:bg-gray-700 px-4 rounded-xl font-bold text-sm hover:bg-slate-300 dark:hover:bg-gray-600">บันทึก</button>
                    </div>
                    <p className="text-xs text-slate-400">
                        * หาได้จาก Vercel Dashboard {'>'} Settings {'>'} Git {'>'} Deploy Hooks
                    </p>
                </label>
                
                <hr className="border-slate-100 dark:border-gray-700 my-2" />
                
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-bold">สั่งอัปเดตทันที</p>
                        <p className="text-xs text-slate-500">กดเมื่อต้องการให้เว็บแสดงผลล่าสุด</p>
                    </div>
                    <button 
                        onClick={triggerDeploy} 
                        disabled={isDeploying || !deployUrl}
                        className={`px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center gap-2 ${isDeploying ? 'bg-slate-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 hover:scale-105 shadow-black/20'}`}
                    >
                        {isDeploying ? (
                            <><span className="material-symbols-outlined animate-spin">sync</span> กำลังอัปเดต...</>
                        ) : (
                            <><span className="material-symbols-outlined">publish</span> อัปเดตเว็บไซต์</>
                        )}
                    </button>
                </div>
            </div>
        </section>

        <section className="bg-white dark:bg-surface-dark rounded-3xl border border-slate-200 dark:border-border-dark overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-gray-700">
                <h3 className="font-bold">ข้อมูลทั่วไป</h3>
            </div>
            <div className="p-6 flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium">ชื่อโรงแรม</span>
                    <input className="form-input rounded-xl dark:bg-gray-800 dark:border-gray-600 h-12 px-4" defaultValue="โรงแรมวิพัฒน์กาลจักร บึงกาฬ" />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium">เบอร์โทรศัพท์</span>
                    <input className="form-input rounded-xl dark:bg-gray-800 dark:border-gray-600 h-12 px-4" defaultValue="081-XXX-XXXX" />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium">ที่อยู่</span>
                    <textarea className="form-textarea rounded-xl dark:bg-gray-800 dark:border-gray-600 h-24 p-4">123 ถนนแม่น้ำโขง อำเภอเมือง จังหวัดบึงกาฬ 38000</textarea>
                </label>
                <button className="bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all mt-2 shadow-lg shadow-blue-500/20">บันทึกการเปลี่ยนแปลง</button>
            </div>
        </section>

        <section className="bg-white dark:bg-surface-dark rounded-3xl border border-slate-200 dark:border-border-dark overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-gray-700">
                <h3 className="font-bold">การแสดงผล</h3>
            </div>
            <div className="p-6 flex items-center justify-between">
                <div>
                    <h4 className="font-bold">โหมดมืด (Dark Mode)</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">เปลี่ยนธีมเป็นสีเข้มถนอมสายตา</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
            </div>
        </section>

      </div>
    </div>
  );
};

export default AdminSettings;
