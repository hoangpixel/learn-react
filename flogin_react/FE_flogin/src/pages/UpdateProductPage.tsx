import { useEffect, useState, } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import axiosClient from '../services/axiosClient';

const UpdateProductPage = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    if(!token){
        return <Navigate to="/login" />
    }
    
    const { id } = useParams();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        const layThongTinId = async () => {
        try{
            const resInfo = await axiosClient.get(`/products/update/${id}`);
            setName(resInfo.data.name);
            setPrice(resInfo.data.price);
        }catch(error){
            alert("Xảy ra lỗi khi lấy thông tin sản phẩm" + error);
            console.log(error);
        }
    };
            layThongTinId();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const res = await axiosClient.patch("/products/update", {
                id: Number(id),
                name: name,
                price: Number(price),
            });

            if (res.data === "Sửa thông tin sản phẩm thành công") {
                alert("Sửa thông tin sản phẩm thành công");
                navigate("/products");
            } else {
                alert("Sửa thông tin sản phẩm thất bại");
            }
        } catch (error) {
            alert("Xảy ra lỗi khi cập nhật dữ liệu sản phẩm");
            console.log(error);
        }
    }

    return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-blue-600">Sửa thông tin món</h2>
        
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