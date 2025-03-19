import React, { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask]=useState()
  const handleAdd =() => {
      axios.post('http://localhost:3001/add',{task:task})
      .then(result => console.log(result))
      .catch(err => console.error(err))
  }
  return (
    <div className="create-container">
      <input type="text" placeholder="Enter your todo..." onChange={(e)=>{setTask(e.target.value)}} />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
