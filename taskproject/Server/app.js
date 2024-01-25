const express = require("express");
const app = express();
const mysql = require("mysql");

// app.get('/', (req, res)=>{
//     res.send('Wellcom to this app')
// })
const connection = mysql.createConnection({
  user: "taskuser",
  host: "127.0.0.1",
  database: "taskmanager",
  password: "taskdb",
});
connection.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("conection established");
  }
});

// middleweare
const cors = require("cors");
// npm i cors
app.use(cors());
app.use(express.json());

// create task
app.post("/task/create", (req, res) => {
  const name = req.body.name;
  //   console.log(name);
  //   res.send("task created");
  if (!name) {
    return res.send("nameis required");
  }

  const createTask = `INSERT INTO Task (task_name) VALUES ('${name}')`;
  connection.query(createTask, (err, result) => {
    if (err) {
        return res.send(err.message)
    }else{
        return res.send('task created')
    }
  });
  
});

// read all tasks
app.get('/task', (req, res)=>{
    // res.send('all task')
    const readAllTask= `SELECT * FROM Task ORDER BY id DESC`
    connection.query(readAllTask,(err,result)=>{
        if(err){
            return res.send(err.message)
        }else{
            return res.json({task:result})
        }
    })
})

// read single task
app.get('/task/:id', (req, res)=>{
    // res.send("single task")
    const id=req.params.id 
    //  res.send("single task" + id)
    const readTask= `SELECT * FROM Task WHERE id='${id}'`
    connection.query(readTask, (err, result) => {
        if (err) {
            return res.send(err.message)
        }
        else if(result.length == 0){
            return res.send(`No task with this id ${id}`)
        }
        else{
            return res.json(result)
        }
      });
})


// update single task
app.patch('/task/:id', (req, res)=>{
    // res.send('update task')
    const id =req.params.id 
    const name = req.body.name 
    let completed= req.body.completed 
    // res.send(id + name + completed)

    if(!name){
        return res.send('name is required')
    }
    if (completed == true){
        completed = 1
    }else{
        completed = 0
    }
    const updateTask= `UPDATE Task SET task_name = "${name}", completed = ${completed} WHERE id=${id} `
    connection.query(updateTask, (err, result) => {
        if (err) {
            return res.send(err.message)
        }
        else if(result.affectedRows == 0){
          return res.send(`no task with id ${id}`)
        }
        else{
            return res.json('task updated')
        }
      });
})


// Delete single task
app.delete('/task/:id', (req,res)=> {
  // res.send('task delete')
  const id = req.params.id
  const deleteTask=`DELETE FROM Task WHERE id = ${id}`
  connection.query(deleteTask, (err,result)=>{
    if(err){
      return res.send(err.message)
    }else if(result.affectedRows == 0){
      return res.send(`no task with ${id}`)
    }
    else{
      return res.json('task deleted')
    }
  })
})


app.listen(5000, (err) => {
  if (err) {
    console.log("err");
  } else {
    console.log("app listening at port 5000");
  }
});

app.get("/inst", (req, res) => {
  const tasktable = `CREATE TABLE if not exists Task (
        id INT not null auto_increment,
        task_name varchar(255) not null,
        completed BOOLEAN DEFAULT false,
        PRIMARY KEY (id)
        )`;
  connection.query(tasktable, (err, results, fields) => {
    if (err) console.log(err);
  });
  res.end("well Done");
});
