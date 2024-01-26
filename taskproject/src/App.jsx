import React from "react";
import { Routes, Route } from "react-router-dom";
import Sherlayout from "./Components/Task/Sherlayout";
import TaskEdit from "./Components/Task/TaskEdit";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Sherlayout />} />
        <Route path="/task/:id" element={<TaskEdit />} />
      </Routes>
    
    </>
  );
};

export default App;
