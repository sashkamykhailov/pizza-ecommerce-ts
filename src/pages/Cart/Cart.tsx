import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartList from "../../components/CartList/CartList";
import { clearItems } from "../../redux/Slices/cartSlice";
import { selectCart } from "../../redux/Slices/cartSlice";
import { Store } from "react-notifications-component";
import { motion } from "framer-motion";
import "./Cart.scss";

const Cart: FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(selectCart);

  const clearCart = (): void => {
    dispatch(clearItems());
    Store.addNotification({
      title: "Wonderful!",
      message: "Cart has been cleared",
      type: "default",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1500,
        onScreen: true
      }
    });
  };

  return (
    <motion.div
      className="cart"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      {items.length > 0 ? (
        <div className="cart__items">
          <CartList />
          <div className="cart__buttons">
            <button
              className="cart__button-clear cart__button"
              onClick={clearCart}
            >
              Clear
            </button>
            <Link to="/payment">
              <button className="cart__button-pay cart__button">
                Pay ({totalPrice} $)
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart__empty">
          <h3>
            Here is no pizza... However, you can{" "}
            <Link to="/">
              <b className="b">order</b>
            </Link>{" "}
            one
          </h3>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
