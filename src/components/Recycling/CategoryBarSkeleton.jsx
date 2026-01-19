import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CategoryBarSkeleton({ count }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div className='CategoryBar-item' key={i}>
        <Skeleton height={100} width="100%" borderRadius="9999px" />
        <Skeleton height={10} width="100%"/>
        </div>
      ))}
    </>
  );
}

export default CategoryBarSkeleton;
