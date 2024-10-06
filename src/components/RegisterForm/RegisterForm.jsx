import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../redux/auth/operations';
import css from './RegisterForm.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Username must be at least 2 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className={css.container}>
          <Form className={css.form} autoComplete="off">
            <label className={css.label}>
              Username
              <Field
                type="text"
                name="name"
                placeholder="Username"
                className={css.field}
              />
              <ErrorMessage name="name" component="div" className={css.error} />
            </label>
            <label className={css.label}>
              Email
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className={css.field}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </label>
            <label className={css.label}>
              Password
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={css.field}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </label>
            <button type="submit" disabled={isSubmitting} className={css.btn}>
              Submit
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
