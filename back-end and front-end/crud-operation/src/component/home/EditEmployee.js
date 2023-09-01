import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

function EditEmployee() {
  const { id } = useParams();
  const [employee, setemployee] = useState({
    name: "",
    Email: "",
    designation: "",
    age: "",
    Phone: "",
  });

  const { name, designation, Email, age, Phone } = employee;

  const [Message, setMassage] = useState("");

  let getemployee = async () => {
    let url = `http://localhost:6003/empolyee/${id}`;

    let { data } = await axios.get(url);
    console.log(data);
    setemployee(data.result);
  };

  useEffect(() => {
    getemployee();
  }, []);

  const handlechange = (event) => {
    setemployee({ ...employee, [event.target.name]: event.target.value });
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
        .put("http://localhost:6003/empolyee/update/" + id, employee, config)
        .then((result) => {
          setMassage("Employee upated successfully");
          window.location.assign("/ViewEmployee");

        })
        .catch((error) => alert("somthing went wrong"));
    }
  };

  return (
    <>
      <main className=" container-fluid bg-editempolyee">
        <div className=" text-success mt-5 d-flex justify-content-center">
          <div>
            <h2>{Message}</h2>
          </div>
        </div>
        <div className="forms container-fluid mt-2 d-flex justify-content-center align-items-center">
          <form
            onSubmit={(event) => submitform(event)}
            style={{ color: "#ffffffeb" }}
            className="bg-dark px-4 py-4 rounded-4"
          >
            <div className="">
              <h1>Edit Employee</h1>
            </div>

            <div className=" mt-4">
              <p className="me-2 h5">Name</p>
              <input
                type="text"
                name="name"
                size={30}
                value={name}
                onChange={(event) => handlechange(event)}
              />
            </div>
            <div className=" mt-2">
              <p className="me-2  h5 ">designation </p>
              <input
                type="text"
                name="designation"
                size={30}
                value={designation}
                onChange={(event) => handlechange(event)}
              />
            </div>
            <div className=" mt-2">
              <p className="me-2  h5 ">Email </p>
              <input
                type="text"
                name="Email"
                size={30}
                value={Email}
                onChange={(event) => handlechange(event)}
              />
            </div>
            <div className=" mt-2">
              <p className="me-2  h5">age </p>
              <input
                type="text"
                name="age"
                size={30}
                value={age}
                onChange={(event) => handlechange(event)}
              />
            </div>
            <div className=" mt-2">
              <p className="me-2  h5">Phone </p>
              <input
                type="text"
                name="Phone"
                size={30}
                value={Phone}
                onChange={(event) => handlechange(event)}
              />
            </div>
            <div className=" mt-3 row d-flex justify-content-center">
              <button className="btn btn-primary fs-5 fw-semibold col-6">
                Update
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default EditEmployee;
