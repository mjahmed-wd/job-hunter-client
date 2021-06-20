import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { AuthContext } from "../ProvideAuth/ProvideAuth";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email field is required"),
  password: Yup.string()
    .required("Please Enter your password")
    .min(8, "Minimum 8 character long"),
  userType: Yup.object().required("User Type is required"),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  //   "Minimum eight characters, at least one letter, one number and one special character"
  // )
});
const userOptions = [
  { value: "jobSeeker", label: "Job Seeker" },
  { value: "employer", label: "Employer" },
];
const packageOptions = [
  { value: "10", label: "Basic" },
  { value: "20", label: "Standard" },
  { value: "30", label: "Premium" },
];

const Signup = () => {
  const initData = { userType: "", userPackage: "", email: "", password: "" };
  const { currentUser, auth } = useContext(AuthContext);

  return (
    <div>
      <Formik
        initialValues={initData}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          //   console.log(values);

          auth.signupWithEmail(values?.email, values?.password,values);
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
            <label htmlFor="userType">Select User Registration Type</label>
            <Select
              options={userOptions}
              name="userType"
              onChange={(v) => setFieldValue("userType", v)}
            />
            {errors.userType && touched.email && errors.userType}
            {values?.userType?.value === "employer" && (
              <>
                <label htmlFor="userPackage">Select Employer Package</label>
                <Select
                  name="userPackage"
                  options={packageOptions}
                  onChange={(v) => setFieldValue("userPackage", v)}
                />
              </>
            )}
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
              Sign Up
            </button>
          </form>
        )}
      </Formik>
      <button onClick={()=>auth.signout()}>Sign Out</button>
      <button onClick={() => auth.signin()}>Google Login</button>
    </div>
  );
};

export default Signup;
