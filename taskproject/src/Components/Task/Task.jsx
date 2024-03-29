import React, { useState } from "react";
import axios from "../utils/axios";
import request from '../utils/request'

function Task() {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const Submit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(request.create, { name });
      const { taskId } = response.data;
      console.log(`Task created with ID: ${taskId}`);
      setName("");
      if (!name){
        setErrorMessage("Name is required");
        console.error("Error inserting task");
        return;
			}
			if (response) {
				window.location.reload();
			} 
			console.log(data);
		} catch (error) {
			console.error("Error on adding task:", error.message);
		}
    
  };

  return (
    <>
    <form className="task-form" onSubmit={Submit}>
      <h4>Task Manager</h4>
      <div className="form-control">
        <input
          type="text"
          name="name"
          placeholder="e.g. learn nodejs" 
          className="task-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn submit-btn" onClick={() => {
						Submit();
					}} >
          Add
        </button>
      </div>
      <div className="form-alert alert-danger">{errorMessage}</div>
    </form>
   </>
  );
}

export default Task;

