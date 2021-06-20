import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { AuthContext } from "../ProvideAuth/ProvideAuth";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email field is required"),
  password: Yup.string()
    .required("Please Enter your password")
    .min(8, "Minimum 8 character long"),
  // )
});

const Signup = () => {
  const initData = { userType: "", userPackage: "", email: "", password: "" };
  const { currentUser, auth } = useContext(AuthContext);

  return (
    <div>
      <Formik
        initialValues={initData}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          //   console.log(values);
          auth.signinWithEmail(values?.email, values?.password,values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Type Your Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
            </div>
            <div>
              <label htmlFor="password">Type Your Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
            </div>
            <button type="submit" disabled={isSubmitting}>
              Sign In
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
