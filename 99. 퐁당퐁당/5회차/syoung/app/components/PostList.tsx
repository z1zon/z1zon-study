"use client";

import { useEffect, useState } from "react";
import { deletePost, getPosts } from "../apis/posts";
import { Post } from "../types/posts";

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  const handleDelete = (id: number) => {
    deletePost(id);
  };

  return (
    <ul>
      {posts.map(({ id, title, body }) => (
        <li key={id} style={{ marginTop: "16px" }}>
          <h2>{title}</h2>
          <p>{body}</p>
          <button type="button" onClick={() => handleDelete(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
