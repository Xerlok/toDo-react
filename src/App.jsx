import { useState } from 'react';
import './App.css'
import Header from './components/Header/Header';
import MainWindow from './components/MainWindow/MainWindow';
import Footer from './components/Footer/Footer'

export default function App() {
  const [projects, setProjects] = useState([]);

  return (
    <div>
      <Header />
      <MainWindow projects = {projects} setProjects = {setProjects}/>
      <Footer />
    </div>
  );
};
