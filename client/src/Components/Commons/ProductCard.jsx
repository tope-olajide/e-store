import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const ProductCard = ({name, price, isUserFavorite, image}) => {
  return (
    <>
        <section className="product-wrapper">
          <div className="product-card-image-container"><img alt={image} src={image} /></div>
          <section className="product-info">
            <div className="product-name_wish-list">
              <p>{name}</p>
              <span className="">
              <FontAwesomeIcon icon={isUserFavorite?["fas", "heart"]:["far", "heart"]}/>
              </span>
            </div>
            <p className="product-price">{price}</p>
          </section>
        </section>
    </>
  );
};
export default ProductCard;
