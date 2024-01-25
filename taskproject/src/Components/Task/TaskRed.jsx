import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import requests from '../utils/request'

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
   
    const editTask = (taskId) => {
      axios.get(`/task/${taskId}`) 
        .then(() => {
          setTasks(tasks.filter((task) => task_name == taskId));
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
             <a href="#task-edit" className="edit-link" onClick={() => editTask(task.task_name)}>
               <i className="fas fa-edit" ></i>
             </a>
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
