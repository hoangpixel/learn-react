import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axiosClient from '../services/axiosClient';

const ProductPage = () => {
  const token = localStorage.getItem('token');
  if(!token)
  {
    return <Navigate to="/login" />;
  }

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Tương lai sếp mở comment đoạn này để gọi API thật từ Spring Boot:
    // const fetchProducts = async () => {
    //   try {
    //     const res = await axiosClient.get('/products');
    //     setProducts(res.data);
    //   } catch (error) {
    //     console.error("Lỗi lấy data", error);
    //   }
    // };
    // fetchProducts();

    // Tạm thời hiển thị dữ liệu giả định để test giao diện
    setProducts([
      { id: 1, name: 'Cà phê sữa đá', price: 25000 },
      { id: 2, name: 'Trà đào cam sả', price: 35000 },
      { id: 3, name: 'Bạc xỉu', price: 29000 }
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa vé VIP
    window.location.reload(); // Tải lại trang để văng ra log in
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-600">Quản Lý Sản Phẩm</h1>
          <button 
            onClick={handleLogout} 
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
          >
            Đăng xuất
          </button>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 rounded-tl-lg">ID</th>
              <th className="p-3">Tên sản phẩm</th>
              <th className="p-3 rounded-tr-lg">Giá</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.id}</td>
                <td className="p-3 font-semibold">{p.name}</td>
                <td className="p-3 text-red-500">{p.price.toLocaleString()} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductPage;