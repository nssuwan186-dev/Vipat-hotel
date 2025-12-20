import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#05090c] border-t border-border-dark py-10 px-4 text-center">
      <p className="text-text-secondary text-sm">© 2023 Vipatkanjak Hotel Bueng Kan. All rights reserved.</p>
      <div className="flex justify-center gap-6 mt-4">
        <a href="#" className="text-text-secondary hover:text-white text-sm">Privacy Policy</a>
        <a href="#" className="text-text-secondary hover:text-white text-sm">Terms of Service</a>
        <Link to="/admin" className="text-text-secondary hover:text-white text-sm">Admin Login</Link>
      </div>
    </footer>
  );
};

export default Footer;
