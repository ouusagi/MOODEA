import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function NewProductSkeleton({ count = 10 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div className="newproduct-item-container" key={i}>
          <div className="newproduct-item">
            <Skeleton height={220} />
            <div className="newproduct-text">
              <Skeleton height={14} width="40%" />
              <Skeleton height={18} />
              <Skeleton height={16} width="60%" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default NewProductSkeleton;
