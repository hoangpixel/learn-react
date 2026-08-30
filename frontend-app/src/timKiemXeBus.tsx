import { useState } from 'react';

interface XeProps {
  maXe: string;
  tuyenDuong: string;
}

const danhSachXe = [
  { maXe: "1", tuyenDuong: "An Dương Vương" },
  { maXe: "2", tuyenDuong: "Nguyễn Trãi" },
  { maXe: "3", tuyenDuong: "Lê Hồng Phong" },
  { maXe: "4", tuyenDuong: "Trần Duy Hưng" },
  { maXe: "5", tuyenDuong: "Đường 3/2" }
];

const XeCard = ({ maXe, tuyenDuong }: XeProps) => {
  return (
    <div className="text-center p-4 border rounded-md my-2 bg-slate-50 shadow-sm">
      <h2 className="font-bold text-lg text-blue-600">Xe số: {maXe}</h2>
      <p className="mt-2 text-gray-700">{tuyenDuong}</p>
    </div>
  );
};

const App = () => {
  const [tuKhoa, setTuKhoa] = useState("");

  // 1. Quét mảng gốc: Giữ lại những xe có mã xe CHỨA từ khóa
  // (Nếu tuKhoa là rỗng, nó sẽ tự động giữ lại toàn bộ xe)
  const ketQuaLoc = danhSachXe.filter(xe => xe.maXe.includes(tuKhoa));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="rounded-xl bg-white p-6 shadow-lg w-96">
        
        <label className="font-semibold text-gray-800">Tra cứu chuyến xe:</label>
        <input 
          type="text" 
          placeholder="Nhập mã xe cần tìm..."
          className="w-full mt-2 p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
          value={tuKhoa} 
          onChange={(e) => setTuKhoa(e.target.value)}
        />
        
        <div className="mt-4 max-h-80 overflow-y-auto">
          {/* 2. Dùng mảng đã lọc để in ra màn hình */}
          {ketQuaLoc.length > 0 ? (
            ketQuaLoc.map((xe) => (
              <XeCard 
                key={xe.maXe} 
                maXe={xe.maXe} 
                tuyenDuong={xe.tuyenDuong} 
              />
            ))
          ) : (
            <p className="text-center text-red-500 mt-4">Không tìm thấy chuyến xe này!</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default App;