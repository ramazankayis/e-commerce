import React from "react";
import "./Reviews.css";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
const Reviews = ({ active, singleProduct }) => {
  return (
    <div className={`tab-panel-reviews ${active}`}>
      {singleProduct.reviews.length > 0 ? (
        <>
          <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
          <div className="comments">
            <ol className="comment-list">
              {singleProduct.reviews.map((item, index) => (
                <ReviewItem key={index} item={item} />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <h3>Hiç yorum yok......</h3>
      )}

      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm singleProduct={singleProduct} />
      </div>
    </div>
  );
};

export default Reviews;
