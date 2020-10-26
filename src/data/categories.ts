import { Category } from "../app/core/model/category";
import { POSTS } from './posts';

export const CATEGORIES: Category[] = [
  {
    id: "spring",
    label: "Spring",
    posts: [POSTS[1], POSTS[3]],
  },
  {
    id: "css",
    label: "CSS",
    posts: [POSTS[0]],
  },
  {
    id: "vscode",
    label: "Visual Studio Code",
    posts: [POSTS[2]],
  },
  {
    id: "javascript",
    label: "Javascript",
    posts: [],
  },
  {
    id: "html",
    label: "HTML",
    posts: [],
  },
  {
    id: "typescript",
    label: "Typescript",
    posts: [],
  },
];
