import { useState } from 'react';

const App = () => {
  // 1. Tạo State lưu tài khoản, mặc định là chuỗi rỗng
  const [taiKhoan, setTaiKhoan] = useState("");

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <div className="w-96 rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-blue-600">
          Flogin System
        </h1>

        {/* 2. Ô Input kết nối với State */}
        <input
          type="text"
          placeholder="Nhập mã sinh viên hoặc username..."
          className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          value={taiKhoan} 
          onChange={(e) => setTaiKhoan(e.target.value)} 
        />

        {/* 3. In trực tiếp State ra ngoài để test */}
        <p className="mt-4 text-sm text-gray-600">
          Dữ liệu đang gõ: <span className="font-bold text-red-500">{taiKhoan}</span>
        </p>

        <button 
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700"
          onClick={() => alert(`Đang gửi dữ liệu [${taiKhoan}] xuống Backend...`)}
        >
          Đăng Nhập
        </button>
      </div>
    </div>
  );
};

export default App;