import { useEffect } from "react";
import styles from "./page.module.scss";
import { PostList } from "./components/PostList";
import { PostInput } from "./components/PostInput";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Post List</h1>
      <PostInput />
      <PostList />
    </main>
  );
}
