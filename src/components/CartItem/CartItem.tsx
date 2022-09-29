import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  minusItem,
  removeItem,
  increaseAmount
} from "../../redux/Slices/cartSlice";
import { Store } from "react-notifications-component";
import "./CartItem.scss";

type CartItemProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  count: number;
  rating: number;
  size: number;
  type: number;
};

const CartItem: FC<CartItemProps> = ({
  id,
  title,
  price,
  imageUrl,
  count,
  rating,
  size,
  type
}) => {
  const dispatch = useDispatch();
  const sizeOfPizza = [26, 30, 40];

  const onClickMinus = () => {
    dispatch(minusItem(id));
    Store.addNotification({
      title: "Wonderful!",
      message: `"${title}" amount decreased`,
      type: "info",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true
      }
    });
  };

  const onClickPlus = () => {
    dispatch(increaseAmount({ id }));
    Store.addNotification({
      title: "Wonderful!",
      message: `"${title}" amount increased`,
      type: "info",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true
      }
    });
  };

  const onClickRemove = () => {
    dispatch(removeItem(id));
    Store.addNotification({
      title: "Wonderful!",
      message: `"${title}" has been removed`,
      type: "info",
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
    <div className="cart">
      <div className="cart__container">
        {title} / {price * count} $
        <div className="cart__image">
          <img className="cart__img" src={imageUrl} alt={title} />
        </div>
        <div className="cart__info">
          Size: {sizeOfPizza[size]}, type: {type}
        </div>
        <div className="cart__container-btn">
          <button
            className="button-plus button-cart"
            onClick={() => onClickPlus()}
          >
            {" "}
            +{" "}
          </button>
          {count}
          <button
            className="button-minus button-cart"
            onClick={() => onClickMinus()}
          >
            {" "}
            -{" "}
          </button>
        </div>
      </div>
      <div className="cart__buttons-proceed">
        <button
          className="button-remove button-cart"
          onClick={() => onClickRemove()}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
