import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Faculty from './pages/Faculty';
import About from './pages/About';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Apply from './pages/Apply';
import Insights from './pages/Insights';
import InsightDetail from './pages/InsightDetail';
import Events from './pages/Events';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:slug" element={<ProgramDetail />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/about" element={<About />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightDetail />} />
            <Route path="/events" element={<Events />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
