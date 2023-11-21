import React from "react";

import { $todos } from "../../stores/todos.store";

import styles from "./Todo.module.css";

interface TodoProps {
  id: string;
  content: string;
}

const Todo: React.FC<TodoProps> = ({ id, content }) => {
  const handleClickDelete = () => {
    const todos = [...$todos.get()];
    const deleteIndex = todos.findIndex((todo) => todo.id === id);
    if (deleteIndex !== -1) {
      todos.splice(deleteIndex, 1);

      $todos.set([...todos]);
    }
  };

  return (
    <div>
      <button onClick={handleClickDelete} type="button" className={styles.todo_delete_button}>
        ❌
      </button>
      <span className={styles.todo_content}>{content}</span>
    </div>
  );
};

export default Todo;
