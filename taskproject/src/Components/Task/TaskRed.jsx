import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import requests from '../utils/request'
import { Link } from "react-router-dom";

const TaskRed = () => {
    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {
      async function fetchData() {
        const request = await axios.get(requests.redAll);
        // console.log(request)
        setTasks(request?.data.task);
        // console.log(request)
        return request;
      }
      fetchData();
    }, []);

    const deleteTask = (taskId) => {
      axios.delete(`/task/${taskId}`) 
        .then(() => {
          setTasks(tasks.filter((task) => task.id !== taskId));
        })
        .catch((error) => {
          console.error('Error deleting task:', error);
        });
    };

  return (
    <>
        <section className="tasks-container">
     <div className="tasks">
       {tasks?.map((task) => (
         <div className="single-task" key={task.id}>
           <h5>
             <span>
               <i className="far fa-check-circle"></i>
             </span>
             {task.task_name}
           </h5>
           <div className="task-links">
             <Link to={`/task/${task.id}`} className="edit-link" >
               <i className="fas fa-edit" ></i>
             </Link>
             <button type="button" className="delete-btn"  onClick={() => deleteTask(task.id)}>
               <i className="fas fa-trash"></i>
             </button>
           </div>
         </div>
       ))}
     </div>
   </section>
    </>
  )
}

export default TaskRed
