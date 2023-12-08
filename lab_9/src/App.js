import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Catalog from './Components/Catalog';
import ItemPage from './Components/ItemPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/item/:id" element={<ItemPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App

