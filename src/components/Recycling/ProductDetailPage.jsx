import { useParams } from "react-router-dom";
import ProductDetail from "../../components/Recycling/ProductDetail";

function ProductDetailPage() {
  const { category } = useParams();


  return (
    <div>
      <ProductDetail 
        tableName="ProductsDB"
        category={category}
      />
    </div>
  );
}

export default ProductDetailPage;
