import Navbar from "./components/Navbar/Navbar";
import Logo from "./components/LogoHeader/Logo";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Market from "./pages/Market/Market";
import Reviews from "./pages/Reviews/Reviews";
import Sell from "./pages/Sell/Sell";
import Signup from "./pages/Signup/Signup";
import Seller from "./pages/Seller/Seller";
import PostItem from "./pages/Post-Item/PostItem";
import PostReview from "./pages/Post-Review/PostReview";
import SellerReviews from "./pages/Seller-Reviews/SellerReviews";
import ProductReview from "./pages/Product-Reviews/ProductReview";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Logo />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/market' element={<Market />}></Route>
        <Route path='/reviews' element={<Reviews />}></Route>
        <Route path='/sell' element={<Sell />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/seller' element={<Seller />}></Route>
        <Route path='/post-item' element={<PostItem />}></Route>
        <Route path='/post-reviews' element={<PostReview />}></Route>
        <Route path='/seller-reviews' element={<SellerReviews />}></Route>
        <Route path='/product-reviews' element={<ProductReview />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
