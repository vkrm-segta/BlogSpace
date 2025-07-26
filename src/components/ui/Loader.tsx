export const Loader: React.FC = () => {
  return (
    <div className='flex justify-center items-center py-12'>
      <div className='relative'>
        <div className='w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-gray-900 dark:border-t-white rounded-full animate-spin'></div>
      </div>
    </div>
  );
};

export const LoaderSkeleton: React.FC = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse'
        >
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
          <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2'></div>
          <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
          <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2'></div>
        </div>
      ))}
    </div>
  );
};
