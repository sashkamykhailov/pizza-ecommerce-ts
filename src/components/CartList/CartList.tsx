import CartItem from "../CartItem/CartItem";
import Skeleton from "../../UI/Skeleton/Skeleton";
import "../PizzaList/PizzaList.scss";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/Slices/cartSlice";
import { FC } from "react";

const Cart: FC = () => {
  const { items } = useSelector(selectCart);

  return (
    <div className="cart__items">
      {items
        ? items.map((item) => {
            return <CartItem key={item.id} {...item} id={item.id} />;
          })
        : [...new Array(10)].map((_, i) => <Skeleton key={i} />)}
    </div>
  );
};

export default Cart;
