import { useState, useEffect } from "react";

// 1. Định nghĩa khuôn dữ liệu trả về từ API
interface NguoiDung {
  id: number;
  name: string;
  email: string;
}

const App = () => {
  // 2. Tạo State chứa mảng, ban đầu là mảng rỗng. 
  // (Kẹp thêm <NguoiDung[]> để TypeScript hiểu đây là mảng chứa các object NguoiDung)
  const [danhSach, setDanhSach] = useState<NguoiDung[]>([]);

  // 3. Gọi API tự động bằng useEffect
  useEffect(() => {
    // Tưởng tượng đường link này là localhost:8080/api/users của Spring Boot
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json()) // Ép cục data thô thành chuẩn JSON
      .then((data) => {
        setDanhSach(data); // Đổ data vào State
      });
  }, []); // <-- Cái ngoặc vuông rỗng này cực kỳ quan trọng, thiếu là toang!

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Danh Sách Tài Khoản Hệ Thống
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* 4. Map dữ liệu ra giao diện */}
        {danhSach.length === 0 ? (
          <p className="text-center text-gray-500 col-span-2 text-xl font-semibold">
            Đang tải dữ liệu từ Server...
          </p>
        ) : (
          danhSach.map((user) => (
            <div key={user.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-500 mt-2">{user.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;