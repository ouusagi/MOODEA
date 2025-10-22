import { useParams } from "react-router-dom";
import ProductDetail from "../../components/Recycling/ProductDetail";

function GiftsetProductDetailPage() {
  const { category, id } = useParams();

  return (
    <div>
      <ProductDetail 
        tableName="GiftSet"
        category="Giftset"
        id={id}
      />
    </div>
  );
}

export default GiftsetProductDetailPage;