import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Shared/ProvideAuth/ProvideAuth";

const PostApprove = () => {
  const [jobData, setJobData] = useState([]);
  const { currentUser, auth } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`https://job-hunter-bd.herokuapp.com/allposts`)
      .then((res) => {
        setJobData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const publishPost = (itemId, status) => {
      console.log(status)
    axios
      .patch(`https://job-hunter-bd.herokuapp.com/publishJobPost/${itemId}`, {status})
      .then((res) => {console.log("data is added")})
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {jobData?.length > 0 &&
        jobData.map((post, index) => (
          <div>
            <p>SL: {index + 1}</p>
            <p>{post?.employerName}</p>
            <p>{post?.companyName}</p>
            <p>{post?.jobTitle}</p>
            <p>{post?.jobHoursPerMonth}</p>
            <p>{post?.status}</p>
            <select
              name="postStatus"
              id="postStatus"
              onChange={(e) => publishPost(post?._id, e.target.value)}
            >
              <option value={post?.status}>{post?.status}</option>
              <option
                value="pending"
                style={{
                  display: post?.status === "pending" ? "none" : "block",
                }}
              >
                Pending
              </option>
              <option
                value="publish"
                style={{
                  display: post?.status === "publish" ? "none" : "block",
                }}
              >
                Publish
              </option>
            </select>
          </div>
        ))}
    </div>
  );
};

export default PostApprove;
