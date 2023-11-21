import React from "react";
import { useStore } from "@nanostores/react";

import Todo from "../Todo";
import { $todos } from "../../stores/todos.store";

import styles from "./TodoList.module.css";

const TodoList = () => {
  const todos = useStore($todos);

  return (
    <ul className={styles.list}>
      {todos.map(({ id, content }) => (
        <li key={id} className={styles.list_item}>
          <Todo id={id} content={content} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
