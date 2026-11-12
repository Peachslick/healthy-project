# Project Context & Tech Stack
- **Framework:** React (Vite) + Tailwind CSS + Lucide React (สำหรับไอคอน)
- **Architecture:** Frontend-only SPA (ใช้ Mock Data ในไฟล์ `src/data/workouts.js` และเก็บประวัติการออกกำลังกาย/โปรไฟล์ลง `localStorage`)
- **UI & Theme Design:**
  - สไตล์ Clean & Minimalist โทนสีฟ้า-ขาว (Primary Blue `#2563EB`, Light Blue Accent `#EFF6FF`, พื้นหลังขาว/เทาอ่อน `#F8FAFC`)
  - ฟอนต์ภาษาไทย (เช่น Prompt หรือ IBM Plex Sans Thai) อ่านง่าย สบายตา
  - การ์ดและปุ่มใช้ขอบโค้งมน (`rounded-2xl` / `rounded-full`) มีเงาบางๆ (`shadow-sm`)
- **Language:** อธิบายและโต้ตอบเป็นภาษาไทย ส่วนชื่อตัวแปรและคอมเมนต์ในโค้ดใช้ภาษาอังกฤษ

# Coding Rules
1. แยกข้อมูลท่าออกกำลังกายไว้ใน `src/data/workouts.js` ห้าม Hardcode ข้อมูลซ้ำๆ ใน Component
2. รองรับ Responsive ทั้งหน้าจอ Desktop และ Mobile (โดยเฉพาะแถบ Bottom Navigation Bar ด้านล่าง)
3. แก้ไขเฉพาะไฟล์ที่สั่ง ห้ามลบหรือเปลี่ยนโครงสร้างไฟล์อื่นโดยไม่จำเป็น