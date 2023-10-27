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
                  <NavLink className="nav-link text-dark" to="/manufacturers/create">Create Manufacturer</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/manufacturers">List Manufacturers</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/models/create">Create Model</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/models">List Models</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/automobiles/create">Create Automobile</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/automobiles">List Automobiles</NavLink>
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
                  <NavLink className="nav-link text-dark" to="/salespeople">Salespeople</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/salespeople/create">Add a Salesperson</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/customers">Customers</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/customers/create">Add a Customer</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/sales">Sales</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/sales/create">Add a Sale</NavLink>
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
                  <NavLink className="nav-link text-dark" to="/technicians/add">Add Technicians</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/technicians">List Technicians</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/appointments/create">Create Appointment</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/appointments">Service Appointments</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link text-dark" to="/appointments/services">Service List</NavLink>
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
