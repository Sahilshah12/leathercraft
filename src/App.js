import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DesignEditor from './components/DesignEditor';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { DesignProvider } from './contexts/DesignContext';
import CostEstimator from './components/CostEstimator';
import MaterialSelector from './components/MaterialSelector';
import Signin from './components/Signin';
import Profile from './components/profile';
// import './styles/variables.css';

function App() {
  return (
  <>
  <DesignProvider>
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor/:designId?" element={<DesignEditor />} />
            <Route path="/estimator" element={<CostEstimator />} />
            <Route path="/materials" element={<MaterialSelector />} />
    
          </Routes>
        </main>
      </div>
    </Router>
    
  </DesignProvider>
  </>
  );
}

export default App;
