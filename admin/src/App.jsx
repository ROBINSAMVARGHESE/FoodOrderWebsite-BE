import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/orders/Orders'; 
import { Toaster, toast } from 'react-hot-toast';

const App = () => {
  const showWelcomeToast = () => {
    toast.success('Welcome to the Admin Panel!');
  };

  React.useEffect(() => {
    showWelcomeToast(); // Show toast when the component mounts
  }, []);

  return (
    <div>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} /> {/* Hot-toast container */}
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
