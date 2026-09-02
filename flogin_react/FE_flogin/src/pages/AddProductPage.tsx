import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axiosClient from '../services/axiosClient';

const AddProductPage = () => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

    const handleSave = async () => {
    if (!name) {
      alert('Không được để trống tên!');
      return;
    }

    if (!price) {
      alert("Không được để trống giá!");
      return;
    }

    try {
      const res = await axiosClient.post('/products/add', {
        name: name,
        price: Number(price)
      });

      // So sánh trực tiếp với câu chữ Backend trả về
      if (res.data === "Thêm sản phẩm thành công") {
        alert("Thêm sản phẩm thành công!");
        navigate("/products");
      } else {
        alert("Thêm sản phẩm thất bại từ phía máy chủ!");
      }

    } catch (error) {
      alert("Đã xảy ra lỗi kết nối: " + error);
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-blue-600">Thêm Món Mới</h2>
        
        <div className="mb-4">
          <label className="mb-1 block font-semibold text-gray-700">Tên sản phẩm</label>
          <input
            type="text"
            placeholder="Ví dụ: Cà phê sữa đá"
            className="w-full rounded-md border p-2 outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <label className="mb-1 block font-semibold text-gray-700">Giá (VNĐ)</label>
          <input
            type="number"
            placeholder="Ví dụ: 25000"
            className="w-full rounded-md border p-2 outline-none focus:border-blue-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/products')}
            className="w-1/2 rounded-md bg-gray-400 py-2 font-bold text-white hover:bg-gray-500"
          >
            Quay lại
          </button>
          <button
            onClick={handleSave}
            className="w-1/2 rounded-md bg-green-500 py-2 font-bold text-white hover:bg-green-600"
          >
            Lưu Sản Phẩm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;