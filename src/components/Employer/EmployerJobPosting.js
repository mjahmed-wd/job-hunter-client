import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { AuthContext } from "../Shared/ProvideAuth/ProvideAuth";
import axios from "axios";

const EmployerJobPosting = () => {
  const { currentUser, auth } = useContext(AuthContext);
  console.log(+currentUser?.jobHourPerMonth);
  const validationSchema = Yup.object().shape({
    jobHoursPerMonth: Yup.number().max(
      +currentUser?.jobHourPerMonth,
      `${currentUser?.jobHourPerMonth} is you package limit`
    ),
    // )
  });
  // will find the limit in user.jobHourPerMonth
  const initData = {
    employerName: "",
    companyName: "",
    jobTitle: "",
    jobHoursPerMonth: "",
    jobTag: { value: 1, label: "All" },
  };

  const jobTagOptions = [
    { value: 1, label: "All" },
    { value: 2, label: "Govt. Job" },
    { value: 3, label: "Non Govt. Job" },
    { value: 4, label: "Bank Job" },
  ];
  return (
    <div>
      <h2>Post a Job</h2>
      <Formik
        initialValues={initData}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const data = { ...values, email: currentUser?.email };
          //   console.log(values);
          //   auth.signinWithEmail(values?.email, values?.password, values);
          axios
            .post(`http://localhost:5000/addJob`, data)
            .then((res) => alert("job post is pending for approval"))
            .catch((err) => console.log(err));
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
          dirty,
          isValid,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="employerName">Type Your Name</label>
              <input
                type="employerName"
                name="employerName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.employerName &&
                touched.employerName &&
                errors.employerName}
            </div>
            <div>
              <label htmlFor="companyName">Type Your Company Name</label>
              <input
                type="companyName"
                name="companyName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyName}
              />
              {errors.companyName && touched.companyName && errors.companyName}
            </div>
            <div>
              <label htmlFor="jobTitle">Type the Job Title</label>
              <input
                type="jobTitle"
                name="jobTitle"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.jobTitle}
              />
              {errors.jobTitle && touched.jobTitle && errors.jobTitle}
            </div>
            <div>
              <label htmlFor="jobHoursPerMonth">
                Type Job Hours Per Month{" "}
              </label>
              <input
                type="jobHoursPerMonth"
                name="jobHoursPerMonth"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.jobHoursPerMonth}
                type="number"
                min={0}
              />
              {errors.jobHoursPerMonth &&
                touched.jobHoursPerMonth &&
                errors.jobHoursPerMonth}
            </div>
            <div>
              <label htmlFor="jobTag">Select Job Tag</label>
              <Select
                options={jobTagOptions}
                name="jobTag"
                onChange={(v) => {
                  setFieldValue("jobTag", v);
                }}
              />
            </div>

            <button type="submit" disabled={!dirty || !isValid }>
              Post the job
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EmployerJobPosting;
