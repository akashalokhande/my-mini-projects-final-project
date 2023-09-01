import { useState } from "react";
import Menu from "./Menu";
import axios from "axios";
import jwtDecode from "jwt-decode";

function AddEmpolyee(props) {
  const [employee, setemployee] = useState({
    name: "",
    designation: "",
    age: "",
    Phone: "",
    Email: "",
  });

  const { name, designation, Email, age, Phone } = employee;

  const [Message, seterrorMassage] = useState("");

  const handlechange = (event) => {
    setemployee({ ...employee, [event.target.name]: event.target.value });
    console.log(employee);
  };

  const submitform = async (event) => {
    event.preventDefault();

    // Get token from local storage or cookie
    let token = localStorage.getItem("token");
    // Assuming you're using a library like jwt_decode to decode the token
    const decodedToken = jwtDecode(token);
    // Convert expiration time to milliseconds
    const expirationTime = decodedToken.exp * 1000;

    if (Date.now() >= expirationTime) {
      // Token has expired, handle accordingly (e.g., show login screen)
      alert("your login is expire please login again");
      window.location.assign("/");
    } else {
      // Token is still valid, proceed with making API requests
      const config = {
        headers: { Authorization: token },
      };

      await axios
        .post("http://localhost:6003/empolyee/add", employee, config)
        .then((result) => {
          console.log(result);
          if (result.data.success === false) {
            seterrorMassage("This Email OR Phone Is already Register");
          } else {
            alert("Employee Added Successfully");
            window.location.assign("/ViewEmployee");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <main className=" bg-addempolyee">
        <Menu input="d-none"/>
        <div className="d-flex justify-content-center mt-5">
          <h2 className="text-danger">{Message}</h2>
        </div>
        <div className="container-fluid mt-2 forms d-flex justify-content-center">
          <form
            onSubmit={(event) => submitform(event)}
            style={{ color: "#ffffffeb" }}
            className="bg-dark rounded-4 px-4 pb-4"
          >
            <div className="mt-4">
              <h1>Add Employee</h1>
            </div>

            <div className="mt-4">
              <p className="me-2 h5">Full Name</p>
              <input
                type="text"
                name="name"
                className=""
                required
                value={name}
                size={30}
                onChange={(event) => handlechange(event)}
              />
            </div>
            <div className="mt-2">
              <p className="me-2  h5 ">designation </p>
              <input
                type="text"
                name="designation"
                required
                value={designation}
                size={30}
                onChange={(event) => handlechange(event)}
              />
            </div>
            <div className="mt-2">
              <p className="me-2  h5 ">Email </p>
              <input
                type="text"
                name="Email"
                value={Email}
                required
                size={30}
                onChange={(event) => handlechange(event)}
              />
            </div>
            <div className="mt-2">
              <p className="me-2  h5">age </p>
              <input
                type="text"
                name="age"
                required
                value={age}
                size={30}
                onChange={(event) => handlechange(event)}
              />
            </div>
            <div className="mt-2">
              <p className="me-2  h5">Phone </p>
              <input
                type="text"
                name="Phone"
                required
                value={Phone}
                size={30}
                onChange={(event) => handlechange(event)}
              />
            </div>
            <div className="mt-3 row d-flex justify-content-center">
              <button className="btn btn-success col-6 fs-5 fw-semibold ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default AddEmpolyee;
