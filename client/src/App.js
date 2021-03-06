import React from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import { Route, Switch } from "react-router-dom";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import AllProducts from "./Components/AllProducts";
import ProductDetails from "./Components/ProductDetails"
import NewProduct from "./Components/NewProduct"
import UploadImage from "./Components/UploadImage"
import ImageGallery from "./Components/ImageGallery"
library.add(faHeart, faHeartRegular);

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/" component={AllProducts} />
        <Route exact path="/product-details/:productId" component={ProductDetails} />
        <Route exact path="/create-new-product" component={NewProduct} />
        <Route exact path="/image-upload" component={UploadImage} />
        <Route exact path="/image-gallery" component={ImageGallery} />
      </Switch>
    </>
  );
}

export default App;
