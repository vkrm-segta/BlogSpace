'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader } from '@/components/ui/Loader';
import { fetchPost, fetchUser, fetchComments } from '@/services/api';
import { Post, User, Comment } from '@/types';

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const postId = parseInt(params.id as string);

  useEffect(() => {
    const loadPostDetails = async () => {
      try {
        setLoading(true);
        const postData = await fetchPost(postId);
        const [authorData, commentsData] = await Promise.all([
          fetchUser(postData.userId),
          fetchComments(postId),
        ]);

        setPost(postData);
        setAuthor(authorData);
        setComments(commentsData);
      } catch (err) {
        setError('Failed to load post details. Please try again later.');
        console.error('Error loading post details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isNaN(postId)) {
      setError('Invalid post ID');
      setLoading(false);
      return;
    }

    loadPostDetails();
  }, [postId]);

  if (loading) {
    return (
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <Loader />
      </div>
    );
  }

  if (error || !post || !author) {
    return (
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
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
            Post not found
          </h2>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>
            {error || "The post you're looking for doesn't exist."}
          </p>
          <div className='space-x-4'>
            <button
              onClick={() => router.back()}
              className='px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
            >
              Go Back
            </button>
            <Link
              href='/posts'
              className='inline-block px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors'
            >
              Browse Posts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      {/* Breadcrumb Navigation */}
      <nav className='mb-8'>
        <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
          <Link
            href='/'
            className='hover:text-gray-700 dark:hover:text-gray-200 transition-colors'
          >
            Home
          </Link>
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
            />
          </svg>
          <Link
            href='/posts'
            className='hover:text-gray-700 dark:hover:text-gray-200 transition-colors'
          >
            Posts
          </Link>
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
            />
          </svg>
          <span className='text-gray-900 dark:text-white'>Post #{post.id}</span>
        </div>
      </nav>

      {/* Post Content */}
      <article className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
        {/* Post Header */}
        <div className='p-8 border-b border-gray-200 dark:border-gray-700'>
          <div className='flex flex-row items-center justify-between mb-6'>
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center'>
                <span className='text-lg font-semibold text-gray-700 dark:text-gray-300'>
                  {author.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className='font-semibold text-gray-900 dark:text-white text-sm sm:text-base'>
                  {author.name}
                </h3>
                <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                  @{author.username}
                </p>
              </div>
            </div>
            <div className='text-right hidden min-[600px]:block'>
              <div className='text-sm text-gray-500 dark:text-gray-400 mb-1'>
                {author.company.name}
              </div>
              <div className='text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full'>
                Post #{post.id}
              </div>
            </div>
          </div>

          <h1 className='text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white sm:mb-4 leading-tight'>
            {post.title}
          </h1>
        </div>

        {/* Post Body */}
        <div className='p-8'>
          <div className='prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed'>
            <p className='sm:text-lg'>{post.body}</p>
          </div>

          {/* Author Info */}
          <div className='mt-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg'>
            <h4 className='font-semibold text-gray-900 dark:text-white mb-3'>
              About the Author
            </h4>
            <div className='sm:flex items-start text-sm sm:text-base space-x-4'>
              <div className='w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full hidden sm:flex items-center justify-center flex-shrink-0'>
                <span className='text-xl font-semibold text-gray-700 dark:text-gray-300'>
                  {author.name.charAt(0)}
                </span>
              </div>
              <div className='flex-grow'>
                <h5 className='font-semibold text-gray-900 dark:text-white'>
                  {author.name}
                </h5>
                <p className='text-gray-600 dark:text-gray-400 mb-2'>
                  {author.email}
                </p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Works at {author.company.name}
                  {author.website && (
                    <>
                      {' • '}
                      <a
                        href={`https://${author.website}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
                      >
                        {author.website}
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div className='mt-12'>
        <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
          <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
              Comments ({comments.length})
            </h2>
          </div>

          <div className='divide-y divide-gray-200 dark:divide-gray-700'>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className='p-6'>
                  <div className='flex items-start space-x-4'>
                    <div className='w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full hidden sm:flex items-center justify-center flex-shrink-0'>
                      <span className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
                        {comment.name
                          .split(' ')
                          .map((n) => n.charAt(0))
                          .join('')
                          .substring(0, 2)}
                      </span>
                    </div>
                    <div className='flex-grow'>
                      <div className='flex items-center justify-between mb-2'>
                        <h4 className='font-semibold text-gray-900 dark:text-white'>
                          {comment.name}
                        </h4>
                        <span className='text-xs text-gray-500 dark:text-gray-400 hidden sm:block'>
                          #{comment.id}
                        </span>
                      </div>
                      <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
                        {comment.email}
                      </p>
                      <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                        {comment.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='p-12 text-center'>
                <div className='w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-gray-400 dark:text-gray-500'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z'
                    />
                  </svg>
                </div>
                <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
                  No comments yet
                </h3>
                <p className='text-gray-500 dark:text-gray-400'>
                  Be the first to share your thoughts on this post.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className='mt-12 flex justify-between'>
        <button
          onClick={() => router.back()}
          className='flex items-center px-4 sm:px-6 py-3 text-sm sm:text-base bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
        >
          <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
            />
          </svg>
          Back
        </button>

        <Link
          href='/posts'
          className='flex items-center px-4 sm:px-6 py-3 text-sm sm:text-base bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors'
        >
          All Posts
          <svg className='w-5 h-5 ml-2' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
