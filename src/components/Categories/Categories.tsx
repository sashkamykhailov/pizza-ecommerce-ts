import "./Categories.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectFilter, choseCategory } from "../../redux/Slices/filterSlice";
import { FC } from "react";

const Categories: FC = () => {
  const categories = ["All", "Meat", "Vegan", "Grill", "Spicy", "Other"];

  const { category } = useSelector(selectFilter);
  const displatch = useDispatch();

  return (
    <ul className="categories">
      {categories.map((item, i) => {
        return (
          <li
            className={
              category === i ? "active categories__li" : "categories__li"
            }
            key={i}
            onClick={() => displatch(choseCategory(i))}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default Categories;
