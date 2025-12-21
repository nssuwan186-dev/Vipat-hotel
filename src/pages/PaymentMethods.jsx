import React from 'react';

const PaymentMethods = () => {
  return (
    <div className="p-6 max-w-md mx-auto text-slate-900 dark:text-white">
      <h1 className="text-2xl font-black mb-6">วิธีการชำระเงิน</h1>
      <div className="flex flex-col gap-4">
        <div className="bg-white dark:bg-[#16212b] p-5 rounded-3xl border border-slate-200 dark:border-[#223649] flex items-center gap-4">
            <span className="material-symbols-outlined text-primary text-3xl">credit_card</span>
            <div className="flex-1">
                <p className="font-bold">Visa **** 4432</p>
                <p className="text-[10px] text-slate-500 uppercase">Expires 12/25</p>
            </div>
            <span className="material-symbols-outlined text-red-500">delete</span>
        </div>
        <button className="border-2 border-dashed border-slate-300 dark:border-[#223649] p-4 rounded-3xl text-slate-500 font-bold text-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">add</span> เพิ่มบัตรใหม่
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;
