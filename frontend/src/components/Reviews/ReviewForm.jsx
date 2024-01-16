import { message } from "antd";
import React, { useState } from "react";

const ReviewForm = ({ singleProduct }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  console.log("review", review);
  const handleRatingChange = (e, newRating) => {
    e.preventDefault();
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      reviews: [
        ...singleProduct.reviews,
        {
          text: review,
          rating: parseInt(rating),
          user: user.id,
        },
      ],
    };

    try {
      const res = await fetch(`${apiUrl}/api/products/${singleProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        message.error("bir şeyler yanlış gitti.");
        return;
      }

      if (res.ok) {
        const data = await res.json();
        console.log("data", data);
        setReview("");
        setRating(0);
        message.success("yorum başarıyla eklendi...");
      }
    } catch (error) {
      console.log("error", error);
      message.error("bir şeyler yanlış gitti.");
    }
  };

  console.log("singleProduct", singleProduct);
  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <p className="comment-notes">
        Your email address will not be published. Required fields are marked
        <span className="required">*</span>
      </p>
      <div className="comment-form-rating">
        <label>
          Your rating
          <span className="required">*</span>
        </label>
        <div className="stars">
          <a
            href="#"
            onClick={(e) => handleRatingChange(e, 1)}
            className={`star ${rating === 1 && "active"}`}
          >
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            onClick={(e) => handleRatingChange(e, 2)}
            className={`star ${rating === 2 && "active"}`}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            onClick={(e) => handleRatingChange(e, 3)}
            className={`star ${rating === 3 && "active"}`}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            onClick={(e) => handleRatingChange(e, 4)}
            className={`star ${rating === 4 && "active"}`}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            onClick={(e) => handleRatingChange(e, 5)}
            className={`star ${rating === 5 && "active"}`}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
        </div>
      </div>
      <div className="comment-form-comment form-comment">
        <label htmlFor="comment">
          Your review
          <span className="required">*</span>
        </label>
        <textarea
          id="comment"
          cols="50"
          rows="10"
          onChange={(e) => setReview(e.target.value)}
          value={review}
        ></textarea>
      </div>

      <div className="comment-form-cookies">
        <input id="cookies" type="checkbox" />
        <label htmlFor="cookies">
          Save my name, email, and website in this browser for the next time I
          comment.
          <span className="required">*</span>
        </label>
      </div>
      <div className="form-submit">
        <input type="submit" className="btn submit" />
      </div>
    </form>
  );
};

export default ReviewForm;
