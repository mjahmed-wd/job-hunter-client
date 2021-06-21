import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "Serial No", width: 70, sortable: false },
  { field: "jobTitle", headerName: "Job Title", width: 250, sortable: false },
  {
    field: "jobHoursPerMonth",
    headerName: "Work Hours Per Month",
    width: 250,
    type: "number",
  },
  {
    field: "employerName",
    headerName: "Employer Name",
    width: 200,
    sortable: false,
  },
  {
    field: "companyName",
    headerName: "CompanyName",
    width: 250,
  },
  {
    field: "jobTag",
    headerName: "Job Category",
    width: 250,
  },
  //   {
  //     field: "jobTag",
  //     headerName: "Job Tag",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: true,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.getValue("firstName") || ""} ${
  //         params.getValue("lastName") || ""
  //       }`,
  //   },
];

const JobPostShowcase = () => {
  const [allJobData, setAllJobData] = useState([]);
  const [jobData, setJobData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getAllJob`)
      .then((res) => {
        setAllJobData(res.data);
        setJobData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const jobTagOptions = [
    { value: 1, label: "All" },
    { value: 2, label: "Govt. Job" },
    { value: 3, label: "Non Govt. Job" },
    { value: 4, label: "Bank Job" },
  ];

  const rows = jobData?.map((item, index) => ({
    ...item,
    id: index + 1,
    jobTitle: item.jobTitle,
    jobHoursPerMonth: item.jobHoursPerMonth,
    employerName: item.employerName,
    companyName: item.companyName,
    jobTag: item.jobTag.label,
  }));

  return (
    <div>
      <label htmlFor="jobTag">Filter</label>
      <Select
        options={jobTagOptions}
        name="jobTag"
        onChange={(v) => {
          //   setFieldValue("jobTag", v);
          const temp = [...allJobData];
          if (v.label !== "All") {
            const filtered = temp.filter(
              (item) => v.label === item?.jobTag?.label
            );
            setJobData(filtered);
          } else {
            setJobData(temp);
          }
        }}
      />

      <div style={{ height: 400, width: "100%" }} className="text-center">
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </div>

      {jobData?.length > 0 &&
        jobData?.map((post, index) => (
          <div key={index}>
            <h3>{post?.jobTitle}</h3>
            <p>{post?.jobHoursPerMonth} hours job per month</p>
            <p>{post?.employerName}</p>
            <p>{post?.companyName}</p>
            <p>Job Tag: {post?.jobTag?.label}</p>
          </div>
        ))}
    </div>
  );
};

export default JobPostShowcase;
