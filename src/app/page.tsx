import Link from 'next/link';

export default function HomePage() {
  return (
    <div className='min-h-[calc(100vh-16rem)] flex items-center justify-center'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <div className='mb-8 max-md:pt-10'>
          <h1 className='text-4xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6'>
            Welcome to{' '}
            <span className='bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
              BlogSpace
            </span>
          </h1>
          <p className='text-base md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto'>
            Discover amazing stories, insights, and ideas from our community of
            writers. A modern blog platform built with cutting-edge technology.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/posts'
              className='inline-flex items-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors text-base sm:text-lg'
            >
              Explore Posts
              <svg
                className='ml-2 w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
