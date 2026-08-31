import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';

const App = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return <ProductPage />;
  }

  return <LoginPage />;
};

export default App;