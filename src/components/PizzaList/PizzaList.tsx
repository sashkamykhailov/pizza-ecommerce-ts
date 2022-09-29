import { FC, useEffect, useState } from "react";
import PizzaItem from "../PizzaItem/PizzaItem";
import Categories from "../Categories/Categories";
import Sort from "../Sort/Sort";
import Search from "../Search/Search";
import Skeleton from "../../UI/Skeleton/Skeleton";
import "./PizzaList.scss";
import Pagination from "../../UI/Pagination/Pagination";
import { useSelector } from "react-redux";
import { chosePage, selectFilter } from "../../redux/Slices/filterSlice";
import { fetchPizzas, selectPizza } from "../../redux/Slices/pizzaSlice";
import { useAppDispatch } from "../../redux/store";
import { motion } from "framer-motion";

const PizzaList: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [paginationVisible, setPaginationVisible] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const { items, isLoading, status } = useSelector(selectPizza);
  const { category, sort, page } = useSelector(selectFilter);

  async function getPizzas() {
    if (searchValue || category !== 0) {
      setPaginationVisible(false);
    } else {
      setPaginationVisible(true);
    }
    dispatch(fetchPizzas({ page, sort, category, searchValue }));
  }

  useEffect(() => {
    getPizzas();
  }, [sort, category, searchValue, setSearchValue, page]);

  const changeThePage = (i: number) => {
    dispatch(chosePage(i));
  };

  return (
    <div className="app_container">
      <div className="pizzalist">
        <div className="pizzalist__input">
          <Search setValue={(i: string) => setSearchValue(i)} />
        </div>
        <div className="pizzalist__sort">
          <Sort />
          <Categories />
        </div>
        <div className="pizzalist__items">
          {status === "error"
            ? "Sorry, something went wrong... We are fixing it. Please, reload the page."
            : isLoading
            ? [...new Array(items.length)].map((_, i) => <Skeleton key={i} />)
            : items.map((item) => {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pizzalist__singlepizza"
                  >
                    <PizzaItem {...item} id={item.id} />
                  </motion.div>
                );
              })}
        </div>
        {paginationVisible ? (
          <div className="pizzalist__pagination">
            <Pagination setValue={(i) => changeThePage(i)} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PizzaList;
