import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import FinalStage from './pages/FinalStage';
import Navbar from './components/Navbar';
import { ResultsProvider } from './ResultsContext';
import './App.css';

const App = () => (
  <ResultsProvider>
    <Router basename="/projects/euro2024predicator">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/final-stage" element={<FinalStage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </ResultsProvider>
);

export default App;
