import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "./SinglePizza.scss";

const SinglePizza: FC = () => {
  const [fullInfo, setFullInfo] = useState<{
    id: string;
    title: string;
    imageUrl: string;
    price: string;
    rating: string;
    description: string;
    types: number[];
    sizes: number[];
    category: number[];
  }>();

  const params = useParams<string>();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPizza() {
      try {
        const response = await axios.get(
          `https://62b38848a36f3a973d239308.mockapi.io/pizzas/${params.id}`
        );
        setFullInfo(response.data);
      } catch (error) {
        console.error("error", error);
      }
    }
    getPizza();
  });

  return (
    <motion.div
      className="pizzacreate page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {fullInfo ? (
        <div className="pizza-block">
          <div>
            <div className="pizzacreate__imageblock">
              <img
                className="pizzacreate__image"
                src={fullInfo.imageUrl}
                alt={fullInfo.title}
              />
            </div>
          </div>
          <div>
            <div>{fullInfo.title}</div>
            <div className="pizzacreate__price">Price: {fullInfo.price}$</div>
            <div className="pizzacreate__rating">
              Rating: {fullInfo.rating} / 10
            </div>
            <div className="pizzacreate__description">
              {fullInfo.description}
            </div>
            <div>
              <button className="button-btn" onClick={() => navigate(-1)}>
                Go back
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </motion.div>
  );
};

export default SinglePizza;
