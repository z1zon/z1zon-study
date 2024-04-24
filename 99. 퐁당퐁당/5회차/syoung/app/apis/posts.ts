import _axios from "axios";
import { Post, PostDto } from "../types/posts";

const BASE_URL = "http://localhost:3000/api";

const axios = _axios.create({
  baseURL: BASE_URL,
});

export const getPosts = async () => {
  return await axios.get<Post[]>("/posts").then((v) => v.data);
};

export const createPost = async (data: PostDto) => {
  return await axios.post<Post>("/posts", data).then((v) => v.data);
};

export const updatePost = async (id: Post["id"], data: PostDto) => {
  return await axios.put<Post>(`/posts/${id}`, data).then((v) => v.data);
};

export const deletePost = async (id: Post["id"]) => {
  return await axios.delete(`/posts/${id}`).then((v) => v.data);
};
