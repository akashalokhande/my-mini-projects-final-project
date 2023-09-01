import { Route, Routes } from "react-router-dom";
import ViewEmployee from "./component/home/ViewEmployee";
import EditEmployee from "./component/home/EditEmployee";
import AddEmpolyee from "./component/home/AddEmpolyee";
import Login from "./component/Validation/Login";
import NoteState from "./component/home/Contex.js/NoteState";
import CreateAccount from "./component/Validation/CreateAccount";


function App() {
  return (
    <>
      <NoteState>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<CreateAccount />} />
          <Route path="/AddEmpolyee" element={<AddEmpolyee />} />
          <Route path="/ViewEmployee" element={<ViewEmployee />} />
          <Route path="/EditEmployee/:id" element={<EditEmployee />} />
          <Route />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
