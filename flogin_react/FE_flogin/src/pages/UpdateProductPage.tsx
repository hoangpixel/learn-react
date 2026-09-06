import { useEffect, useState, } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import axiosClient from '../services/axiosClient';

const UpdateProductPage = () => {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  if(!token) {
    return <Navigate to="/login" />
  }

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  
  const { id } = useParams();

  useEffect(() => {
    const layThongTin = async () => {
      try {
        const res = await axiosClient.get(`/products/update/${id}`);

        if(res.data != null) {
          setName(res.data.name);
          setDescription(res.data.description);
          setPrice(res.data.price);
        } else {
          alert("Không lấy đc thông tin sản phẩm");
        }
      } catch (error) {
        alert("Xảy ra lỗi khi lấy thông tin : " + error);
        console.log(error);
      }
    };
    layThongTin();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await axiosClient.patch("/products/update", {
        id: Number(id),
        name: name,
        description: description,
        price: Number(price)
      });
      if(res.data === "ok") {
        alert("Cập nhật thông tin thành công");
        navigate("/products");
      } else {
        alert("Không cập nhật được sản phẩm");
      }
    } catch (error) {
      alert("Xảy ra lỗi khi cập nhật : " + error);
      console.log(error);
    }
  };

    return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-blue-600">Sửa thông tin sản phẩm</h2>
        
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

        <div className="mb-5">
          <label className="mb-1 block font-semibold text-gray-700">Mô tả</label>
          <input 
            type="text" 
            placeholder="Ví dụ: ngon vãi đái"
            className="w-full rounded-md border p-2 outline-none focus:border-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            onClick={handleUpdate}
            className="w-1/2 rounded-md bg-green-500 py-2 font-bold text-white hover:bg-green-600"
          >
            Lưu Sản Phẩm
          </button>
        </div>
      </div>
    </div>
    );
}

export default UpdateProductPage;