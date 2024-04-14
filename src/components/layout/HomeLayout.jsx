import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const HomeLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="md:min-w-[100px] min-h-[80vh] my-0 mx-auto  ">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default HomeLayout;
