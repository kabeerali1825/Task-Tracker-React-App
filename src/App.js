import Header from './Components/Header';
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';
import Footer from './Components/Footer';
import About  from './Components/About';
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import './App.css';
import React from 'react';
function App() {
  const [showAddTask, setShowAddTask]= useState(false)
  const [tasks, setTasks] = useState([])
  //Fetch Tasks
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    console.log(data)
    return data
  }

   // Delete Task
   const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }
//Delete Task--Ui
// const deleteTask = (id) => {
//   setTasks(tasks.filter((task) => task.id !== id))}

//Toggle Reminder
// const toggleReminder = (id) => {

//   console.log(id)
//   setTasks(tasks.map((task) => task.id === id ? {...task , reminder: !task.reminder} : task))
// }
  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }
// Add Task
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  const data = await res.json()

  setTasks([...tasks, data])

  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = { id, ...task }
  // setTasks([...tasks, newTask])
}
// const addTask = (task) => {
//   console.log(task)
//   const id = Math.floor(Math.random() * 10000) + 1
//   const newTask = { id, ...task }
//   setTasks([...tasks, newTask])

// }
 // Fetch Task
 const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data
}
  return (
    // <Router>
    // <div className="container">
    //   {/* <Header title='kabeer'/> */}
    //   <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
    //   {showAddTask &&<AddTask onAdd={addTask} />} 
    //   {tasks.length > 0 ? <Tasks tasks={tasks} Delete= {deleteTask} onToggle={toggleReminder} /> : 'No Tasks to show'}
    //   <Routes><Route path="/about" component={About}/></Routes>
    //  <Footer/>
    // </div>
    // </Router>
    <Router>
    <div className='container'>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      <Routes>
        <Route
          path='/'
          element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  Delete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          }
        />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  </Router>
    
  );
}
// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <h1>Hello from a class</h1>
//       </div>
//     )
//   }
// }
export default App;
