function CartItemList({ item }) {

  return (
    <div className="cart-preview-item" key={item.id}>
      <img src={item.photo} alt="product-img" />
      <div className="cart-preview-item-info">
        <h3>{item.name}</h3>
        <h5>{item.brand}</h5>
        {item.price.toLocaleString()}원
      </div>
    </div>
  )
}

export default CartItemList
