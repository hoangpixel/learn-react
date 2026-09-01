import { useState } from 'react';
import axiosClient from '../services/axiosClient';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const navigate = useNavigate(); //  thằng chó đẻ này dùng để khởi tạo biến điều hướng

    const handleRegister = async () => {
        if (password !== passwordRepeat) {
            alert("Mật khẩu không khớp nhau!");
            return;
        }

        try {
            const response = await axiosClient.post("/auth/register", {
                username, password,
            });

            if (response.data === "Tài khoản này đã tồn tại") {
                alert("Tài khoản đã tồn tại, vui lòng chọn tên khác!");
            } else {
                alert("Đăng ký thành công! Đang chuyển về trang Login...");
                navigate('/login');
            }
        } catch (error) {
            alert("Lỗi kết nối đến máy chủ!");
            console.error(error);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-200">
            <div className="w-96 rounded-xl bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold text-blue-600">Đăng ký</h2>
                <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    className="mb-4 w-full rounded-md border p-2 outline-none focus:border-blue-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="mb-4 w-full rounded-md border p-2 outline-none focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    className="mb-6 w-full rounded-md border p-2 outline-none focus:border-blue-500"
                    value={passwordRepeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                />
                <button
                    onClick={handleRegister}
                    className="w-full rounded-md bg-blue-500 py-2 font-bold text-white hover:bg-blue-600"
                >
                    Đăng ký tài khoản
                </button>
            </div>
        </div>
    );
}

export default RegisterPage;