import { useState, useEffect } from 'react'
import axios from 'axios'

interface SanPhamProps {
    id: number;
    title: string;
    price: number;
}

const App = () => {

    const [danhSach, setDanhSach] = useState<SanPhamProps[]>([]);

    // useEffect(() => {
    //     fetch("https://fakestoreapi.com/products?limit=6")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setDanhSach(data)
    //         });
    // }, []);

    useEffect(() => {

        axios.get("https://fakestoreapi.com/products?limit=6")
            .then((response) => {
                setDanhSach(response.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    return (
    <div className="min-h-screen bg-slate-200 p-8 flex flex-col items-center">
       <h1 className="text-3xl font-bold text-blue-700 mb-8">Danh Mục Sản Phẩm Flogin</h1>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* 4. Dùng map() in thẻ div sản phẩm ra đây, nhớ check mảng rỗng để hiện chữ "Đang tải..." */}
          {danhSach.length === 0 ? 
          (
            <p>Chưa có sản phẩm nào trong danh sách hết</p>
          ) : (
            danhSach.map((sp) => (
                // Bổ sung key={sp.id} và sửa lại class Tailwind
                <div key={sp.id} className="text-center p-3 rounded-lg border border-green-500 text-blue-500 font-semibold bg-white">
                    <p className="text-gray-500 mb-2">Mã SP: {sp.id}</p>
                    <p className="text-lg text-gray-900 truncate">{sp.title}</p>
                    <p className="text-red-500 mt-2">${sp.price}</p>
                </div>
            ))
          )}
       </div>
    </div>
    )
}

export default App;