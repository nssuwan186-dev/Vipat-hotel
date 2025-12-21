import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#05090c] border-t border-slate-200 dark:border-border-dark py-10 px-4 text-center">
      <p className="text-slate-500 dark:text-text-secondary text-sm">© 2023 โรงแรมวิพัฒน์กาลจักร บึงกาฬ. สงวนลิขสิทธิ์.</p>
      <div className="flex justify-center gap-6 mt-4">
        <a href="#" className="text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white text-sm">นโยบายความเป็นส่วนตัว</a>
        <a href="#" className="text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white text-sm">เงื่อนไขการใช้บริการ</a>
        <Link to="/admin" className="text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white text-sm">ระบบจัดการ</Link>
      </div>
    </footer>
  );
};

export default Footer;