import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'), // ใช้อันที่เสถียรกว่า (หรือ gpt-5 ถ้าเปิดให้ใช้แล้ว)
    messages,
    system: `คุณคือ "น้องพัด" ผู้ช่วยอัจฉริยะของโรงแรมวิพัฒน์กาลจักร จังหวัดบึงกาฬ 
    ข้อมูลโรงแรม:
    - ห้อง Standard (เช่น A101-A105, B101-B110) ราคา 400 บาท/คืน
    - ห้อง Standard Twin (เช่น A106-A110, B111) ราคา 500 บาท/คืน
    - ห้องตึก N (VIP) ราคา 500-600 บาท/คืน
    - บริการฟรี 5G Wi-Fi, ที่จอดรถ 24 ชม.
    - ทำเล: ใจกลางเมืองบึงกาฬ ติดแม่น้ำโขง
    หน้าที่: ตอบคำถามลูกค้าด้วยความสุภาพ เป็นกันเอง และช่วยให้ข้อมูลเรื่องการจองห้องพัก`,
  });

  return result.toAIStreamResponse();
}
