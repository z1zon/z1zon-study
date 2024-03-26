export type Post = {
  id: number;
  title: string;
  body: string;
};

export type PostDto = Omit<Post, "id">;
