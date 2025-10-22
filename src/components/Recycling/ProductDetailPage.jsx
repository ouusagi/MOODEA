import { useParams } from "react-router-dom";
import ProductDetail from "../../components/Recycling/ProductDetail";

function ProductDetailPage() {
  const { category, id } = useParams();


  return (
    <div>
      <ProductDetail 
        tableName="ProductsDB"
        category={category}
        id={id}
      />
    </div>
  );
}

export default ProductDetailPage;
