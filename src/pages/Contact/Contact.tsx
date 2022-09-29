import { FC } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import { motion } from "framer-motion";
import "./Contact.scss";

const Contact: FC = () => {
  return (
    <motion.div
      className="pizza page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ContactForm />
    </motion.div>
  );
};

export default Contact;
