import React, { useState } from "react";
import Create from "./Create";
function Home(){
    const [todos, setTodos]=useState([])

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
                todos.map(todo=>(
                    <div key={index} className="todo-item">
                        {todo}
                    </div>
                ))
            }
        </div>
    )
}

export default Home