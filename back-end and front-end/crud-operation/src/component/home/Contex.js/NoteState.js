import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = ({ children }) => {
  const [modal, setmodal] = useState(false);
  let [search, setsearch] = useState("");
 
  const createmodal = () => {
    setmodal(!modal);
    console.log("on click");
  };

 const searchfilter = (e)=>{
     let {value} = e.target
     setsearch(value)
 }

  return (
    <NoteContext.Provider
      value={{
        createmodal,
        modal,
        search,
        searchfilter
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
