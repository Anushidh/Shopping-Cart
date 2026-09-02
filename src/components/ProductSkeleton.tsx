export const ProductSkeleton = () => {
  return (
    <div className="card flex flex-col h-full animate-pulse">
      <div className="aspect-[3/4] w-full bg-gray-200 mb-4"></div>
      
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-4">
          <div className="h-3 bg-gray-200 w-2/3"></div>
          <div className="h-3 bg-gray-200 w-1/4"></div>
        </div>
        
        <div className="h-2 bg-gray-100 w-1/3 mb-6 mt-1"></div>
        
        <div className="mt-auto">
          <div className="h-8 bg-gray-200 w-full border border-gray-200"></div>
        </div>
      </div>
    </div>
  );
};
