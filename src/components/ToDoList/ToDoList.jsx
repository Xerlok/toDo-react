import styles from './ToDoList.module.css'
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useParams } from 'react-router-dom';

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
    const todoId = crypto.randomUUID();

    setState(prev => ({
      ...prev,
      todos: {
        ...prev.todos,
        byID: {
          ...prev.todos.byID,
          [todoId]: {
            id: todoId,
            todoName: newTodoName,
            done: false,
            projectID: id
          }
        },
        allIDs: [...prev.todos.allIDs, todoId]
      },
      projects: {
        ...prev.projects,
        byID: {
          ...prev.projects.byID,
          [project.id]: {
            ...prev.projects.byID[id],
            todoIDs: [...prev.projects.byID[id].todoIDs, todoId]
          }
        }
      }
    }));

    e.target.todoName.value = '';
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
        {todoIDs.map(todoID => {
          const todo = state.todos.byID[todoID];
          if (!todo) return null;

          return (
            <div key={todo.id} className={styles["todo-item"]} onClick={deleteTodo}>
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

