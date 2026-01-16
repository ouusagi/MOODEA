function ReviewList({ item }) {

  return (
    <div className="cart-preview-item" key={item.id}>
      <img src={item.images} alt="review-img" />
      <div className="cart-preview-item-info">
        <h3>제목 : {item.title}</h3>
        <h5>조회수 : {item.view_count}</h5>
        <h6>{new Date(item.created_at).toLocaleDateString()}</h6>
      </div>
    </div>
  )
}

export default ReviewList
