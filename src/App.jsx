import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import FinalStage from './pages/FinalStage';
import Navbar from './components/Navbar';
import { ResultsProvider } from './ResultsContext';
import './App.css';

const App = () => {
  return (
    <ResultsProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/final-stage" element={<FinalStage />} />
        </Routes>
      </Router>
    </ResultsProvider>
  );
};

export default App;
