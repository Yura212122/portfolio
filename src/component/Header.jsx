import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          {/* Лого / Назва */}
          <NavLink className="navbar-brand fw-bold" to="/main">
            🏠 MyFurniture
          </NavLink>

          {/* Бургер для мобільних */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Меню */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/main">
                  Home
                </NavLink>
              </li>

              {/* Dropdown */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="navbarDropdown"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Меню
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/kitchen">
                      Kitchen
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/bed">
                      Bed
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/stairs">
                      Stairs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/wardrobe">
                      Wardrobe / Nightstand
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/table">
                      Table
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Кнопки справа */}
            <div className="d-flex">
              <NavLink className="btn btn-outline-light me-2" to="/login">
                Sign In
              </NavLink>
              <NavLink className="btn btn-primary" to="/register">
                Register
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
