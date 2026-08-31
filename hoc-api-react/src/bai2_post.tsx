import { useState } from "react";
import axios from "axios";

const App = () => {
  const [tenSP, setTenSP] = useState("");
  const [giaSP, setGiaSP] = useState(0);

  const xuLyThem = () => {
    // 1. Tạo cục dữ liệu chuẩn bị gửi đi (đóng gói)
    const duLieuMoi = {
      title: tenSP,
      price: giaSP,
      description: "Sản phẩm test từ Flogin",
      image: "https://i.pravatar.cc",
      category: "electronic"
    };

    // 2. Bắn POST Request lên server
    axios.post("https://fakestoreapi.com/products", duLieuMoi)
      .then((response) => {
        // response.data sẽ chứa đối tượng vừa được API tạo xong (kèm ID tự tăng)
        alert("Thêm thành công! Server đã cấp ID mới là: " + response.data.id);
        
        // Dọn dẹp ô nhập liệu sau khi thêm xong
        setTenSP("");
        setGiaSP(0);
      })
      .catch((error) => {
        console.log("Lỗi chà bá: ", error);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="w-96 rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-blue-600">Thêm Sản Phẩm Mới</h1>
        
        <label className="font-semibold text-gray-700">Tên sản phẩm:</label>
        <input 
          type="text" 
          className="mb-4 mt-2 w-full rounded-md border border-gray-300 p-2 outline-none focus:border-blue-500"
          value={tenSP}
          onChange={(e) => setTenSP(e.target.value)}
        />

        <label className="font-semibold text-gray-700">Giá tiền ($):</label>
        <input 
          type="number" 
          className="mb-6 mt-2 w-full rounded-md border border-gray-300 p-2 outline-none focus:border-blue-500"
          value={giaSP}
          onChange={(e) => setGiaSP(e.target.valueAsNumber)}
        />

        <button 
          onClick={xuLyThem}
          className="w-full rounded-lg bg-green-500 py-3 font-bold text-white transition-colors hover:bg-green-600"
        >
          Lưu vào Server
        </button>
      </div>
    </div>
  );
};

export default App;