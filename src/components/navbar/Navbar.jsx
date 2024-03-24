import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import {
  ShowOnLogOut,
  ShowOnLogin,
} from "../../components/protect/HiddenLinks";
const Navbar = () => {
  const Links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Packages",
      link: "/packages",
    },
    {
      name: "About us",
      link: "/about",
    },
    {
      name: "Contact us",
      link: "/contact",
    },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div>
      <div className="w-full bg-white">
        <nav className="md:container flex justify-between items-center w-full  text-gray-700 py-4 mx-auto">
          <div>
            <Link
              className="text-4xl text-blue-500 cursor-pointer font-bold font-heading"
              to="/"
            >
              {/* <img className="h-9" src="logo.png" alt="logo" /> */}
              Natour
            </Link>
          </div>
          <div
            className={`md:static absolute  text-base bg-white  font-medium md:min-h-fit min-h-[50vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5 ease-in ${open ? "top-[8%] " : "top-[-100%] "} z-50`}
          >
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
              {Links.map((link, index) => (
                <li key={index}>
                  <Link className="hover:text-blue-500 " to={link.link}>
                    {link.name}
                  </Link>
                </li>
              ))}
              <ShowOnLogOut>
                <li>
                  <Link to="/register" className="hover:text-blue-500 ">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-blue-500 ">
                    Login
                  </Link>
                </li>
              </ShowOnLogOut>

              <ShowOnLogin>
                <li>
                  <Link to="/profile" className="hover:text-blue-500">
                    Profile
                  </Link>
                </li>
              </ShowOnLogin>
            </ul>
          </div>
          <div onClick={() => setOpen(!open)} className="mr-12 md:hidden">
            {open ? <RiCloseFill size={28} /> : <FaBars size={28} />}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
