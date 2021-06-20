import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Shared/ProvideAuth/ProvideAuth";

const EmployerAllJobsPosted = () => {
  const [jobData, setJobData] = useState([]);
  const { currentUser, auth } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/allJobBySingleEmployer/${currentUser?.email}`)
      .then((res) => {
        setJobData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {jobData?.length > 0 &&
        jobData.map((post,index) => (
          <>
            <p>SL: {index+1}</p>
            <p>{post?.employerName}</p>
            <p>{post?.companyName}</p>
            <p>{post?.jobTitle}</p>
            <p>{post?.jobHoursPerMonth}</p>
            <p>{post?.status}</p>
          </>
        ))}
    </div>
  );
};

export default EmployerAllJobsPosted;
