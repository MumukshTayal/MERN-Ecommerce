import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import webFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOption from "./component/layout/Header/UserOption.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      toast.error("Please Login!")
    }
  }

  console.log(user);
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <>
      <Router>
        {/* <Routes>
          <Route exact path="/" element={<Header />}></Route>
        </Routes> */}
        <Header />
        {isAuthenticated && <UserOption user={user} />}
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/product/:id" element={<ProductDetails />}></Route>
          <Route exact path="/products" element={<Products />}></Route>
          <Route path="/products/:keyword" element={<Products />}></Route>

          <Route exact path="/search" element={<Search />}></Route>

          {/* <ProtectedRoute exact path="/account" element={<Profile />} /> */}
          {/* <Route exact path="/account" element={<Profile />}></Route> */}
          {/* <Route element={<ProtectedRoute />} /> */}
          {/* <ProtectedRoute exact path="/account" element={<Profile />} /> */}
          {/* <Route exact path="/account" element={<Profile />} /> */}

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            {stripeApiKey && (
              <Route
                path="/process/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              ></Route>
            )}
          </Route>

          {/* Protected Routes  */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/account" element={<Profile />}></Route>
            <Route path="/me/update" element={<UpdateProfile />}></Route>
            <Route path="/password/update" element={<UpdatePassword />}></Route>
            <Route exact path="/shipping" element={<Shipping />}></Route>
            <Route path="/order/confirm" element={<ConfirmOrder />}></Route>
            {/* <Elements stripe={loadStripe(stripeApiKey)}>
              <Route path="/process/payment" element={<Payment />}></Route>
            </Elements> */}
            <Route exact path="/success" element={<OrderSuccess />}></Route>
          </Route>

          <Route path="/password/forgot" element={<ForgotPassword />}></Route>
          <Route
            path="/password/reset/:token"
            element={<ResetPassword />}
          ></Route>
          <Route exact path="/login" element={<LoginSignUp />}></Route>

          <Route exact path="/cart" element={<Cart />}></Route>
        </Routes>
        <Footer />
      </Router>
      {/* <div style={{ position: 'sticky', top: '20px', right: '20px', zIndex: '-1' }}> */}
      <ToastContainer />
      {/* </div> */}
    </>
  );
}

export default App;
