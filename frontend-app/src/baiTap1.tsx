interface SinhVienProps {
  maSV: string;
  hoTen: string;
  diemTB: number;
}

const danhSachSinhVien = [
  { id: 1, maSV: "3123410114", hoTen: "Phạm Minh Hoàng", diemTB: 8.5 },
  { id: 2, maSV: "3123410115", hoTen: "Nguyễn Tuấn Cường", diemTB: 4.5 },
  { id: 3, maSV: "3123410116", hoTen: "Trường Anh Tuấn", diemTB: 6 },
  { id: 4, maSV: "3123410117", hoTen: "Lý Thiên Trường", diemTB: 3 },
  { id: 5, maSV: "3123410118", hoTen: "Liễu Như Yên", diemTB: 9.0 }
];

const SinhVienCard = ({ maSV, hoTen, diemTB }: SinhVienProps) => {
  // Tách logic tính toán class ra ngoài cho code sạch sẽ
  const nenCard = diemTB < 5.0 ? 'bg-red-50 dark:bg-red-950' : 'bg-white dark:bg-gray-800';
  const mauDiem = diemTB >= 8.0 ? 'text-green-600' : (diemTB < 5.0 ? 'text-red-600' : 'text-gray-600 dark:text-gray-300');

  return (
    // justify-between giúp Tên bên trái, Điểm văng sang bên phải
    <div className={`w-96 p-5 shadow-md rounded-lg flex items-center justify-between border border-gray-200 ${nenCard}`}>
      
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{hoTen}</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Mã SV: {maSV}</p>
      </div>

      <div className="flex flex-col items-end">
        <p className={`text-3xl font-bold ${mauDiem}`}>{diemTB}</p>
        
        {/* Render có điều kiện (toán tử &&): Chỉ hiển thị cục này NẾU điều kiện phía trước đúng */}
        {diemTB >= 8.0 && <span className="mt-2 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Học Bổng</span>}
        {diemTB < 5.0 && <span className="mt-2 bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Nợ Môn</span>}
      </div>

    </div>
  );
};

const App = () => {
  return (
    <div className="flex flex-col items-center gap-4 min-h-screen bg-gray-100 dark:bg-gray-900 p-10">
      {danhSachSinhVien.map(sv => (
        <SinhVienCard 
          key={sv.id}
          maSV={sv.maSV}
          hoTen={sv.hoTen}
          diemTB={sv.diemTB}
        />
      ))}
    </div>
  );
};

export default App;