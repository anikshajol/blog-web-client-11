import Skeleton from "react-loading-skeleton";

const LoadingSkeleton = () => {
  return (
    <div>
      <h1>
        <Skeleton width={200} height={30} />
      </h1>
      <p>
        <Skeleton count={3} />
      </p>
      <Skeleton width={300} height={200} />
    </div>
  );
};

export default LoadingSkeleton;
