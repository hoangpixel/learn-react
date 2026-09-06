import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axiosClient from '../services/axiosClient';

const AddProductPage = () => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({
      ...productData, // Thằng này để giữ nguyên nhứng thằng khác
      [name]: value // ghi đè lên giá trị mới đúng cái trường đang được gõ
    });
  };

  const [errors, setErrors] = useState<Record<string,string>>({});

  // Upload file và Preview Ảnh
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }


const handleSave = async () => {
    // 1. Dọn dẹp sạch sẽ mảng lỗi cũ trước khi gửi request mới
    setErrors({});

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price.toString());
    
  if(imageFile) {
    formData.append("image", imageFile);
  }

    try {
        await axiosClient.post("/products/add", formData, {
    headers: {
        'Content-Type': 'multipart/form-data' // Báo cho server biết đây là gói hàng chứa file
    }
});
        alert("Thêm thành công!");
        navigate('/products');
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 400) {
                setErrors(error.response.data); 
            } else if (error.response.status === 500) {
                // 2. Báo động ngay nếu bị 500
                alert("Lỗi 500: Server sập! Mở console Spring Boot xem có phải lỗi trùng tên không.");
            }
        }
    }
};

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
            name="name"
            value={productData.name}
            onChange={handleInputChange}
          />
          {errors.name && <span className="text-sm font-semibold text-red-500">{errors.name}</span>}
        </div>

        <div className="mb-5">
          <label className="mb-1 block font-semibold text-gray-700">Mô tả</label>
          <input 
            type="text" 
            placeholder="Ví dụ: ngon vãi đái"
            className="w-full rounded-md border p-2 outline-none focus:border-blue-500"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-8">
          <label className="mb-1 block font-semibold text-gray-700">Giá (VNĐ)</label>
          <input
            type="number"
            placeholder="Ví dụ: 25000"
            className="w-full rounded-md border p-2 outline-none focus:border-blue-500"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
          {errors.price && <span className="text-sm font-semibold text-red-500">{errors.price}</span>}
        </div>

        <div className="mb-8">
    <label className="mb-1 block font-semibold text-gray-700">Hình ảnh sản phẩm</label>
    <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full rounded-md border p-2 outline-none focus:border-blue-500"
    />
    
    {previewUrl && (
        <div className="mt-4 border p-2 w-max bg-gray-50 rounded">
            <p className="text-sm text-gray-500 mb-2">Xem trước:</p>
            <img 
                src={previewUrl} 
                alt="Preview" 
                className="h-40 w-40 object-cover rounded-md border border-gray-300 shadow-sm" 
            />
        </div>
    )}
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