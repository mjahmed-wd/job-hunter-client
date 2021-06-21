import axios from "axios";
import React, { useEffect, useState , useContext} from "react";
import Select from "react-select";
import { DataGrid } from "@material-ui/data-grid";
import CustomPaginationActionsTable from "./CustomPaginationActionsTable";
import { AuthContext } from "../../ProvideAuth/ProvideAuth";

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
];

const JobPostShowcase = () => {
  const [allJobData, setAllJobData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`https://job-hunter-bd.herokuapp.com/getAllJob`)
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
     <div style={{zIndex:99999}}>
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
     </div>
      {currentUser&&
          <button onClick={()=>{
            const temp = [...allJobData];
            const difference= temp.filter(x=>!jobData.includes(x))
            console.log(difference)
            setJobData(difference)
       }} className="btn btn-primary mb-3">
          Filtered Out Data
       </button>
      }
{/* 
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
        ))} */}

        <CustomPaginationActionsTable rows={rows}/>
    </div>
  );
};

export default JobPostShowcase;
