import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/slice";
import styles from "./ContactForm.module.css";

const ContactForm = ({ setIsActive }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.contacts);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Required!"),
    number: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Required!"),
  });

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(addContact(values));
        setIsActive(true);
        resetForm();
      }}
    >
      {() => (
        <div className={styles.cont}>
          <Form className={styles.form}>
            <div className={styles.container}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className={styles.field}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.container}>
              <label htmlFor="number" className={styles.label}>
                Phone number
              </label>
              <Field
                type="number"
                id="number"
                name="number"
                className={styles.field}
              />
              <ErrorMessage
                name="number"
                component="div"
                className={styles.error}
              />
            </div>

            <button type="submit" className={styles.btn}>
              {loading ? "Adding contacts..." : "Add contact"}
            </button>

            {error && <p>Error: {error}</p>}
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default ContactForm;
