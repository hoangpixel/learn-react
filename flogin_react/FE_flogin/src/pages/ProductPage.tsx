import { useEffect, useState } from 'react';
import type { Product } from '../interfaces/product.type';
import { Navigate } from 'react-router-dom';
import axiosClient from '../services/axiosClient';
import Pagination from '../components/Pagination';

const ProductPage = () => {
  const token = localStorage.getItem('token');
  
  if(!token) {
    return <Navigate to="/login" />;
  }

  // Đã thêm mảng rỗng [] vào trong ngoặc tròn
  const [products, setProducts] = useState<Product[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // 1. Khai báo hàm
    const fetchProduct = async () => {
      try {
        const res = await axiosClient.get(`/products?page=${currentPage}&size=5`);
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
      } catch(error) {
        alert("Không có danh sách");
        console.log(error);
      }
    }; // Dấu ngoặc nhọn này là kết thúc khai báo hàm

    // 2. Gọi hàm thực thi (phải nằm ngoài phần khai báo trên)
    fetchProduct();
  }, [currentPage]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.reload(); 
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

            <Pagination 
            
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}

            />

    </div>
  );
};

export default ProductPage;