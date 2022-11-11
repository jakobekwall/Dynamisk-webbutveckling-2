// import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GalleryPage from './Pages/GalleryPage';
import InfoPage from './Pages/InfoPage';
import StartPage from './Pages/StartPage';



function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Link to="/"></Link>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/InfoPage" element={<InfoPage />} />
            <Route path="/GalleryPage" element={<GalleryPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;