import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home(){
    const [todos, setTodos]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/get')
        .then((response)=>setTodos(response.data))
        .catch((error)=>console.error(error))
    },[])
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
                      <div className="todo-item">
                        <BsCircleFill className="icon" />
                        {todo.task}
                      </div>
                      <BsFillTrashFill className="del-icon" />
                    </div>
                  ))
                  
            }
        </div>
    )
}

export default Home