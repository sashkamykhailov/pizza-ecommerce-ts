import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { FC } from "react";
import "./ContactForm.scss";
import { Store } from "react-notifications-component";

const ContactForm: FC = () => {
  const [closed, setClosed] = useState<boolean>(false);

  const buttonNotification = () => {
    Store.addNotification({
      title: "Wonderful!",
      message:
        "Some fields are filled incorrectly, please, check for correct inputs",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2500,
        onScreen: true
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      problem: "",
      text: "",
      terms: true
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(5, "At least 5 characters long")
        .max(30, "30 characters maximum"),
      email: Yup.string()
        .min(8, "Must be at least 8 characters long")
        .email("Incorrect email")
        .required("Required"),
      problem: Yup.string().required("Required"),
      text: Yup.string()
        .min(10, "At least 10 characters long")
        .required("Required"),
      terms: Yup.boolean()
        .required()
        .oneOf([true], "We need your agreement on that")
    }),

    onSubmit: (values) => {
      setClosed(true);
      (values.email = ""),
        (values.name = ""),
        (values.problem = ""),
        (values.terms = true),
        (values.text = "");
    }
  });

  return (
    <div className="formblock">
      <form className={closed ? "none" : "form"} onSubmit={formik.handleSubmit}>
        <div className="contact__text">
          <h3>
            Here you can leave feedback about our job <br />
            or let us know about any problems you faced during: <br />
            payment, ordering or order receiving.
          </h3>
        </div>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name ? (
          <div className="warning">{formik.errors.name}</div>
        ) : null}
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="warning">{formik.errors.email}</div>
        ) : null}
        <select
          id="problem"
          name="problem"
          value={formik.values.problem}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="technical">Problem with website</option>
          <option value="ordering">Problem with order</option>
          <option value="other">Other problem</option>
        </select>
        {formik.errors.problem && formik.touched.problem ? (
          <div className="warning">{formik.errors.problem}</div>
        ) : null}

        <textarea
          className="textarea"
          id="text"
          name="text"
          placeholder="Let us know the problem"
          value={formik.values.text}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.text && formik.touched.text ? (
          <div className="warning">{formik.errors.text}</div>
        ) : null}
        <label className="checkbox">
          <input
            className="checkbox"
            type="checkbox"
            name="terms"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="label__checkbox">I accept the privacy policy</div>
          {formik.errors.terms && formik.touched.terms ? (
            <div className="warning">{formik.errors.terms}</div>
          ) : null}
        </label>
        {!formik.touched.name ||
        !formik.touched.email ||
        !formik.touched.text ||
        !formik.touched.problem ||
        !formik.touched.terms ||
        formik.errors.terms ||
        formik.errors.text ||
        formik.errors.problem ||
        formik.errors.email ||
        formik.errors.name ? (
          <button className="button-submit" onClick={buttonNotification}>
            Send us a message
          </button>
        ) : (
          <button className="button-submit" type="submit">
            Send us a message
          </button>
        )}
      </form>
      <div className={closed ? "formthankyou" : "none"}>
        <h4>THANKS</h4>
        <p className="p-thanks">
          We received you feedback, <br></br>our team will contact you shortly.
        </p>
        <button
          className="button-submit button-btn "
          onClick={() => setClosed(false)}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
