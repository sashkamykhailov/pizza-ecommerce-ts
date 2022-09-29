import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/Slices/cartSlice";
import { Link } from "react-router-dom";

const HeaderMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const { totalPrice, totalAmount } = useSelector(selectCart);

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  return (
    <Menu isOpen={isOpen} onOpen={handleIsOpen} onClose={handleIsOpen}>
      <Link className="menu-item" to="/" onClick={closeSideBar}>
        Pizza
      </Link>

      <Link className="menu-item" to="/create-pizza" onClick={closeSideBar}>
        Create Pizza
      </Link>

      <Link className="menu-item" to="/contact" onClick={closeSideBar}>
        Contact
      </Link>

      <Link className="menu-item" to="/cart" onClick={closeSideBar}>
        Cart {totalPrice}$ / ({totalAmount})
      </Link>
    </Menu>
  );
};

export default HeaderMobile;
