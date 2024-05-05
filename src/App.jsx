import React, { useState } from 'react';
import { FaRegCheckCircle, FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [state, setState] = useState('');
  const [arr, setArr] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  const handleInputChange = (e) => {
    setState(e.target.value);
  };

  const addTodo = () => {
    if (state.trim() === '') {
      alert('Please enter a task');
      return;
    }

    if (updateId !== null) {
      // If updateId is not null, it means we're updating an existing todo
      setArr(arr.map((item) => (item.id === updateId ? { ...item, title: state } : item)));
      setState('');
      setUpdateId(null); // Reset updateId after updating
    } else {
      // If updateId is null, it means we're adding a new todo
      const newTodo = { id: uuidv4(), title: state };
      setArr([...arr, newTodo]);
      setState('');
    }
  };

  const deleteTodo = (id) => {
    setArr(arr.filter((item) => item.id !== id));
  };

  const editTodo = (id) => {
    const todo = arr.find((item) => item.id === id);
    setState(todo.title);
    setUpdateId(id);
  };

  return (
    <div>
      <div className="bg-gray-100">
        <div className="max-w-md mx-auto bg-slate-400 p-4">
          <h1 className="text-3xl font-semibold text-center mb-4">Todo List</h1>
          <div className="flex mb-4">
            <input
              type="text"
              id="todoInput"
              value={state}
              onChange={handleInputChange}
              placeholder="Enter your task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              {updateId !== null ? 'Update' : 'Add'}
            </button>
          </div>
          <ul id="todoList" className="bg-white rounded-md shadow">
            {arr.map((todo) => (
              <li key={todo.id} className="mt-4 p-1 flex justify-between border-t-4 text-xl">
                <FaRegCheckCircle />
                {todo.title}
                <div className="flex gap-2">
                  <FaEdit onClick={() => editTodo(todo.id)} />
                  <AiFillDelete onClick={() => deleteTodo(todo.id)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
