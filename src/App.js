import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  
  useEffect(() => {
    loadTasks();
  }, []);

 
  const loadTasks = async () => {
    const response = await axios.get('http://localhost:3002/tarefas');
    setTasks(response.data);
  }

  
  const addTask = async () => {
    if (taskName === "") {
      return;
    }

    await axios.post('http://localhost:3002/tarefas', { nome: taskName });
    setTaskName("");
    loadTasks();
  }


  const updateTask = async (id, nome, feito) => {
    await axios.put(`http://localhost:3002/tarefas/${id}`, { nome, feito: feito ? 0 : 1 });
    loadTasks();
  }

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3002/tarefas/${id}`);
    loadTasks();
  }

  return (
    <div style={{ margin: '30px'}}>

      <h2> Milagre da organização</h2>

      <h5>Irei começar usar!!</h5>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={addTask}>Adicionar</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={!!task.feito}
              onChange={() => updateTask(task.id, task.nome, task.feito)}
            />
            {task.nome}
            <button onClick={() => deleteTask(task.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;