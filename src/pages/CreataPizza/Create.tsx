import { FC, useState } from "react";
import "./Create.scss";
import "react-widgets/styles.css";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import {
  setIngradients,
  setSize,
  setType,
  setToStart
} from "../../redux/Slices/createPizzaSlice";
import { addItemToCart, CartItem } from "../../redux/Slices/cartSlice";
import { Multiselect, DropdownList } from "react-widgets";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
import { motion } from "framer-motion";

const Create: FC = () => {
  const [name, setName] = useState<string>("");
  const [sizeForPizza, setSizePizza] = useState<number>(1);
  const [typeForPizza, setTypePizza] = useState<string>("Classic");

  const { items, totalPrice, pizzaSizesArray, pizzaTypesArray } = useSelector(
    (state) => state.createPizza
  );
  const dispatch = useAppDispatch();

  let navigate = useNavigate();

  const addPizzaToCart = () => {
    if (totalPrice > 39) {
      const item: CartItem = {
        id: Date.now().toFixed(5).toString(),
        title: name || "Your Pizza",
        price: totalPrice,
        imageUrl:
          "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/1e1a6e80-b3ba-4a44-b6b9-beae5b1fbf27.jpg",
        type: typeForPizza,
        size: sizeForPizza,
        count: 1
      };
      dispatch(addItemToCart(item));
      dispatch(setToStart());
      Store.addNotification({
        title: "Wonderful!",
        message: `"${item.title}" Added to cart`,
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
      let path = `/cart`;
      navigate(path);
    } else {
      Store.addNotification({
        title: "Wonderful!",
        message: `Total price of self-create pizza, needs to be at least 40$`,
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      });
    }
  };

  const setIngradientArray = (e: any) => {
    dispatch(setIngradients(e));
  };

  const setSizeForPizza = (e: any) => {
    setSizePizza(e.pizzaIndex);
    dispatch(setSize(e));
  };

  const setTypeForPizza = (e: any) => {
    setTypePizza(e.pizzaType);
    dispatch(setType(e));
  };

  return (
    <motion.div
      className="create page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="create__header">Create your own Pizza</div>
      <div className="create__complete">
        <div className="create__pizzablock">
          <div className="create__pizzaimage">
            <img
              src={
                totalPrice > 39
                  ? "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/1e1a6e80-b3ba-4a44-b6b9-beae5b1fbf27.jpg"
                  : "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg"
              }
              alt="pizza-img"
              className="create__pizzaimg"
            />
          </div>
          <div className="create__priceinfo">
            <div className="create__price">
              Price for self-made pizza: {totalPrice} $
            </div>
            <div className="create__addtocart">
              <button className="button-btn" onClick={addPizzaToCart}>
                {totalPrice > 39 ? "Add to Cart" : "40$ minimum"}
              </button>
            </div>
          </div>
        </div>

        <div className="create__pizzaelements">
          <div className="create__input"></div>
          <div className="create__ingradients">
            <div className="create__ingradient">
              <input
                placeholder="Call your pizza"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input__name"
              />
            </div>
            <div className="create__ingradient">
              <Multiselect
                placeholder="Chose ingradients"
                data={items}
                textField="ingradient"
                dataKey="id"
                showSelectedItemsInList
                onChange={setIngradientArray}
              />
            </div>
            <div className="create__ingradient">
              <DropdownList
                placeholder="Chose size of pizza"
                data={pizzaSizesArray}
                textField="pizzaSize"
                dataKey="id"
                onChange={setSizeForPizza}
              />
            </div>
            <div className="create__ingradient">
              <DropdownList
                placeholder="Chose type of pizza"
                data={pizzaTypesArray}
                textField="pizzaType"
                dataKey="id"
                onChange={setTypeForPizza}
              />
            </div>
          </div>
          <hr></hr>
        </div>
      </div>
    </motion.div>
  );
};

export default Create;
