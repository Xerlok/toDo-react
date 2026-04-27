import { useState } from 'react';
import './App.css'
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer'

export default function App() {
  const [projects, setProjects] = useState([
    { id: 1, projectName: 'kek project 1', todos: [] },
    { id: 2, projectName: 'kek project 2', todos: [] }
  ]);
  const [todos, setTodos] = useState([
    { id:1, todoName: 'Shit yourself', completed: true },
    { id:2, todoName: 'Piss in a sink', completed: false }
  ]);

  return (
    <div className='main-container'>
      <Header />
      <Outlet context={{ projects, setProjects, todos, setTodos}}/>
      <Footer />
    </div>
  );
};
