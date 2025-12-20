import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminSettings = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e7edf3] dark:border-gray-800 bg-white dark:bg-[#1a2634] px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h2 className="text-lg font-bold">Admin Settings</h2>
        </div>
      </header>

      <div className="p-6 md:px-12 lg:px-20 max-w-[800px] mx-auto flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-black">System Configuration</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your hotel profile and system preferences.</p>
        </div>

        <section className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-gray-700">
                <h3 className="font-bold">Hotel Information</h3>
            </div>
            <div className="p-6 flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium">Hotel Name</span>
                    <input className="form-input rounded-lg dark:bg-gray-800 dark:border-gray-600" defaultValue="Vipatkanjak Hotel Bueng Kan" />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium">Contact Phone</span>
                    <input className="form-input rounded-lg dark:bg-gray-800 dark:border-gray-600" defaultValue="081-XXX-XXXX" />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium">Address</span>
                    <textarea className="form-textarea rounded-lg dark:bg-gray-800 dark:border-gray-600 h-24">123 Mekong Road, Bueng Kan City, 38000</textarea>
                </label>
                <button className="bg-primary text-white py-2.5 rounded-lg font-bold hover:bg-blue-600 transition-all mt-2">Save Changes</button>
            </div>
        </section>

        <section className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-gray-700">
                <h3 className="font-bold">Bank Accounts for Transfer</h3>
            </div>
            <div className="p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-600 rounded flex items-center justify-center text-white font-bold text-xs">KBNK</div>
                        <div>
                            <p className="text-sm font-bold">Kasikorn Bank</p>
                            <p className="text-xs text-gray-500">123-4-56789-0</p>
                        </div>
                    </div>
                    <button className="text-red-500"><span className="material-symbols-outlined">delete</span></button>
                </div>
                <button className="text-primary text-sm font-bold flex items-center gap-2 mt-2">
                    <span className="material-symbols-outlined">add</span> Add New Account
                </button>
            </div>
        </section>
      </div>
    </div>
  );
};

export default AdminSettings;
