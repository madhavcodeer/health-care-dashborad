
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import RiskPrediction from './pages/RiskPrediction';
import Departments from './pages/Departments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="risk" element={<RiskPrediction />} />
          <Route path="departments" element={<Departments />} />
          <Route path="settings" element={<div className="p-10 text-center text-slate-500">Settings Module Placeholder</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
