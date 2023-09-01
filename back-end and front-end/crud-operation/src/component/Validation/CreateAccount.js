import axios from "axios";
import { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import noteContext from "../home/Contex.js/NoteContext";

function CreateAccount() {
  const cotext = useContext(noteContext)
  const [input, setinput] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [Message, seterrorMassage] = useState("");
  const { name, email, mobileNumber, password } = input;

  const handlechange = (event) => {
    setinput({ ...input, [event.target.name]: event.target.value });
  };

  const submitform = async (event) => {
    event.preventDefault();

    let url = "http://localhost:6003/empolyee/register";
    const { data } = await axios.post(url, input);

    try {
      if (data.success === true) {
        alert("Account Created Successfully");
        window.location.assign("/");
      } else {
        seterrorMassage("This Email Is already Register");
      }
    } catch (error) {
      console.error(error);
    }

    console.log(data);
  };

  return (
    <>
      <main className="container">
        <div className="d-flex justify-content-center mt-5">
          <h2 className="text-danger">{Message}</h2>
        </div>
        <div className="container-fluid mt-2 forms d-flex justify-content-center">
          <form
            onSubmit={(event) => submitform(event)}
            style={{ color: "#ffffffeb" }}
            className="bg-dark rounded-4 px-4 pb-4"
          >
             <div className="mt-4 d-flex justify-content-between h4">
              <h1>Sign Up</h1>
               <MdClose onClick={cotext.createmodal}/>  
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
              <p className="me-2  h5 ">Email</p>
              <input
                type="email"
                name="email"
                required
                value={email}
                size={30}
                onChange={(event) => handlechange(event)}
              />
            </div>
            <div className="mt-2">
              <p className="me-2  h5 ">Mob.No</p>
              <input
                type="text"
                name="mobileNumber"
                value={mobileNumber}
                required
                size={30}
                onChange={(event) => handlechange(event)}
              />
            </div>

            <div className="mt-2">
              <p className="me-2  h5">Password </p>
              <input
                type="text"
                name="password"
                required
                value={password}
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

export default CreateAccount;
