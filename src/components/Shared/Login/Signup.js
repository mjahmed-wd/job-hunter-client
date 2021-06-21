import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import StripeCheckOut from "./StripeCheckOut";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Select from "react-select";
import { AuthContext } from "../ProvideAuth/ProvideAuth";
import { useHistory, useLocation } from "react-router";

import { CircularProgress } from "@material-ui/core";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useFourThreeCardMediaStyles } from "@mui-treasury/styles/cardMedia/fourThree";
import { useN04TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n04";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";
import { useGradientBtnStyles } from "@mui-treasury/styles/button/gradient";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "75%",
    margin: "auto",
    borderRadius: 12,
    padding: 12,
  },
  media: {
    borderRadius: 6,
    width: "50%",
    height: "50%",
  },
}));

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
  { value: "10", label: "Basic (10 hours per Month)" },
  { value: "20", label: "Standard (20 hours per Month)" },
  { value: "30", label: "Premium (30 hours per Month)" },
];

const Signup = () => {
  const chubbyStyles = useGradientBtnStyles({ chubby: true });
  const styles = useStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });

  const initData = { userType: "", userPackage: "", email: "", password: "" };
  const { currentUser, auth } = useContext(AuthContext);
  const [validation, setValidation] = useState(jobSeekerSignupSchema);
  const [trackingId, setTrackingId] = useState("");

  const completeEmployeeSignup = (id, formValue) => {
    const data = {
      transactionID: id,
      ...formValue,
    };
    auth.signupWithEmail(data?.email, data?.password, formValue);
  };

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (currentUser === null) {
      console.log("null value for user");
    } else {
      // A valid user just logged in. Loaded from context Api
      history.replace(from);
    }
  }, [currentUser, from, history]);

  return (
    <>
      <div className="container mt-5 mb-5">
        <Card className={cx(styles.root, shadowStyles.root)}>
          <CardContent>
            <TextInfoContent
              classes={textCardContentStyles}
              overline={"Thank you for joining in our job hunting battleground"}
              heading={"Sign Up"}
              body={`There are few pre-built user, you can use them. 
              Job Seeker Email: jobSeeker@gmail.com
              Pass: 11223344
              Employer Email: employer@gmail.com
              Pass: 11223344
              Admin Email: mjahmed@gmail.com
              Pass: 11223344
              `}
            />
            <div className="pt-3">
              <Formik
                initialValues={initData}
                validationSchema={validation}
                onSubmit={(values, { setSubmitting }) => {
                  //   console.log(values);

                  auth.signupWithEmail(values?.email, values?.password, values)
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
                    <label htmlFor="userType">
                      Select User Registration Type
                    </label>
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
                        <label htmlFor="userPackage">
                          Select Employer Package
                        </label>
                        <Select
                          name="userPackage"
                          options={packageOptions}
                          onChange={(v) => setFieldValue("userPackage", v)}
                        />
                      </>
                    )}
                    <div className="form-group d-flex flex-column">
                      <label htmlFor="email">Type Your Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      {errors.email && touched.email && errors.email}
                    </div>
                    <div className="form-group d-flex flex-column">
                      <label htmlFor="password">Type Your Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      {errors.password && touched.password && errors.password}
                    </div>
                    {values?.userType?.value === "employer" && (
                      <Elements stripe={stripePromise}>
                        <StripeCheckOut
                          saveTrackingId={setTrackingId}
                          completeEmployeeSignup={completeEmployeeSignup}
                          values={values}
                        />
                      </Elements>
                    )}
                    {values?.userType?.value !== "employer" && (
                      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        Sign Up To Find a Job
                      </button>
                    )}
                  </form>
                )}
              </Formik>

              <button onClick={() => auth.signout()} className="d-none">Sign Out</button>
              <button onClick={() => auth.signin()} className="d-none">Google Login </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Signup;
