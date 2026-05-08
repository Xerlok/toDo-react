import styles from './ToDoList.module.css'
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { addTodoToState, deleteTodoFromState } from '../../utils/toDoHelpers';

const ToDoList = () => {
  const { state, setState } = useOutletContext();
  const { id, slug } = useParams();
  const project = state.projects.byID[id];

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

  function deleteTodo(todoID) {
    setState(prev => deleteTodoFromState(prev, id, todoID));
  };

  function renameTodo() {
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
            <div key={todo.id} className={styles["todo-item"]} onClick={ () => deleteTodo(todo.id) }>
              <div className={styles["todo-name"]}>{todo.todoName}</div>
              <input className={styles["todo-checkbox"]} type="checkbox" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToDoList;

