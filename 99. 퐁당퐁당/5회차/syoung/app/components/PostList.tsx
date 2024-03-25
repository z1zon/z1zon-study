"use client";

import { deletePost, getPosts } from "../apis/posts";
import { useQuery } from "../modules/react-query/useQuery";

export const PostList = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const handleDelete = (id: number) => {
    deletePost(id);
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

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
