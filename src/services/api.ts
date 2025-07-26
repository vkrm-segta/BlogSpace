import { Post, User, Comment } from '@/types';

const API_BASE = 'https://jsonplaceholder.typicode.com';

// Generic fetch wrapper with error handling
const apiRequest = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    // Enable caching for better performance
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    return await apiRequest<Post[]>('/posts');
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
};

export const fetchUsers = async (): Promise<User[]> => {
  try {
    return await apiRequest<User[]>('/users');
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

export const fetchPost = async (id: number): Promise<Post> => {
  try {
    return await apiRequest<Post>(`/posts/${id}`);
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw new Error('Failed to fetch post');
  }
};

export const fetchUser = async (id: number): Promise<User> => {
  try {
    return await apiRequest<User>(`/users/${id}`);
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw new Error('Failed to fetch user');
  }
};

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  try {
    return await apiRequest<Comment[]>(`/comments?postId=${postId}`);
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw new Error('Failed to fetch comments');
  }
};
