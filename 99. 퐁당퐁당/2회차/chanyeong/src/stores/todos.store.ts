import { atom } from "nanostores";

interface Todo {
  id: string;
  content: string;
}

export const $todos = atom<Todo[]>([]);
