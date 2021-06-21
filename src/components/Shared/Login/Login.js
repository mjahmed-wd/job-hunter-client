import React, { useContext, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
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
  
  const chubbyStyles = useGradientBtnStyles({ chubby: true });
  const styles = useStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });

  const initData = { userType: "", userPackage: "", email: "", password: "" };
  const { currentUser, auth } = useContext(AuthContext);

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
              overline={"Welcome to Job Hunting Battleground"}
              heading={"Login"}
              body={"Default Admin Email: mjahmed@gmail.com And Password: 11223344"}
            />
            <div className="pt-3">
              <Formik
                initialValues={initData}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                  //   console.log(values);
                  auth.signinWithEmail(values?.email, values?.password, values);
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
                    <div className="d-flex flex-column form-group">
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
                    <div className="d-flex flex-column form-group">
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

                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      Sign In
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Signup;
