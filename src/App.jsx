import { useEffect, useState } from 'react';
import './App.css'
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer'

export default function App() {
  const initialState = {
    projects: {
      byID: {},
      allIDs: []
    },
    todos: {
      byID: {},
      allIDs: []
    }
  };

  function loadState() {
    try {
      const stored = localStorage.getItem("state");
      if (!stored) return initialState;

      const parsed = JSON.parse(stored);

      // validation guard
      if (!parsed.projects || !parsed.projects.byID || !parsed.projects.allIDs) {
        return initialState;
      }

      if (!parsed.todos || !parsed.todos.byID || !parsed.todos.allIDs) {
        return initialState;
      }

      return parsed;
    } catch {
      return initialState;
    }
  }

  const [state, setState] = useState(loadState);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state])

  return (
    <div className='main-container'>
      <Header />
      <Outlet context={{ state, setState}}/>
      <Footer />
    </div>
  );
};
