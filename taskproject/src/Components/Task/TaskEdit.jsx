import React, { useState } from "react";
import axios from "../utils/axios";

const TaskEdit = () => {
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!taskName) {
      setErrorMessage("Name is required");
      return;
    }

    try {
      await axios.patch(`/task/${taskId}`, {
        name: taskName,
        completed: completed,
      });
    
    } catch (error) {
      console.error("Error editing task:", error);
  
    }
  };

  return (
    <div className="container" id='task-edit'>
      <form className="single-task-form" onSubmit={handleFormSubmit}>
        <h4>Edit Task</h4>
        <div className="form-control">
          <label>Task ID</label>
          <p className="task-edit-id">{taskId}</p>
        </div>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="task-edit-name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="completed">Completed</label>
          <input
            type="checkbox"
            name="completed"
            className="task-edit-completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <button type="submit" className="block btn task-edit-btn">
          Edit
        </button>
        <div className="form-alert">{errorMessage}</div>
      </form>
      <a href="index.html" className="btn back-link">
        Back to tasks
      </a>
    </div>
  );
};

export default TaskEdit;