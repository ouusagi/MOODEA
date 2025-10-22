import { useParams } from "react-router-dom";
import ProductDetail from "../../components/Recycling/ProductDetail";

function BestProductDetailPage() {
  const { category, id } = useParams();

  return (
    <div>
      <ProductDetail 
        tableName="BestSlider"
        category={category}
        id={id}
      />
    </div>
  );
}

export default BestProductDetailPage;
