import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Shared/ProvideAuth/ProvideAuth";

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
      .get(`http://localhost:5000/findJob/${jobId}`)
      .then((res) => {
        setJobData(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(
        `http://localhost:5000/checkDuplicateApply/${jobId}/${currentUser?.email}`
      )
      .then((res) => {
        if (res.data.length>0) {
          setIsAlreadyApplied(true);
        }
        else{
            setIsAlreadyApplied(false)
        }
      }).then(err=>console.log(err))
  }, []);

  return (
    <div>
      <h2>Job data</h2>
      {jobData !== {} && (
        <>
          <div>
            <h2>{jobData?.jobTitle}</h2>
            <p>Company: {jobData?.companyName}</p>
            <p>Employer Name: {jobData?.employerName}</p>
            <p>Work Hour: {jobData?.jobHoursPerMonth}</p>
            <p>Job Category:{jobData?.jobTag?.label}</p>
          </div>
          {isAlreadyApplied ? (
            <h2>You have already applied on this post</h2>
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
                  .post(`http://localhost:5000/applyOnJob`, appliedData)
                  .then((res) => {
                    alert("data added");
                    console.log(res);
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
                  <div>
                    <label htmlFor="name">Name: </label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {errors.name && touched.name && errors.name}
                  </div>
                  <div>
                    <label htmlFor="qualification">Your Qualifications</label>
                    <input
                      type="text"
                      name="qualification"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.qualification}
                    />
                    {errors.qualification &&
                      touched.qualification &&
                      errors.qualification}
                  </div>
                  <div>
                    <label htmlFor="phone">Your Phone No</label>
                    <input
                      type="text"
                      name="phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                    />
                    {errors.phone && touched.phone && errors.phone}
                  </div>
                  {values?.userType?.value !== "employer" && (
                    <button
                      type="submit"
                      disabled={isSubmitting || isAlreadyApplied}
                    >
                      Apply Now
                    </button>
                  )}
                </form>
              )}
            </Formik>
          )}
        </>
      )}
    </div>
  );
};

export default ApplyJob;
