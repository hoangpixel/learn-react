import { useEffect, useState } from 'react';
import type { Product } from '../interfaces/product.type';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import axiosClient from '../services/axiosClient';
import Pagination from '../components/Pagination';

const ProductPage = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  if(!token) {
    return <Navigate to="/login" />;
  }

// Lấy bộ công cụ thao tác với thanh URL
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Móc dữ liệu từ URL xuống (nếu trên link không có thì cho mặc định là 0 và chuỗi rỗng)
  const urlPage = Number(searchParams.get('page')) || 0;
  const urlKeyword = searchParams.get('keyword') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  
  // Vẫn cần 1 state cục bộ cho ô input để lúc gõ chữ không bị load lại URL liên tục
  const [inputKeyword, setInputKeyword] = useState(urlKeyword);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let url = `/products?page=${urlPage}&size=5`;
        
        if (urlKeyword !== "") {
           url = `/products/search?page=${urlPage}&size=5&keyword=${urlKeyword}`;
        }

        const res = await axiosClient.get(url);
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
      } catch(error) {
        console.log(error);
      }
    }; 

    fetchProduct();
  }, [urlPage, urlKeyword]); // Cảm biến giờ đây theo dõi trực tiếp thanh URL!

const handleXacNhanTimKiem = () => {
    // Chỉ định kiểu dữ liệu Record<string, string> cho object params
    const params: Record<string, string> = { page: "0" };
    
    // Nếu ô input có chữ (đã xóa khoảng trắng thừa), mới nhét keyword vào params
    if (inputKeyword.trim() !== "") {
      params.keyword = inputKeyword.trim();
    }
    
    // Nếu không có keyword, URL sinh ra chỉ còn ?page=0
    setSearchParams(params);
  };

const handlePageChange = (newPage: number) => {
    const params: Record<string, string> = { page: newPage.toString() };
    
    // Nếu đang trong quá trình tìm kiếm, giữ nguyên keyword trên URL
    if (urlKeyword !== "") {
      params.keyword = urlKeyword;
    }
    
    setSearchParams(params);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.reload(); 
  };

  const handleDelete = async (id: number) => {
      if(window.confirm("Chắc chắn chưa bro???")){
        try{
          const resDelete = await axiosClient.delete(`/products/delete/${id}`);
          if(resDelete.data === "Xóa sản phẩm thành công"){
            alert("Xóa sản phẩm thành công");
            setProducts(products.filter((p) => p.id !== id));
          }
        }catch(error){
          alert("Xảy ra lỗi khi xóa sản phẩm" + error);
          console.log(error);
        }
      }
  }

  // Tìm kiếm cơ bản nè


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-600">Quản Lý Sản Phẩm</h1>
          <div className="space-x-2">
            <button className='rounded px-4 py-2 bg-green-500 text-white hover:bg-green-600' onClick={() => {navigate("/products/add")}}>Thêm sản phẩm</button>
              <button 
              onClick={handleLogout} 
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
            >
              Đăng xuất
            </button>
          </div>
        </div>

        <div className="mb-4">
            <input type="text" value={inputKeyword} placeholder="Nhập tên SP cần tìm..." className="py-1 px-2 border border-blue-500 rounded outline-none focus:border-red-600"
            onChange={(e) => setInputKeyword(e.target.value)}
            />
            <button className="ms-4 py-1 px-2 border border-gray-500 rounded bg-blue-200 hover:bg-blue-300"
            onClick={handleXacNhanTimKiem}
            >Tìm kiếm</button>
        </div>
        
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800 text-center text-white">
            <th className="rounded-tl-lg p-3">ID</th>
            <th className="p-3">Tên sản phẩm</th>
            <th className="p-3">Giá</th>
            <th className="rounded-tr-lg p-3">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b text-center hover:bg-gray-50">
              <td className="p-3">{p.id}</td>
              <td className="p-3 font-semibold">{p.name}</td>
              <td className="p-3 text-red-500">{p.price.toLocaleString()} VNĐ</td>
              
              {/* Thêm flex và justify-center để 2 nút canh giữa, cách đều nhau */}
              <td className="flex justify-center gap-2 p-3">
                
                <button 
                  className="w-1/2 rounded-lg bg-blue-500 px-3 py-2 font-bold text-white hover:bg-blue-600"
                  onClick={() => navigate(`/products/update/${p.id}`)}
                >
                  Sửa
                </button>
                
                <button 
                  className="w-1/2 rounded-lg bg-red-500 px-3 py-2 font-bold text-white hover:bg-red-600"
                  // Thay vì navigate, tui gợi ý sếp gọi thẳng một hàm handleDelete ở đây
                  onClick={() => handleDelete(p.id)}
                >
                  Xóa
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

            <Pagination 
            
                currentPage={urlPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}

            />

    </div>
  );
};

export default ProductPage;