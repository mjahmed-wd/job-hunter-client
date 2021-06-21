import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { AuthContext } from "../Shared/ProvideAuth/ProvideAuth";
import axios from "axios";
import JobPostCard from "./JobPostCard";

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
      <JobPostCard>
      <Formik
        initialValues={initData}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const data = { ...values, email: currentUser?.email };
          //   console.log(values);
          //   auth.signinWithEmail(values?.email, values?.password, values);
          axios
            .post(`https://job-hunter-bd.herokuapp.com/addJob`, data)
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
            <div className="form-group d-flex flex-column">
              <label htmlFor="employerName">Type Your Name</label>
              <input
                type="employerName"
                name="employerName"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.employerName &&
                touched.employerName &&
                errors.employerName}
            </div>
            <div className="form-group d-flex flex-column">
              <label htmlFor="companyName">Type Your Company Name</label>
              <input
                type="companyName"
                name="companyName"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyName}
              />
              {errors.companyName && touched.companyName && errors.companyName}
            </div>
            <div className="form-group d-flex flex-column">
              <label htmlFor="jobTag">Select Job Tag</label>
              <Select
                options={jobTagOptions}
                name="jobTag"
                onChange={(v) => {
                  setFieldValue("jobTag", v);
                }}
              />
            </div>
            <div className="form-group d-flex flex-column">
              <label htmlFor="jobTitle">Type the Job Title</label>
              <input
                type="jobTitle"
                name="jobTitle"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.jobTitle}
              />
              {errors.jobTitle && touched.jobTitle && errors.jobTitle}
            </div>
            <div className="form-group d-flex flex-column">
              <label htmlFor="jobHoursPerMonth">
                Type Job Hours Per Month{" "}
              </label>
              <input
                type="jobHoursPerMonth"
                name="jobHoursPerMonth"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.jobHoursPerMonth}
                type="number"
                min={0}
              />
              <small>In your current package, you can post upto <b>{currentUser?.jobHourPerMonth}</b> hours per month job.</small>
              {errors.jobHoursPerMonth &&
                touched.jobHoursPerMonth &&
                errors.jobHoursPerMonth}
            </div>
           

            <button type="submit" className="btn btn-primary" disabled={!dirty || !isValid }>
              Post the job
            </button>
          </form>
        )}
      </Formik>
      </JobPostCard>
      
    </div>
  );
};

export default EmployerJobPosting;
