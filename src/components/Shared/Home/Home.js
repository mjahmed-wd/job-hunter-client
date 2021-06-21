import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import JobPostShowcase from "./JobPostShowcase/JobPostShowcase";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container mt-2">
        <JobPostShowcase />
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
