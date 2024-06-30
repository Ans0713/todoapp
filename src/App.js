import React, { useState, useEffect } from 'react';
import "./App.css";
import deleteIcon from "./delete-icon.jpg";
import editIcon from "./editicon.jpeg";

const App = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('todoList'));
    if (storedList) {
      setList(storedList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(list));
  }, [list]);

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const handleTask = () => {
    if (input.trim()) {
      if (isEditing) {
        const updatedList = list.map((item, index) => index === currentIndex ? input : item);
        setList(updatedList);
        setIsEditing(false);
        setCurrentIndex(null);
      } else {
        setList([...list, input]);
      }
      setInput("");
    }
  }

  const handleDelete = (index) => {
    const newList = list.filter((item, i) => i !== index);
    setList(newList);
  }

  const handleEdit = (index) => {
    setInput(list[index]);
    setIsEditing(true);
    setCurrentIndex(index);
  }

  return (
    <div className='App'>
      <h2>Todo App</h2>
      <div className='container'>
        <div className='input-box'>
          <input 
            type='text' 
            value={input} 
            onChange={(e) => handleInput(e)} 
            placeholder='Enter Task' 
          /> 
          <button onClick={handleTask}>{isEditing ? 'Update task' : 'Add task'}</button>
        </div>
        <div className='list'>
          <ul>
            {list.map((item, i) => (
              <li key={i}>
                <div className="task-text">
                  <input type="checkbox" />
                  <span>{item}</span>
                </div>
                <div>
                  <img 
                    src={deleteIcon} 
                    className="deleteicon" 
                    alt='delete' 
                    onClick={() => handleDelete(i)} 
                  />
                  <img 
                    src={editIcon} 
                    className="editicon" 
                    alt='edit' 
                    onClick={() => handleEdit(i)} 
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App;

