import Link from 'next/link';
import { PostWithAuthor } from '@/types';

interface PostCardProps {
  post: PostWithAuthor;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  return (
    <article className='group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-lg dark:hover:shadow-gray-900/20'>
      <div className='p-6'>
        <div className='flex items-center justify-between mb-4'>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            By {post.author.name}
          </span>
          <span className='text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full'>
            #{post.id}
          </span>
        </div>

        <Link href={`/posts/${post.id}`}>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors line-clamp-2'>
            {post.title}
          </h2>
        </Link>

        <p className='text-gray-600 dark:text-gray-400 mb-4 line-clamp-3'>
          {truncateText(post.body, 120)}
        </p>

        <div className='flex items-center justify-between'>
          <div className='flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
            <svg
              className='w-4 h-4 mr-1'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
              />
            </svg>
            {post.author.company.name}
          </div>

          <Link
            href={`/posts/${post.id}`}
            className='text-xs sm:text-sm font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
};
