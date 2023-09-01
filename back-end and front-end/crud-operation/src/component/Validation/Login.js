import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAccount from "./CreateAccount";
import noteContext from "../home/Contex.js/NoteContext";
import { useContext } from "react";

function Login() {
  const [input, setinput] = useState([]);
  const { email, password } = input;
  const [Message, seterrorMassage] = useState("");
  let navigate = useNavigate();
  let context = useContext(noteContext);

  const handlechange = (event) => {
    setinput({ ...input, [event.target.name]: event.target.value });
  };

  const onsubmit = async (event) => {
    event.preventDefault();

    let url = "http://localhost:6003/empolyee/login";

    const { data } = await axios.post(url, input);
    try {
      if (data.success === false) {
        seterrorMassage("Your Password or email is Incorrect");
      } else {
        alert(`Your Login Successfully`);
        navigate("/ViewEmployee");
        console.log(data.data);

        // Handle successful login
        const token = localStorage.setItem("token", data.data.token);
        sessionStorage.setItem("name", data.data.name);
        sessionStorage.setItem("email", data.data.email);
        sessionStorage.setItem("mobileNumber", data.data.mobileNumber);

        


        // You can also save the token or user data received in the response in local storage or a cookie for persistent login sessions.
      }
    } catch (error) {
      // Handle login error, display an error message, etc.
      console.error(`login failed ${error}`);
    }

    console.log(data);
  };

  return (
    <>
      <main className="container-fluid d-flex justify-content-center bg-addempolyee">
        <section
          style={{ height: "100px", width: "20%", marginTop: "25vh" }}
          className="position-relative"
        >
          <form
            className="bg-light p-4 rounded-3"
            onSubmit={(event) => onsubmit(event)}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                required
                placeholder="Email address"
                aria-describedby="emailHelp"
                value={email}
                name="email"
                onChange={(event) => handlechange(event)}
              />
              <div id="emailHelp" className="form-text">
                <p>{Message}</p>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                name="password"
                onChange={(event) => handlechange(event)}
              />
            </div>
            <div className="d-flex flex-column justify-content-center">
              <button type="submit" className="btn btn-primary fw-bold">
                Login
              </button>
              <div className="d-flex mt-2 mb-0">
                <p className="me-1">Not a Member?</p>
                <p
                  className="text-primary user-select-none"
                  onClick={context.createmodal}
                >
                  Sign Up
                </p>
              </div>
            </div>
          </form>
          <div className="position-absolute top-50 start-50 translate-middle">
            {context.modal && <CreateAccount />}
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
