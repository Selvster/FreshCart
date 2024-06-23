import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoimg from "../../images/freshcart-logo.svg";
import { authcontext } from "../../contexts/authContext";
import { Cartcontext } from "../../contexts/cartcontext";

export default function Navbar() {
  const { token, setToken } = useContext(authcontext);
  const { numOfCartItems, setnumOfCartItems } = useContext(Cartcontext);
  const loginNavigate = useNavigate();
  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    loginNavigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <img src={logoimg} alt="fresh cart" />
          </Link>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {token ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/Products"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link position-relative" to="/cart">
                      Cart
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {numOfCartItems}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/allorders">
                      All Orders
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-item-center">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  <i className="fa-brands me-3 fa-facebook-f"></i>
                  <i className="fa-brands me-3 fa-instagram"></i>
                  <i className="fa-brands me-3 fa-twitter"></i>
                  <i className="fa-brands me-3 fa-youtube"></i>
                </Link>
              </li>
              {token ? (
                ""
              ) : (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link className="nav-link" to="/Login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Register">
                      Register
                    </Link>
                  </li>
                </>
              )}

              {token ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link className="nav-link" to="/Profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      to="#"
                      style={{ cursor: "pointer" }}
                      onClick={logOut}
                    >
                      Sign out
                    </span>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
