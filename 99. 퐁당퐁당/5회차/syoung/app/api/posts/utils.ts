import fs from "fs";
import { Post } from "@/app/types/posts";

export const FILE_PATH = process.cwd() + "/app/resources/posts.json";

export const getPosts = (): Post[] => {
  const data = fs.readFileSync(FILE_PATH, "utf-8");
  return JSON.parse(data);
};

export const updatePosts = (posts: Post[]) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(posts), "utf-8");
};
