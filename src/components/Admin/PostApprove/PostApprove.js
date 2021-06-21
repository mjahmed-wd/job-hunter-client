import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Shared/ProvideAuth/ProvideAuth";

import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { useContainedCardHeaderStyles } from "@mui-treasury/styles/cardHeader/contained";
import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    marginTop: 40,
    borderRadius: spacing(0.5),
    transition: "0.3s",
    width: "90%",
    overflow: "initial",
    background: "#ffffff",
  },
  content: {
    paddingTop: 0,
    textAlign: "left",
    overflowX: "auto",
    "& table": {
      marginBottom: 0,
    },
  },
}));

let id = 0;
function createData(name, fat, price) {
  id += 1;
  return { id, name, fat, price };
}

const PostApprove = () => {
  const classes = useStyles();
  const cardHeaderStyles = useContainedCardHeaderStyles();
  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
  const cardHeaderShadowStyles = useFadedShadowStyles();

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
    console.log(status);
    axios
      .patch(`https://job-hunter-bd.herokuapp.com/publishJobPost/${itemId}`, {
        status,
      })
      .then((res) => {
        console.log("Data is Saved Successfully");
        alert("Data is Published");
      })
      .catch((err) => console.log(err));
  };

  const rows = jobData?.map((post, index) => ({
    id: index + 1,
    employerName: post.employerName,
    companyName: post.companyName,
    jobTitle: post.jobTitle,
    jobHoursPerMonth: post.jobHoursPerMonth,
    status: post.status,
  }));
  return (
    <div className="d-flex justify-content-center mt-3 mb-3">
      {jobData?.length > 0 && (
        <Card className={cx(classes.card, cardShadowStyles.root)}>
          <CardHeader
            className={cardHeaderShadowStyles.root}
            classes={cardHeaderStyles}
            title={"All Jobs Posted by Employers"}
            subheader={
              "Jobs will be published after the your Approval, You can undo this by selecting 'Pending'"
            }
          />
          <CardContent className={classes.content}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">SL</TableCell>
                  <TableCell align="right">Employer Name</TableCell>
                  <TableCell align="right">Company</TableCell>
                  <TableCell align="right">Job Title</TableCell>
                  <TableCell align="right">Hours per Month</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">{row.employerName}</TableCell>
                    <TableCell align="right">{row.companyName}</TableCell>
                    <TableCell align="right">{row.jobTitle}</TableCell>
                    <TableCell align="right">{row.jobHoursPerMonth}</TableCell>
                    <TableCell align="right">
                      <select
                        name="postStatus"
                        id="postStatus"
                        className="form-control"
                        onChange={(e) => publishPost(row?._id, e.target.value)}
                      >
                        <option value={row?.status}>{row?.status}</option>
                        <option
                          value="pending"
                          className="form-control"
                          style={{
                            display:
                              row?.status === "pending" ? "none" : "block",
                          }}
                        >
                          Pending
                        </option>
                        <option
                          value="publish"
                          className="form-control"
                          style={{
                            display:
                              row?.status === "publish" ? "none" : "block",
                          }}
                        >
                          Publish
                        </option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PostApprove;
