import styles from "./ToDoItem.module.css"
import dragHandleImg from "../../assets/img/menu.svg"

export default function ToDoItem(
  {
    todo,
    editedTodoId,
    setEditedTodoId,
    editedText,
    setEditedText,
    todoMenuId,
    setTodoMenuId,
    renameTodo,
    deleteTodo,
    toggleTodo
  }
) {
  return (
    <div className={styles["todo-item"]}>
      <img className={styles["todo-drag-handle"]} src={dragHandleImg} alt='drag handle'/>

      {editedTodoId === todo.id ? (
        <input
          type="text"
          value={editedText}
          autoFocus
          maxLength={40}
          className={styles["todo-name"]}
          onChange={(e) => setEditedText(e.target.value)}
          onBlur={() => renameTodo(todo.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              renameTodo(todo.id);
            }
            if (e.key === "Escape") {
              setEditedTodoId(null);
            }
          }}
        />
      ) : (
        <div className={styles["todo-name-container"]}>
          <div
            className={styles["todo-name"]}
            onDoubleClick={() => {
              setEditedTodoId(todo.id);
              setEditedText(todo.todoName);
            }}
          >
            {todo.todoName}
          </div>
          <input className={styles["todo-checkbox"]} type="checkbox" checked={todo.done} onChange={ (e) => toggleTodo(e.target.checked, todo.id) }/>
        </div>
      )}

      

      <button
        className={styles["todo-kebab"]}
        onClick={() => {
          setTodoMenuId(
            todoMenuId === todo.id
              ? null
              : todo.id
          );
        }}
      >⋮</button>

      {todoMenuId === todo.id && (
        <div className={styles["todo-menu"]}>
          <button 
            className={styles["todo-rename-btn"]}
            onClick={() => {
              setEditedTodoId(todo.id);
              setEditedText(todo.todoName);
              setTodoMenuId(null);
            }}
          >Rename</button>

          <button
            className={styles["todo-move-btn"]}
            onClick={() => {
              setTodoMenuId(null);
            }}
          >Move</button>

          <button
            className={styles["todo-delete-btn"]}
            onClick={() => {
              deleteTodo(todo.id);
              setTodoMenuId(null);
            }}
          >Delete</button>
        </div>
      )}
    </div>
  )
}
