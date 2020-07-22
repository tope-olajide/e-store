import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
const ProductCard = ({name, price, isUserFavorite, image, productId}) => {
  return (
    <>
        <section className="product-wrapper">
          <Link to={`/product-details/${productId}`}>
          <div className="product-card-image-container"><img alt={image} src={image} /></div>
          <section className="product-info">
            <div className="product-name_wish-list">
              <p>{name}</p>
              <span className="">
              <FontAwesomeIcon icon={isUserFavorite?["fas", "heart"]:["far", "heart"]}/>
              </span>
            </div>
            <p className="product-price">{price}</p>
          </section></Link>
        </section>
    </>
  );
};
export default ProductCard;
