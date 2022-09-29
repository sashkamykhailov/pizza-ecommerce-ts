import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/Slices/cartSlice";
import { FC } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AppContext } from "../../context/context";

const Header = () => {
  const { totalPrice, totalAmount } = useSelector(selectCart);

  const { changeTheme, dark } = React.useContext(AppContext) as ContextType;

  return (
    <div className={dark ? "dark header" : "header"}>
      <Link to="/">
        <div className={dark ? "dark header__logo" : "header__logo"}>LOGO</div>
      </Link>
      <nav className="header__nav">
        <ul className="header__ul">
          <li className="header__li">
            <Link className={dark ? "dark " : ""} to="/">
              Pizza
            </Link>
          </li>
          <li className="header__li">
            <Link className={dark ? "dark " : ""} to="/create-pizza">
              Create Pizza
            </Link>
          </li>
          <li className="header__li">
            <Link className={dark ? "dark " : ""} to="/contact">
              Contact
            </Link>
          </li>
        </ul>
        <Link className="header__link cart__link" to="/cart">
          <div className="cart__markers">
            <FaShoppingCart />{" "}
            <span className={dark ? "dark totalPrice" : "totalPrice"}>
              {totalPrice}$
            </span>{" "}
            <span className={dark ? "dark totalPrice" : "totalPrice"}>
              ({totalAmount})
            </span>
          </div>
        </Link>
      </nav>
      <button className="changetheme" onClick={() => changeTheme()}>
        CHANGE THEME
      </button>
    </div>
  );
};

export default Header;
