import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectFilter, choseSort } from "../../redux/Slices/filterSlice";
import "./Sort.scss";

const Sort = () => {
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const sorts = ["price", "rating"];

  const { sort } = useSelector(selectFilter);
  const displatch = useDispatch();

  const sortHandler = (i: string): void => {
    displatch(choseSort(i));
    setOpenWindow(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <span onClick={() => setOpenWindow(!openWindow)}>Sort by: {sort}</span>
      </div>
      {openWindow ? (
        <div className="sort__block">
          <ul className="sort__ul">
            {sorts.map((item, i) => (
              <li
                className={
                  sort === i.toString() ? "active sort__li" : "sort__li"
                }
                key={i}
                onClick={() => sortHandler(sorts[i])}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Sort;
