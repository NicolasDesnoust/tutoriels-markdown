import { Category } from './category';
import { POSTS } from './posts';

export const CATEGORIES: Category[] = [
    {
        id:"spring",
        label:"Spring",
        posts: [
            POSTS[1]
        ]
    },
    {
        id:"css",
        label:"CSS",
        posts: [
            POSTS[0]
        ]
    },
    {
        id:"javascript",
        label:"Javascript",
        posts: [
        ]
    },
    {
        id:"html",
        label:"HTML",
        posts: [
        ]
    },
    {
        id:"typescript",
        label:"Typescript",
        posts: [
        ]
    }
];
