import Navbar from "../../components/navbar/Navbar";
import Footer from "../footer/Footer";
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="md:min-w-[100px] min-h-[80vh] my-0 mx-auto md:container  ">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
