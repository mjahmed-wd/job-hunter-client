import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

import { AuthContext } from "../../Shared/ProvideAuth/ProvideAuth";
import ApplyJobCard from "./ApplyJobCard";
import Header from "../../Shared/Header/Header";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3, "Name is too short").required("Name is required"),
  qualification: Yup.string().required(
    "Please Enter your Educational Qualifications"
  ),
  phone: Yup.number().required("Please add your Number"),
});

const ApplyJob = () => {
  const { jobId } = useParams();
  const { currentUser, auth } = useContext(AuthContext);
  const [jobData, setJobData] = useState({});
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const initData = {
    name: "",
    qualification: "",
    phone: "",
  };
  useEffect(() => {
    axios
      .get(`https://job-hunter-bd.herokuapp.com/findJob/${jobId}`)
      .then((res) => {
        setJobData(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(
        `https://job-hunter-bd.herokuapp.com/checkDuplicateApply/${jobId}/${currentUser?.email}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          setIsAlreadyApplied(true);
        } else {
          setIsAlreadyApplied(false);
        }
      })
      .then((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header/>
      {jobData !== {} && (
        <>
          <ApplyJobCard
            title={jobData?.jobTitle}
            company={jobData?.companyName}
            description={` Job was posted by ${jobData?.employerName}, ${jobData?.jobHoursPerMonth} work hour per month, Job Category: ${jobData?.jobTag?.label} `}
          >
            {isAlreadyApplied ? (
            <h2 className="text-center">You have already applied on this post</h2>
          ) : (
            <Formik
              initialValues={initData}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                const appliedData = {
                  ...values,
                  jobId,
                  email: currentUser?.email,
                };
                axios
                  .post(`https://job-hunter-bd.herokuapp.com/applyOnJob`, appliedData)
                  .then((res) => {
                    alert("data added");
                    // toast("hi")
                  })
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
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="form-group d-flex flex-column">
                    <label htmlFor="name">Name: </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {errors.name && touched.name && errors.name}
                  </div>
                  <div className="form-group d-flex flex-column">
                    <label htmlFor="qualification">Your Qualifications</label>
                    <input
                      type="text"
                      name="qualification"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.qualification}
                    />
                    {errors.qualification &&
                      touched.qualification &&
                      errors.qualification}
                  </div>
                  <div className="form-group d-flex flex-column">
                    <label htmlFor="phone">Your Phone No</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                    />
                    {errors.phone && touched.phone && errors.phone}
                  </div>
                  {values?.userType?.value !== "employer" && (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting || isAlreadyApplied}
                    >
                      Apply Now
                    </button>
                  )}
                </form>
              )}
            </Formik>
          )}
          
          </ApplyJobCard>
        </>
      )}
    </div>
  );
};

export default ApplyJob;
