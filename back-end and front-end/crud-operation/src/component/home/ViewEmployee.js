import { useContext, useEffect, useState } from "react";
import Menu from "./Menu";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import jwtDecode from "jwt-decode";
import noteContext from "./Contex.js/NoteContext";

function ViewEmployee() {
  let [employee, setemployee] = useState([]);
  
  const context = useContext(noteContext);
 
  let getemployeelist = async () => {
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
      let url = "http://localhost:6003/empolyee/employees";
      let { data } = await axios.get(url, config);

      console.log(data.result);
      setemployee(data.result);
    }
  };

  let deleteemplyee = async (id) => {
    let url = `http://localhost:6003/empolyee/delete/${id}`;

    await axios
      .delete(url)

      .then(() => {
        getemployeelist();
      })
      .catch((error) => alert("could not delete" + error));
  };

  useEffect(() => {
    getemployeelist();
  }, []);

  return (
    <>
      <main className="vh-100 bg-viewempolyee">
        <Menu/>

        <div className="container">
          <div className=" text-center m-4" style={{ color: "#fffffff2" }}>
            <h1>View Employee</h1>
          </div>

          <table className="table table-bordered border-dark shadow-lg">
            <thead>
              <tr className="table-primary">
                <th scope="col">Sr. No.</th>
                <th scope="col">Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Email</th>
                <th scope="col">age</th>
                <th scope="col">Phone</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody className="table-secondary">
              {employee
                .filter((value) => {
                  return context.search.toLowerCase() === ""
                    ? value
                    : value.name.toLowerCase().includes(context.search);
                })
                .map((value, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{value.name}</td>
                    <td>{value.designation}</td>
                    <td>{value.Email}</td>
                    <td>{value.age}</td>
                    <td>{value.Phone}</td>
                    <td>
                      <Link
                        className="text-decoration-none text-primary"
                        to={`/EditEmployee/${value._id}`}
                      >
                        <MdModeEdit />
                      </Link>
                    </td>
                    <td>
                      <Link
                        to=""
                        className="text-decoration-none text-danger h4"
                        onClick={() => deleteemplyee(value._id)}
                      >
                        <MdDeleteForever />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default ViewEmployee;
