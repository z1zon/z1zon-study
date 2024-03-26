import { PostList } from "./components/PostList";
import { PostInput } from "./components/PostInput";

import styles from "./page.module.scss";
import { Providers } from "./providers";

export default function Home() {
  return (
    <Providers>
      <main className={styles.main}>
        <h1>Post List</h1>
        <PostInput />
        <PostList />
      </main>
    </Providers>
  );
}
