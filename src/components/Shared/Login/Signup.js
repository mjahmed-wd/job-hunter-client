import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import StripeCheckOut from "./StripeCheckOut";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Select from "react-select";
import { AuthContext } from "../ProvideAuth/ProvideAuth";

const jobSeekerSignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email field is required"),
  password: Yup.string()
    .required("Please Enter your password")
    .min(8, "Minimum 8 character long"),
  userType: Yup.object().required("User Type is required"),
});
const employerSignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email field is required"),
  password: Yup.string()
    .required("Please Enter your password")
    .min(8, "Minimum 8 character long"),
  userType: Yup.object().required("User Type is required"),
  userPackage: Yup.object().required("User Type is required"),
});

const stripePromise = loadStripe(
  "pk_test_51IeCl6GgOq4qQ2BSUHhS6xH9f7j7vCdcz6rQMTyxKVdKzD2tVYTklbGgX0W2ABCHnHpo8gquw9CmxLPBSIvfkoFB001rCrgM2I"
);

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
  const [validation, setValidation] = useState(jobSeekerSignupSchema);
  const [trackingId,setTrackingId]=useState("")

  const completeEmployeeSignup=(id, formValue)=>{
    const data={
       transactionID: id,
       ...formValue
    }
    auth.signupWithEmail(data?.email, data?.password, formValue)
  }

  return (
    <div>
      <Formik
        initialValues={initData}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting }) => {
          //   console.log(values);

          auth.signupWithEmail(values?.email, values?.password, values);
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
              onChange={(v) => {
                setFieldValue("userType", v);
                if (v.label === "Job Seeker") {
                  setValidation(jobSeekerSignupSchema);
                } else {
                  setValidation(employerSignupSchema);
                }
              }}
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
            {values?.userType?.value === "employer" && (
              <Elements stripe={stripePromise}>
                <StripeCheckOut saveTrackingId={setTrackingId} completeEmployeeSignup={completeEmployeeSignup} values={values}/>
              </Elements>
            )}
           {values?.userType?.value !== "employer"&& <button type="submit" disabled={isSubmitting}>
              Sign Up
            </button>}
          </form>
        )}
      </Formik>
      <button onClick={() => auth.signout()}>Sign Out</button>
      <button onClick={() => auth.signin()}>Google Login</button>
    </div>
  );
};

export default Signup;
