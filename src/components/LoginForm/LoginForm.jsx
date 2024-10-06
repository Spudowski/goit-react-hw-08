import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { logIn } from '../../redux/auth/operations';
import css from './LoginForm.module.css';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        console.log("login success");
      })
      .catch(() => {
        console.log("login error");
      });

    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className={css.container}>
          <Form className={css.form} autoComplete="off">
            <label className={css.label}>
              <span className={css.text}>Email</span>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                className={css.field}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </label>
            <button type="submit" disabled={isSubmitting} className={css.btn}>
              Sign In
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
