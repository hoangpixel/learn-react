interface XeBusProps {
  maXe: string;
  tuyenDuong: string;
  soGheTrong: number;
  dangChay: boolean;
}

// 1. Sửa thành Chữ In Hoa
const ChuyenXeCard = ({ maXe, tuyenDuong, soGheTrong, dangChay }: XeBusProps) => {
  return (
    <div className="w-72 rounded-xl bg-white p-5 shadow-md">
      <h2 className="text-xl font-bold text-gray-800">{maXe}</h2>
      <p className="mt-1 text-sm text-gray-600">{tuyenDuong}</p>

      <button
        className={`mt-4 w-full rounded-lg px-4 py-2 font-medium text-white transition-colors ${
          // 2. Gộp logic màu: Không chạy -> Xám, Chạy + Hết chỗ -> Đỏ, Chạy + Còn chỗ -> Xanh
          !dangChay ? 'bg-gray-400' : (soGheTrong === 0 ? 'bg-red-500' : 'bg-green-500')
        }`}
      >
        {/* 3. Bắt đủ 3 trường hợp text */}
        {!dangChay 
          ? 'Chưa khởi hành' 
          : (soGheTrong === 0 ? 'Hết chỗ' : `Đang chạy - Còn ${soGheTrong} chỗ`)}
      </button>

      <div className="rounded-xl bg-white p-5 shadow-md transition-colors dark:bg-gray-800">
  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
    Server Minecraft Survival
  </h2>
  <p className="mt-2 text-gray-600 dark:text-gray-300">
    Tình trạng: Mượt mà (Ping: 12ms)
  </p>
</div>
    </div>
  );
};

const App = () => {
  const danhSachXe = [
    { id: 1, maXe: "BUS-01", tuyenDuong: "Sài Gòn Uni - Q7", soGheTrong: 15, dangChay: true },
    { id: 2, maXe: "BUS-02", tuyenDuong: "Sài Gòn Uni - Q1", soGheTrong: 0, dangChay: true },
    { id: 3, maXe: "BUS-03", tuyenDuong: "Sài Gòn Uni - Thủ Đức", soGheTrong: 40, dangChay: false },
  ];

  return (
    <div className="flex min-h-screen flex-wrap items-center justify-center gap-6 bg-slate-100 p-10">
      {danhSachXe.map((chuyenXe) => (
        <ChuyenXeCard // Gọi lại đúng tên In Hoa
          key={chuyenXe.id}
          maXe={chuyenXe.maXe}
          tuyenDuong={chuyenXe.tuyenDuong}
          soGheTrong={chuyenXe.soGheTrong}
          dangChay={chuyenXe.dangChay}
        />
      ))}
    </div>
  );
};

export default App;