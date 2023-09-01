import React from "react";
import {
  MdMale,
  MdMan,
  MdPassword,
  MdPauseCircle,
  MdPerson,
  MdPerson2,
  MdPerson3,
  MdPerson4,
  MdPersonOutline,
  MdPersonPinCircle,
} from "react-icons/md";

function Logout() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.assign("/");
  };

  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const MobileNumber = sessionStorage.getItem("mobileNumber");

  return (
    <>
      <main className="d-flex">
        <div className="dropdown ms-3 ">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {name}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item" type="button">
                {email}
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                {MobileNumber}
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-black"
                onClick={handleLogout}
                type="button"
              >
                Logout
              </button>
            </li>
          </ul>
          <span className="text-white h3"><MdPerson/></span>
        </div>
      </main>
    </>
  );
}

export default Logout;
