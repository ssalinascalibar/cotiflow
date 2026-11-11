import { Navigate, Route, Routes } from 'react-router';
import Customers from './features/customers/Customers.tsx';
import Dashboard from './features/dashboard/Dashboard.tsx';
import Home from './features/home/Home.tsx';
import Products from './features/products/Products.tsx';
import Sidebar from './shared/components/Sidebar.tsx';

export default function App() {
  return (
    <>
      <Sidebar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
