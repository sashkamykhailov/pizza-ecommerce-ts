import { Routes, Route, useLocation } from "react-router-dom";

import Cart from "./Cart/Cart";
import Pizza from "./Pizza/Pizza";
import Create from "./CreataPizza/Create";
import Contact from "./Contact/Contact";
import PaymentPage from "./PaymentPage/PaymentPage";
import SinglePizza from "./SinglePizza/SinglePizza";

import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/" element={<Pizza />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/create-pizza" element={<Create />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/pizza/:id" element={<SinglePizza />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedRoutes;
