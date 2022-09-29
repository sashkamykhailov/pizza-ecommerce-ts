import { FC } from "react";
import "./PaymentPage.scss";
import PaymentCard from "../../components/PaymentCard/PaymentCard";
import { motion } from "framer-motion";

const PaymentPage: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PaymentCard />;
    </motion.div>
  );
};

export default PaymentPage;
