import React, { FC, useState } from "react";
import "./PizzaItem.scss";
import { addItemToCart } from "../../redux/Slices/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Store } from "react-notifications-component";
import { AppContext } from "../../context/context";

type PizzaItemProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  rating: number;
  sizes: number[];
  types: number[];
  description: string;
};

const PizzaItem: FC<PizzaItemProps> = ({
  id,
  title,
  price,
  imageUrl,
  rating,
  sizes,
  types,
  description
}) => {
  const [activeSize, setActiveSize] = useState<number>(0);
  const [activeType, setActiveType] = useState<number>(0);

  const typesOfPizza = ["Classic", "Chicago"];

  const { dark } = React.useContext(AppContext) as ContextType;

  const dispatch = useDispatch();

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      rating,
      type: typesOfPizza[activeType],
      size: activeSize,
      count: 1,
      description
    };
    dispatch(addItemToCart(item));
    Store.addNotification({
      title: "Wonderful!",
      message: `"${title}" added into the cart`,
      type: "success",
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
    <div className={dark ? "dark pizzaitem" : "pizzaitem"}>
      {title} / {activeSize === 0 ? price : price + 10} $
      <div className="pizzaitem__image">
        <img className="pizzaitem__img" src={imageUrl} alt={title} />
      </div>
      <div className="pizzaitem__sizes">
        {sizes.map((value, i) => (
          <div
            className={
              activeSize === i ? "active pizzaitem__li" : "pizzaitem__li"
            }
            key={i}
            onClick={() => setActiveSize(i)}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="pizzaitem__types">
        {types.map((value, i) => (
          <div
            className={
              activeType === i ? "active pizzaitem__li" : "pizzaitem__li"
            }
            key={i}
            onClick={() => setActiveType(i)}
          >
            {typesOfPizza[value]}
          </div>
        ))}
      </div>
      <div className="pizzaitem__rating">Rating: {rating} / 10</div>
      <div className="pizzaitem__cart">
        <button className="link_buy button-btn" onClick={onClickAdd}>
          Add to cart
        </button>
        <Link className="link_info" to={`/pizza/${id}`}>
          <div className="pizzaitem__cart">
            <button className="button-btn">Get info</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PizzaItem;
