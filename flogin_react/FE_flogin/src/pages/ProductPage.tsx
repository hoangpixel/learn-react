import { useEffect, useState } from 'react';
import type { Product } from '../interfaces/product.type';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import axiosClient from '../services/axiosClient';
import Pagination from '../components/Pagination';
import { jwtDecode } from "jwt-decode";
import useDebounce from '../components/useDebounce';

const ProductPage = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  let authorities: string[] = [];

  if(!token) {
    return <Navigate to="/login" />;
  } else {
    try{
      const decode: any = jwtDecode(token);
      authorities = decode.authorities || [];
    }catch (error) {
      console.log("Lỗi giải mã token", error);
    }
  }

// Lấy bộ công cụ thao tác với thanh URL
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Móc dữ liệu từ URL xuống (nếu trên link không có thì cho mặc định là 0 và chuỗi rỗng)
  const urlPage = Number(searchParams.get('page')) || 0;
  const urlKeyword = searchParams.get('keyword') || '';

  const urlPrice = Number(searchParams.get('price')) || 0;

  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  
  // Vẫn cần 1 state cục bộ cho ô input để lúc gõ chữ không bị load lại URL liên tục
  const [inputKeyword, setInputKeyword] = useState(urlKeyword);

  // Đặt lịch hẹn giờ 500ms
  const debouncedKeyword = useDebounce(inputKeyword, 500);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if(debouncedKeyword !== urlKeyword) {
      const params: Record<string,string> = {page : "0"};

      if(debouncedKeyword.trim() !== "") {
        params.keyword = debouncedKeyword.trim();
      }

      if(urlPrice !== 0) {
        params.price = urlPrice.toString();
      }
      
      setSearchParams(params);
    }
    
  }, [debouncedKeyword]);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
        try {
            // Nhờ Axios tự động build link URL, xóa sổ các lệnh IF
            // Đảm bảo sếp đã gom backend về chung 1 link /search như bài trước
            const res = await axiosClient.get("/products", {
                params: {
                    page: urlPage,
                    size: 5,
                    keyword: urlKeyword === "" ? undefined : urlKeyword, 
                    price: urlPrice === 0 ? undefined : urlPrice
                }
            });
            
            setProducts(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch(error) {
            console.log(error);
        } finally {
          setIsLoading(false);
        }
    }; 

    fetchProduct();
}, [urlPage, urlKeyword, urlPrice]);

// const handleXacNhanTimKiem = () => {
//     // Chỉ định kiểu dữ liệu Record<string, string> cho object params
//     const params: Record<string, string> = { page: "0" };
    
//     // Nếu ô input có chữ (đã xóa khoảng trắng thừa), mới nhét keyword vào params
//     if (inputKeyword.trim() !== "") {
//       params.keyword = inputKeyword.trim();
//     }
    
//     if(urlPrice !== 0) {
//       params.price = urlPrice.toString();
//     }

//     // Nếu không có keyword, URL sinh ra chỉ còn ?page=0
//     setSearchParams(params);
//   };

const handlePageChange = (newPage: number) => {
    const params: Record<string, string> = { page: newPage.toString() };
    
    // Nếu đang trong quá trình tìm kiếm, giữ nguyên keyword trên URL
    if (urlKeyword !== "") {
      params.keyword = urlKeyword;
    }

    if(urlPrice !== 0) {
      params.price = urlPrice.toString();
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

  const handleChonGia = (giaMoi: string) => {
    const params: Record<string, string> = {page : "0"};

    if(urlKeyword !== "") {
      params.keyword = urlKeyword;
    }

    if(giaMoi !== "") {
      params.price = giaMoi;
    }

    setSearchParams(params);
  }


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-600">Quản Lý Sản Phẩm</h1>
          <div className="space-x-2">

            {authorities.includes("PRODUCT_CREATE") && (
                          <button className='rounded px-4 py-2 bg-green-500 text-white hover:bg-green-600' onClick={() => {navigate("/products/add")}}>Thêm sản phẩm</button>
            )}


              <button 
              onClick={handleLogout} 
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
            >
              Đăng xuất
            </button>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
            <div className="">
                <input type="text" value={inputKeyword} placeholder="Nhập tên SP cần tìm..." className="py-1 px-2 border border-blue-500 rounded outline-none focus:border-red-600"
                onChange={(e) => setInputKeyword(e.target.value)}
                />
                {/* <button className="ms-4 py-1 px-2 border border-gray-500 rounded bg-blue-200 hover:bg-blue-300"
                onClick={handleXacNhanTimKiem}
                >Tìm kiếm</button> */}
            </div>
            <div className="">
              <label className='me-3 font-bold '>Chọn giá: </label>
              <select value={urlPrice === 0 ? "" : urlPrice} onChange={(e) => handleChonGia(e.target.value)} className='border py-1 px-2 rounded outline-none focus:border-red-500'>
                  <option value="">Hãy chọn giá...</option>
                  <option value="10000">10000</option>
                  <option value="15000">15000</option>
                  <option value="20000">20000</option>
                  <option value="25000">25000</option>
                  <option value="30000">30000</option>
              </select>
            </div>
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
    {isLoading ? (
      /* Kịch bản 1: Đang tải -> Hiển thị 5 dòng Skeleton TRONG bảng */
      [...Array(5)].map((_, index) => (
        <tr key={index} className="border-b animate-pulse">
          <td className="p-3"><div className="h-6 w-12 bg-gray-300 rounded mx-auto"></div></td>
          <td className="p-3"><div className="h-6 w-3/4 bg-gray-300 rounded mx-auto"></div></td>
          <td className="p-3"><div className="h-6 w-1/2 bg-gray-300 rounded mx-auto"></div></td>
          <td className="p-3 flex justify-center gap-2">
            <div className="h-10 w-16 bg-gray-300 rounded-lg"></div>
            <div className="h-10 w-16 bg-gray-300 rounded-lg"></div>
          </td>
        </tr>
      ))
    ) : (
      /* Kịch bản 2: Tải xong -> Đổ data thật vào */
      products.map((p) => (
        <tr key={p.id} className="border-b text-center hover:bg-gray-50">
          <td className="p-3">{p.id}</td>
          <td className="p-3 font-semibold">{p.name}</td>
          <td className="p-3 text-red-500">{p.price.toLocaleString()} VNĐ</td>
          <td className="flex justify-center gap-2 p-3">
            
            {authorities.includes("PRODUCT_UPDATE") && (
              <button 
                className="w-1/2 rounded-lg bg-blue-500 px-3 py-2 font-bold text-white hover:bg-blue-600"
                onClick={() => navigate(`/products/update/${p.id}`)}
              >
                Sửa
              </button>
            )}
            
            {authorities.includes("PRODUCT_DELETE") && (
              <button 
                className="w-1/2 rounded-lg bg-red-500 px-3 py-2 font-bold text-white hover:bg-red-600"
                onClick={() => handleDelete(p.id)}
              >
                Xóa
              </button>
            )}

          </td>
        </tr>
      ))
    )}
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