import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-title">Euro 2024 Predictor</div>
            <div className="navbar-links">
                <Link to="/">Phase de groupe</Link>
                <Link to="/final-stage">Phase finale</Link>
            </div>
        </nav>
    );
};

export default Navbar;
