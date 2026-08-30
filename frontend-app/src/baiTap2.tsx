// const [giaTri, setGiaTri] = useState(giá_trị_mặc_định);
// giaTri: Cái biến đang chứa dữ liệu hiện tại
// setGiaTri: Cái búa ma thuật, gọi nó để đập dữ liệu cũ, thay bằng dữ liệu mới.

import { useState } from 'react';

const App = () => {
  // Khai báo state 'luotTim', giá trị mặc định lúc mới vào web là 0
  const [luotTim, setLuotTim] = useState(0);

  // Viết hàm xử lý khi ai đó bấm nút
  const xuLyThaTim = () => {
        setLuotTim(luotTim + 1);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Mạng xã hội Flogin</h1>
        
        {/* Hiển thị số lượt tim hiện tại */}
        <p className="text-4xl font-black text-red-500 mb-6">❤️ {luotTim}</p>
        
        <button 
          onClick={xuLyThaTim} // Gắn sự kiện click
          className="bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600 transition"
        >
          Thả tim
        </button>
      </div>
    </div>
  );
};

export default App;