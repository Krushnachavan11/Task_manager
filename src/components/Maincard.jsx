import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './main.css'
import './utility.css'

const Maincard = () => {
  const [todo, settodo] = useState("")  // Tis is for taking input text
  const [todos, settodos] = useState([]) // For callacting All Tasks in Array
  const [showfinish, setshowfinish] = useState(true)

  // const savels = () => {
  //   localStorage.setItem("todos", JSON.stringify(todos))
  // }
  // useEffect(() => {
  //   let ts = localStorage.getItem("todos")
  //   if (ts) {
  //     let todos = JSON.parse(localStorage.getItem("todos"))
  //     settodos(todos)
  //   }
  // }, [])


 useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      settodos(JSON.parse(savedTodos));
    }
  }, []);

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);



  const handlechange = (e) => {
    settodo(e.target.value)
    // savels()
  }

  const handlecheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let ntodo = [...todos];
    ntodo[index].isCompleted = !ntodo[index].isCompleted;
    settodos(ntodo);

  }

  const handlesave = () => {
    if(todo.length>=3){
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      settodo("")
    }

  }

  const handleedit = (e, id) => {

    let t = todos.filter(items => {
      return items.id === id;
    })
    settodo(t[0].todo);
    let newtodos = todos.filter(items => {
      return items.id !== id;
    })
    settodos(newtodos);
    // savels()
  }

  const handledelete = (e, id) => {
    let newtodos = todos.filter(items => {
      return items.id !== id;
    })
    settodos(newtodos);
    // savels()
  }

  const show = (e) => { 
    setshowfinish(!showfinish)
   }


  return (
    <main >
      <h1>Add Todos</h1>
      <header>
        <input onChange={handlechange} type="text" value={todo} />
        <button onClick={handlesave} className='addtodos'>Save</button>
      </header>
       <h2>Your Todos</h2>
        <div className="showcon flex">
               <input onChange={show} checked={showfinish} type="checkbox" name="Show all" id="" /><h4>Show Finished Todos</h4>
        </div>
       
      {todos.length === 0 && <div className='error'>
        <h4>
        No Todos
        </h4>
      </div>}
      {todos.map(items => {
        return (showfinish || !items.isCompleted) && <div key={items.id} className="todolist flex">
          <input onChange={handlecheck} type="checkbox" name={items.id} checked={items.isCompleted}/>
          <div className={items.isCompleted ? 'line-through' : ''}> <p>{items.todo}</p> </div>
          <span className='todobtn flex'>
            <button onClick={(e) => { handleedit(e, items.id) }} className='editbtn'><FaEdit /></button>
            <button onClick={(e) => { handledelete(e, items.id) }} className='deletebtn'><MdDelete /></button>
          </span>
        </div>
      })}
    </main>
  )
}

export default Maincard