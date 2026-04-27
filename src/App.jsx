import { useEffect, useState } from 'react';
import './App.css'
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer'

export default function App() {
  const [projects, setProjects] = useState(() => {
    const stored = localStorage.getItem("projects");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects])

  return (
    <div className='main-container'>
      <Header />
      <Outlet context={{ projects, setProjects}}/>
      <Footer />
    </div>
  );
};
