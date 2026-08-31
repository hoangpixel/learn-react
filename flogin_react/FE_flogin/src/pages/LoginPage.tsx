import { useState } from 'react';
import axiosClient from '../services/axiosClient';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axiosClient.post('/auth/login', {
        username,
        password,
      });
      
      // Lấy token từ Map mà Spring Boot trả về
      const token = response.data.token;
      
      // Lưu vào két sắt của trình duyệt
      localStorage.setItem('token', token);
      alert('Đăng nhập thành công! Đã cất vé VIP.');
      window.location.reload();
      
    } catch (error) {
      alert('Sai tài khoản hoặc mật khẩu!');
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="w-96 rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-blue-600">Đăng Nhập</h2>
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
          className="mb-6 w-full rounded-md border p-2 outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full rounded-md bg-blue-500 py-2 font-bold text-white hover:bg-blue-600"
        >
          Vào Hệ Thống
        </button>
      </div>
    </div>
  );
};

export default LoginPage;