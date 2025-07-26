export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
  company: {
    name: string;
  };
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface PostWithAuthor extends Post {
  author: User;
}
