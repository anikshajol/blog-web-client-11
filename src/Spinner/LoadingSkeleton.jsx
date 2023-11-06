import Skeleton from "react-loading-skeleton";

const LoadingSkeleton = () => (
  <div className="p-4 bg-white shadow-md rounded-md">
    <Skeleton height={150} />
    <div className="mt-4">
      <Skeleton height={20} width={100} />
      <Skeleton height={12} width={200} />
    </div>
  </div>
);

export default LoadingSkeleton;
