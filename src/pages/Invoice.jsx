import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const Invoice = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const { transactions } = useHotel();
  const trx = transactions.find(t => t.id === transactionId);

  if (!trx) return <div className="p-10 text-center">Transaction not found</div>;

  const charges = trx.charges || [{ desc: 'ค่าบริการ/สินค้า', amount: trx.amount }];
  const subtotal = charges.reduce((sum, c) => sum + c.amount, 0);
  const vatRate = 0.07;
  const vatAmount = subtotal * vatRate;
  const grandTotal = subtotal + vatAmount;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8 flex flex-col items-center gap-6 font-display print:bg-white print:p-0">
      
      {/* Action Bar */}
      <div className="w-full max-w-[210mm] flex justify-between items-center print:hidden">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white">
            <span className="material-symbols-outlined">arrow_back</span> กลับ
        </button>
        <button onClick={() => window.print()} className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-xl shadow-lg hover:bg-blue-600 font-bold">
            <span className="material-symbols-outlined">print</span> พิมพ์ใบเสร็จ
        </button>
      </div>

      {/* A4 Paper */}
      <div className="bg-white w-full max-w-[210mm] min-h-[297mm] p-10 md:p-16 shadow-2xl print:shadow-none text-slate-900">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-slate-800 pb-8 mb-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black uppercase tracking-wider">ใบเสร็จรับเงิน</h1>
                <p className="text-sm font-bold text-slate-500">RECEIPT / TAX INVOICE</p>
            </div>
            <div className="text-right">
                <h2 className="text-xl font-bold">Vipat Hotel</h2>
                <p className="text-sm text-slate-600 mt-1">123 ถนนสุขุมวิท แขวงคลองเตย</p>
                <p className="text-sm text-slate-600">เขตคลองเตย กรุงเทพฯ 10110</p>
                <p className="text-sm text-slate-600">Tel: 02-123-4567 | Tax ID: 010555123456</p>
            </div>
        </div>

        {/* Info Grid */}
        <div className="flex justify-between mb-10">
            <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">ลูกค้า (Bill To)</p>
                <p className="font-bold text-lg">{trx.customerName || 'ลูกค้าเงินสด'}</p>
                <p className="text-sm text-slate-600">{trx.customerAddress || '-'}</p>
                <p className="text-sm text-slate-600">{trx.customerPhone || '-'}</p>
            </div>
            <div className="flex-1 text-right flex flex-col gap-2">
                <div className="flex justify-end gap-4">
                    <span className="text-slate-500 text-sm font-bold">เลขที่เอกสาร:</span>
                    <span className="font-bold">{trx.id}</span>
                </div>
                <div className="flex justify-end gap-4">
                    <span className="text-slate-500 text-sm font-bold">วันที่:</span>
                    <span className="font-bold">{new Date().toLocaleDateString('th-TH')}</span>
                </div>
                <div className="flex justify-end gap-4">
                    <span className="text-slate-500 text-sm font-bold">ห้องพัก:</span>
                    <span className="font-bold text-primary">{trx.roomNo || '-'}</span>
                </div>
            </div>
        </div>

        {/* Table */}
        <table className="w-full mb-8">
            <thead>
                <tr className="bg-slate-100 text-slate-600 text-sm uppercase tracking-wider">
                    <th className="py-3 px-4 text-left rounded-l-lg">ลำดับ</th>
                    <th className="py-3 px-4 text-left w-full">รายการ (Description)</th>
                    <th className="py-3 px-4 text-right rounded-r-lg">จำนวนเงิน (Baht)</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
                {charges.map((item, index) => (
                    <tr key={index}>
                        <td className="py-4 px-4 text-slate-500">{index + 1}</td>
                        <td className="py-4 px-4 font-medium">{item.desc}</td>
                        <td className="py-4 px-4 text-right font-bold">{item.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-16">
            <div className="w-64 flex flex-col gap-3">
                <div className="flex justify-between text-slate-600">
                    <span>รวมเป็นเงิน</span>
                    <span className="font-bold">{subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                    <span>ภาษีมูลค่าเพิ่ม (7%)</span>
                    <span className="font-bold">{vatAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between text-xl font-black bg-slate-900 text-white p-3 rounded-lg shadow-lg">
                    <span>ยอดสุทธิ</span>
                    <span>{grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
            </div>
        </div>

        {/* Footer / Signatures */}
        <div className="grid grid-cols-2 gap-10 mt-auto pt-10 border-t border-slate-200">
            <div className="text-center">
                <div className="h-16 border-b border-dashed border-slate-300 mb-2"></div>
                <p className="text-sm font-bold text-slate-500">ผู้รับเงิน (Cashier)</p>
            </div>
            <div className="text-center">
                <div className="h-16 border-b border-dashed border-slate-300 mb-2"></div>
                <p className="text-sm font-bold text-slate-500">ผู้จ่ายเงิน (Customer)</p>
            </div>
        </div>

        <p className="text-center text-[10px] text-slate-400 mt-8">ขอบคุณที่ใช้บริการโรงแรมวิพัฒน์กาลจักร</p>

      </div>
    </div>
  );
};

export default Invoice;