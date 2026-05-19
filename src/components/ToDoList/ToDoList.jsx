import styles from './ToDoList.module.css'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {
  addTodoToState,
  deleteTodoFromState,
  toggleTodoInState,
  saveTodoNameToState
} from '../../utils/toDoHelpers';
import ToDoItem from '../ToDoItem/ToDoItem';

const ToDoList = () => {
  const { state, setState } = useOutletContext();
  const { id, slug } = useParams();
  const project = state.projects.byID[id];

  const [editedTodoId, setEditedTodoId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [todoMenuId, setTodoMenuId] = useState(null);

  if (!project) {
    return <div>Project not found</div>;
  };

  const todoIDs = project.todoIDs;

  function addTodo(e) {
    e.preventDefault();
    const newTodoName = e.target.todoName.value;

    setState(prev => addTodoToState(prev, id, project, newTodoName));

    e.target.todoName.value = '';
  };

  function deleteTodo(todoId) {
    setState(prev => deleteTodoFromState(prev, id, todoId));
  };

  function toggleTodo(checked, todoId) {
    setState(prev => toggleTodoInState(prev, checked, todoId));
  };

  function renameTodo(todoId) {
    const trimmedName = editedText.trim();

    if (!trimmedName) return;

    setState(prev => saveTodoNameToState(prev, todoId, trimmedName));

    setEditedTodoId(null);
    // const correctSlug = project.projectName;
    // if (slug !== correctSlug) {
    // navigate(`/projects/${id}/${correctSlug}`, { replace: true });
    //}
  };
  
  return (
    <div className={styles["todos-wrapper"]}>
      <div className={styles["project-name"]}>{slug}</div>
      <form action="" className={styles["todos-form"]} onSubmit={addTodo}>
        <input
          type="text"
          placeholder="New ToDo Name"
          name="todoName"
          className={styles["todoName"]}
          maxLength={40}
        />
        <button type="submit" className={styles["new-todo"]}>Add+</button>
      </form>
      <div className={styles["todos-window"]}>
        {todoIDs.map(todoID => {
          const todo = state.todos.byID[todoID];
          
          if (!todo) return null;

          return (
            <ToDoItem 
              todo={todo}
              editedTodoId={editedTodoId}
              setEditedTodoId={setEditedTodoId}
              editedText={editedText}
              setEditedText={setEditedText}
              todoMenuId={todoMenuId}
              setTodoMenuId={setTodoMenuId}
              renameTodo={renameTodo}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
            />
          )
        })}
      </div>
    </div>
  );
};

export default ToDoList;

