import styles from './ToDoList.module.css'
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useParams } from 'react-router-dom';

const ToDoList = () => {
  const { state, setState } = useOutletContext();
  const { id, slug } = useParams();
  const project = projects.find(project => project.id === id);

  if (!project) {
    return <div>Project not found</div>;
  };

  const todos = project.todos;

  function addTodo(e) {
    e.preventDefault();
    const newTodoName = e.target.projectName.value;
    const newTodo = { id: crypto.randomUUID(), todoName: newTodoName,  done: false };
    setProjects(prev => [...prev, newProject]);
    e.target.projectName.value = '';
  };

  function deleteTodo() {

  };

  function renameTodo() {
    // const correctSlug = project.projectName;
    // if (slug !== correctSlug) {
    // navigate(`/projects/${id}/${correctSlug}`, { replace: true });
    //}
  };
  
  return (
    <div className={styles["todos-wrapper"]}>
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
        {todos.map(todo => (
        <div key={todo.id} className={styles["todo-item"]} onClick={deleteTodo}>{todo.todoName}</div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
