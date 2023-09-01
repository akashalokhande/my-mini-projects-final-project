import { Link } from "react-router-dom";
import Logout from "../Validation/Logout";
import { useContext } from "react";
import noteContext from "./Contex.js/NoteContext";

function Menu(props) {
  const context = useContext(noteContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-black">
        <div className="container-fluid">
          <Link
            className="text-decoration-none text-black btn btn-info"
            to="/ViewEmployee"
          >
            List Employee
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
          <div
            className="collapse navbar-collapse ms-4"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="text-decoration-none text-black btn btn-warning "
                  to="/AddEmpolyee"
                >
                  Add Empolyee
                </Link>
              </li>
              <li className="nav-item">
                <Logout />
              </li>
            </ul>
            <form className={`d-flex ${props.input}`} role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={context.search}
                onChange={context.searchfilter}
              />
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Menu;
