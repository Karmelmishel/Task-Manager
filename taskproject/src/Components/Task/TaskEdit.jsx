import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from '../utils/axios';

const TaskEdit = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [completed, setCompleted] = useState(false);
  
    useEffect(() => {
        
        const fetchTask = async () => {
            try {
              const response = await axios.get(`/task/${id}`);
              const data = response.data;
              setName(data[0].task_name);
              setCompleted(data[0].completed);
            } catch (error) {
              console.error('Error fetching task:', error);
            }
          };
  
      fetchTask();
    }, [id]);
  
    const edit = async (taskId, updatedName, updatedCompleted) => {
      try {
        const response =await axios.patch(`/task/${taskId}`, {
        name: updatedName,
        completed: updatedCompleted,
      });
  
        if (response.ok) {
          // Task updated successfully, you can redirect or show a success message
          console.log("Task updated successfully");
        } else {
          // Handle error response
          console.log("Error updating task");
        }
      } catch (error) {
        console.log("Error: unable to update task", error);
      }
    };
  
    return (
      <form className="single-task-form">
        <h4>Edit Task</h4>
        <div className="form-control">
          <label>Task ID</label>
          <p className="task-edit-id">{id}</p>
        </div>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            // placeholder={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="completed">Completed</label>
          <input
            type="checkbox"
            name="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="task-edit-completed"
          />
        </div>
        <button
          type="submit"
          className="block btn task-edit-btn"
          onClick={() => edit(id, name, completed)}
        >
          Edit
        </button>
        <div className="form-alert"></div>
        <Link to="/" className="btn back-link">
          Back to tasks
        </Link>
      </form>
    );
}

export default TaskEdit
