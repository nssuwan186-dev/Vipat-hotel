import React, { useState, useRef, useEffect } from 'react';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate response without API Key
    setTimeout(() => {
      let reply = "ขออภัยครับ ขณะนี้เจ้าหน้าที่กำลังให้บริการลูกค้าท่านอื่น รบกวนติดต่อด่วนที่เบอร์ 081-XXX-XXXX ครับ";
      
      const text = userMsg.content.toLowerCase();
      if (text.includes('ราคา') || text.includes('เท่าไหร่') || text.includes('price')) {
        reply = "ห้อง Standard ราคา 400 บาท และ Standard Twin ราคา 500 บาทครับ สนใจจองกดปุ่ม 'จองห้องพัก' ได้เลยครับ!";
      } else if (text.includes('ว่าง') || text.includes('จอง')) {
        reply = "คุณสามารถเช็คห้องว่างและกดจองได้ที่หน้าแรกเลยครับ ระบบจะตัดห้องให้อัตโนมัติทันทีครับ";
      } else if (text.includes('wifi') || text.includes('เน็ต')) {
        reply = "เรามีบริการ 5G Wi-Fi ฟรีทุกห้องครับ รหัสผ่านจะอยู่ที่คีย์การ์ดครับ";
      } else if (text.includes('ทาง') || text.includes('อยู่ไหน') || text.includes('location')) {
        reply = "โรงแรมวิพัฒน์กาลจักร ตั้งอยู่ใจกลางเมืองบึงกาฬ ติดแม่น้ำโขงครับ กดดูแผนที่ในหน้าแรกได้เลยครับ";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-display">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-all active:scale-95"
      >
        <span className="material-symbols-outlined text-[28px]">
          {isOpen ? 'close' : 'smart_toy'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-border-dark flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-primary p-4 text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <div>
              <h3 className="font-bold text-sm">น้องพัด (ผู้ช่วยอัตโนมัติ)</h3>
              <p className="text-[10px] opacity-80">โรงแรมวิพัฒน์กาลจักร</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50 dark:bg-background-dark/50">
            {messages.length === 0 && (
              <div className="text-center py-10">
                <p className="text-sm text-slate-500">สวัสดีครับ! สอบถามราคา หรือข้อมูลห้องพัก พิมพ์มาได้เลยครับ</p>
              </div>
            )}
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white dark:bg-surface-dark text-slate-900 dark:text-white border border-slate-200 dark:border-border-dark rounded-tl-none'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-border-dark">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-border-dark flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="พิมพ์คำถามที่นี่..." 
              className="flex-1 bg-slate-100 dark:bg-gray-800 border-none rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-blue-600 disabled:opacity-50"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChat;