import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const ManagePromotions = () => {
  const { promotions } = useHotel();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e7edf3] dark:border-gray-800 bg-white dark:bg-[#1a2634] px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h2 className="text-lg font-bold">Manage Promotions</h2>
        </div>
      </header>

      <div className="p-6 md:px-12 lg:px-20 max-w-[1000px] mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-end">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black">Promotions & Discounts</h1>
                <p className="text-gray-500 dark:text-gray-400">Current active offers for your guests.</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition-all">
                <span className="material-symbols-outlined">add</span> New Promo
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promotions.map(promo => (
                <div key={promo.id} className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark flex flex-col gap-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black">{promo.code}</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{promo.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{promo.condition}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-2xl font-black text-primary">{promo.discount} OFF</span>
                        <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-primary"><span className="material-symbols-outlined">edit</span></button>
                            <button className="p-2 text-gray-400 hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManagePromotions;
