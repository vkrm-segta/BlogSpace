'use client';

import { useState, useEffect } from 'react';
import { PostCard } from '@/components/posts/PostCard';
import { LoaderSkeleton } from '@/components/ui/Loader';
import { fetchPosts, fetchUsers } from '@/services/api';
import { PostWithAuthor } from '@/types';

export default function PostsPage() {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const [postsData, usersData] = await Promise.all([
          fetchPosts(),
          fetchUsers(),
        ]);

        const postsWithAuthors: PostWithAuthor[] = postsData.map((post) => {
          const author = usersData.find((user) => user.id === post.userId);
          return {
            ...post,
            author: author || {
              id: 0,
              name: 'Unknown Author',
              username: 'unknown',
              email: 'unknown@email.com',
              website: '',
              company: { name: 'Unknown Company' },
            },
          };
        });

        setPosts(postsWithAuthors);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        console.error('Error loading posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (error) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center'>
          <div className='w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg
              className='w-8 h-8 text-red-600 dark:text-red-400'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            Something went wrong
          </h2>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
          Latest Posts
        </h1>
        <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
          Discover insightful articles and stories from our community of writers
        </p>
      </div>

      {loading ? (
        <LoaderSkeleton />
      ) : (
        <>
          <div className='flex items-center justify-between mb-8'>
            <p className='text-gray-600 dark:text-gray-400 text-xs sm:text-base'>
              Showing {posts.length} posts
            </p>
            <div className='flex items-center space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                />
              </svg>
              Recently updated
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
