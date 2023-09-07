import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useLocation, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/loader/loader";
// import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import Metadata from "../layout/Metadata";
import { addItemsToCart } from "../../actions/cartAction";

const ProductDetails = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const location = useLocation();
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Items Added To Cart");
  };

  const [quantity, setQuantity] = useState(1);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(quantity - 1);
  };
  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      return;
    }
    setQuantity(quantity + 1);
  };
  useEffect(() => {
    //console.log(match);
    // const id = location.pathname.split("/")[2];
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${product.name}...ECOMMERCE`} />

          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => {
                    console.log(item.url);
                    return (
                      <img
                        src={item.url}
                        alt={`${i} Slide`}
                        className="CarouselImage"
                        key={item.url}
                      />
                    );
                  })}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span> ({product.numberOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`$${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
                  <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => {
                  return <ReviewCard review={review} />;
                })}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;

// import React, { Fragment, useEffect } from "react";
// import Carousel from "react-material-ui-carousel";
// import "./ProductDetails.css";
// import { useSelector, useDispatch } from "react-redux";
// import { getProductDetails } from "../../actions/productAction";
// import { useParams } from "react-router-dom";
// import Loader from "../layout/loader/loader";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const { product } = useSelector((state) => state.productDetails);

//   useEffect(() => {
//     dispatch(getProductDetails(id));
//   }, [dispatch, id]);

//   if (!product) {
//     return (
//       <div>
//         {" "}
//         <Loader />{" "}
//       </div>
//     );
//   }

//   return (
//     <Fragment>
//       <div className="ProductDetails">
//         <div>
//           <Carousel showArrows={false}>
//             {product.images &&
//               product.images.map((item, i) => (
//                 <img
//                   className="CarouselImage"
//                   src={item.url}
//                   alt={`${i} Slide`}
//                   key={item.url}
//                 />
//               ))}
//           </Carousel>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default ProductDetails;
