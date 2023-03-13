import './App.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, completeTodo, updateTodo } from './actions/todoAction';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const todos = useSelector(state => state.todoReducer)
  const dispatch = useDispatch()
  const [task, setTask] = useState("");
  const [editTask, setEditTask] = useState("");
  const [filter, setFilter] = useState("All");

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" placeholder="Type a New Task Here..." onChange={(e) => setTask(e.target.value)} />
        <Button variant="success" onClick={() => dispatch(addTodo(task))}>Add Task</Button>
        <Button variant="secondary" onClick={() => setFilter("All")}>All</Button>
        <Button variant="secondary" onClick={() => setFilter("Done")}>Done</Button>
        <Button variant="secondary" onClick={() => setFilter("Not Done Yet")}>Not Done Yet</Button>
        {filter === "All" ? todos.map(el => (
          <div>
            <h1>{el.title}</h1>
            <Button variant="primary" onClick={handleShow}>
              Update Task
            </Button>
            <Modal show={show} onHide={handleClose}>

              <Modal.Body>
                <input type="text" placeholder="Edit The Task Here..." value={editTask} onChange={(e) => setEditTask(e.target.value)} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => { dispatch(updateTodo(editTask, el.id)); handleClose() }}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            <Button variant="danger" onClick={() => dispatch(deleteTodo(el.id))}>Delete Task</Button>
            <Button variant="info" onClick={() => dispatch(completeTodo(el.id))}>{el.complete ? "Done" : "Not Done Yet"}</Button>
          </div>
        )) : filter === "Done" ? todos.filter(el => el.complete === true).map(el => (
          <div>
            <h1>{el.title}</h1>
            <Button variant="danger" onClick={() => dispatch(deleteTodo(el.id))}>Delete Task</Button>
            <Button variant="info" onClick={() => dispatch(completeTodo(el.id))}>{el.complete ? "Done" : "Not Done Yet"}</Button>
          </div>
        )) : todos.filter(el => el.complete === false).map(el => (
          <div>
            <h1>{el.title}</h1>
            <Button variant="primary" onClick={handleShow}>
              Update Task
            </Button>
            <Modal show={show} onHide={handleClose}>

              <Modal.Body>
                <input type="text" placeholder="Edit The Task Here..." value={editTask} onChange={(e) => setEditTask(e.target.value)} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => { dispatch(updateTodo(editTask, el.id)); handleClose() }}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            <Button variant="danger" onClick={() => dispatch(deleteTodo(el.id))}>Delete Task</Button>
            <Button variant="info" onClick={() => dispatch(completeTodo(el.id))}>{el.complete ? "Done" : "Not Done Yet"}</Button>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
