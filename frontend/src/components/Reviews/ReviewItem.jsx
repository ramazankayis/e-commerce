import React from "react";

const ReviewItem = ({ item }) => {
  console.log("item", item);
  const { text, rating, createdAt } = item;
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(createdAt).toLocaleDateString(
    "tr-TR",
    options
  );
  return (
    <li className="comment-item">
      <div className="comment-avatar">
        <img src="/img/avatars/avatar1.jpg" alt="" />
      </div>
      <div className="comment-text">
        <ul className="comment-star">
          {rating === 1 && (
            <>
              <li>
                <i className="bi bi-star-fill"></i>
              </li>
              1
            </>
          )}
          {rating === 2 && (
            <>
              <li>
                <i className="bi bi-star-fill"></i>
              </li>
              <li>
                <i className="bi bi-star-fill"></i>
              </li>
            </>
          )}
          {rating === 3 && (
            <>
              <li>
                <i className="bi bi-star-fill"></i>
              </li>
              <li>
                <i className="bi bi-star-fill"></i>
              </li>
              <li>
                <i className="bi bi-star-fill"></i>
              </li>
            </>
          )}
          {rating === 4 && (
            <>
              <li>
                <i className="bi bi-star-fill"></i>
              </li>
              <li>
                <i className="bi bi-star-fill"></i>
              </li>
              <li>
                <i className="bi bi-star-fill"></i>
              </li>
              <li>
                <i className="bi bi-star-fill"></i>
              </li>
            </>
          )}
          {rating === 5 && (
            <>
              <li>
                <i className="bi bi-star-fill"></i>
              </li>
              <li>
                <i className="bi bi-star-fill"></i>
              </li>
              <li>
                <i className="bi bi-star-fill"></i>
              </li>
              <li>
                <i className="bi bi-star-fill"></i>
              </li>
              <li>
                <i className="bi bi-star-fill"></i>
              </li>
            </>
          )}
        </ul>
        <div className="comment-meta">
          <strong>admin</strong>
          <span>-</span>
          <time>{formattedDate}</time>
        </div>
        <div className="comment-description">
          <p>{text}</p>
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;
