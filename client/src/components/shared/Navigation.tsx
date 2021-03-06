import { NavLink } from 'react-router-dom';

const Navigation = () => (
    <nav className="navbar navbar-expand-lg navbar-light" style={{borderBottom: '3px solid rgba(50, 63, 149, 1)'}}>
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                    <NavLink to={'/'} className='nav-link'>Nests</NavLink>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">My Listings</a>
                </li>
                <li className="nav-item">
                    <NavLink to={'/dashboard'} className="nav-link">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/login'} className="nav-link">Login</NavLink>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled">Disabled</a>
                </li>
            </ul>
            <form className="d-flex">
                <input type="text" className="form-control me-2" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
    </nav>
);

export default Navigation;
