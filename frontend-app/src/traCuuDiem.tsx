import {useState} from 'react'
interface NganhProps {
    maNganh: string;
    tenNganh: string;
    diemChuan: number;
}

const danhSachNganh = [
    {id: 1, maNganh: "DCT1", tenNganh: "Công nghệ thông tin", diemChuan: 24.5},
    {id: 2, maNganh: "DKP1", tenNganh: "Kỹ thuật phần mềm", diemChuan: 25.2},
    {id: 3, maNganh: "DKH1", tenNganh: "Khoa học máy tính", diemChuan: 25.0},
    {id: 4, maNganh: "DQT1", tenNganh: "Quản trị kinh doanh", diemChuan: 23.5}
];

const NganhCard = ({maNganh, tenNganh, diemChuan}: NganhProps) => {
    return (
        <div className="text-center p-4 bg-white rounded-lg border shadow-sm my-2">
            <h1 className="font-bold text-lg text-blue-200">{maNganh}</h1>
            <h3 className="mt-2">{tenNganh}</h3>
            <p className={`mt-2 ${diemChuan >= 25.0 ? 'text-red-500 font-bold' : 'text-green-500 font-semibold'}`}>{diemChuan}</p>
        </div>
    );
};

const App = () => {
    const [tuKhoa, setTuKhoa] = useState("");
    const [diemCuaToi, setDiemCuaToi] = useState(30);

    const ketQuaLoc = danhSachNganh.filter((nganh) => {
    // 1. Ép cả 2 bên về chữ thường rồi mới so sánh
    const khopTen = nganh.tenNganh.toLowerCase().includes(tuKhoa.toLowerCase());
    
    // 2. So sánh bằng toán tử số học <= (Dùng isNaN để phòng hờ sếp xóa trắng ô input)
    const khopDiem = nganh.diemChuan <= (isNaN(diemCuaToi) ? 30 : diemCuaToi);
    
    // 3. Nhớ chữ return nha sếp
    return khopTen && khopDiem; 
});

    return (

        <div className="flex items-center justify-center bg-gray-500 min-h-screen p-6">

            <div className="rounded-lg border p-4 bg-white shadow-lg w-80">
                <label className='font-semibold text-gray-800'>Tên ngành: </label>
                <input type="text" className='w-full p-2 border rounded-sm border-gray-300 outline-non focus:border-blue-500 mb-2' value={tuKhoa} onChange={(e) => {setTuKhoa(e.target.value)}}/>
                <label className="font-semibold text-gray-800">Điểm chuẩn: </label>
                <input type="number" className='w-full p-2 border rounded-sm border-gray-300 focus:border-blue-500 mb-2' value={diemCuaToi} onChange={(e) => {setDiemCuaToi(e.target.valueAsNumber)}}/>

                <div className="mt-3 border p-2 rounded-sm">
                    {ketQuaLoc.length > 0 ? (
                        ketQuaLoc.map((nganh) => (
                            <NganhCard 
                                key={nganh.id}
                                maNganh={nganh.maNganh}
                                tenNganh={nganh.tenNganh}
                                diemChuan={nganh.diemChuan}
                            />
                        ))
                    ) : (
                        <p>Không có kết quả tìm kiếm</p>
                    )}
                </div>
            </div>
        </div>

    );
}

export default App;