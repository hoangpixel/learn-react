import { useState } from "react";

const App = () => {
    const [tenSanPham, setTenSanPham] = useState("");
    const [giaTien, setGiaTien] = useState(0);

    return (

        <div className="flex items-center justify-center h-screen bg-gray-400">
            <div className="flex bg-white-500 gap-3">
                <div className="bg-white p-5 rounded-lg w-1/2">
                        <label htmlFor="">Tên sản phẩm: </label>
                        <input type="text" className="w-full p-2 border" value={tenSanPham} onChange={(e) => {setTenSanPham(e.target.value)}}/> <hr />
                        <label htmlFor="">Giá sản phẩm: </label>
                        <input type="number" className="w-full p-2 border" value={giaTien} onChange={(e) => {setGiaTien(e.target.valueAsNumber)}}/>
                </div>
                <div className="bg-white p-5 rounded-lg w-1/2">
                        <p>Tên sản phẩm : </p>
                        <p className="mt-1">{tenSanPham}</p>
                        <p className="mt-3">Giá sản phẩm : </p>
                        <p className="mt-1">{giaTien}</p>
                </div>
            </div>
        </div>

    );
}

export default App;