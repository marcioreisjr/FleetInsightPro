import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Inventory dropdown menu */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/manufacturer/create">Create Manufacturer</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/manufacturer/list">List Manufacturers</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/model/create">Create Model</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/model/list">List Models</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/automobile/create">Create Automobile</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/automobile/list">List Automobiles</NavLink>
                </li>
              </ul>
            </li>
            {/* Sales dropdown menu */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/">Action</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/">Another Action</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/">Something Else Here</NavLink>
                </li>
              </ul>
            </li>
            {/* Services dropdown menu */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Services
              </a>
              <ul className="dropdown-menu">
              <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/">Action</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/">Another Action</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/">Something Else Here</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
