import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs';

function Home(){
    const [todos, setTodos]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/get')
        .then((response)=>setTodos(response.data))
        .catch((error)=>console.log(error))
    },[])

    const handleEdit =(id) => {
        axios.put('http://localhost:3001/update/'+id)
        .then((response)=>{
            location.reload()
        })
        .catch((error)=>console.log(error))
    }
    
    const handleDelete =(id) => {
        axios.delete('http://localhost:3001/delete/'+id)
        .then((response)=>{
            location.reload()
        })
        .catch((error)=>console.log(error))
    }

    return (
        
        <div className="home">
            <h2 className="Title">Todo List</h2>
            <Create/>
            {
                todos.length ===0
                ?
                <div className="no-record">
                    <h2>No record</h2>
                </div>
                :
                todos.map(todo => (
                    
                    <div className="todo-row">
                      <div className="todo-item" onClick={()=>handleEdit(todo._id)}>
                        {todo.done ? <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                        
                        :<BsCircleFill className="icon" />
                        }
                        <p className={todo.done ?"line":""}>{todo.task}</p>
                      </div>
                      <BsFillTrashFill className="del-icon" onClick={()=>handleDelete(todo._id)} />
                    </div>
                    
                  ))
                  
            }
        </div>
    )
}

export default Home