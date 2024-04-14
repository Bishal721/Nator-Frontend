import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import {
  AdminLink,
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
      name: "Flights",
      link: "/flights",
    },
    {
      name: "Hotels",
      link: "/hotels",
    },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="md:sticky md:top-0 z-50 border-b-2 border-b-gray-300 ">
      <div className="w-full bg-white">
        <nav className="md:container flex justify-between items-center w-full  text-gray-700 py-4 mx-auto">
          <div>
            <Link
              className="text-4xl text-orange-400 cursor-pointer font-bold font-heading"
              to="/"
            >
              {/* <img className="h-9" src="logo.png" alt="logo" /> */}
              Natour
            </Link>
          </div>
          <div
            className={`md:static absolute  text-base bg-white  font-medium md:min-h-fit min-h-[50vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5 ease-in ${open ? "top-[8%] " : "top-[-100%] "} z-50`}
          >
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-4 ">
              {Links.map((link, index) => (
                <li key={index}>
                  <NavLink to={link.link}>{link.name}</NavLink>
                </li>
              ))}
              <ShowOnLogOut>
                <li className="ml-4">
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <Link
                    to="/register"
                    className=" bg-orange-400 p-2 rounded-full text-white "
                  >
                    <button className="w-24">Register</button>
                  </Link>
                </li>
              </ShowOnLogOut>

              <ShowOnLogin>
                <li>
                  <NavLink to="/profile" className="hover:text-blue-500">
                    Profile
                  </NavLink>
                </li>
              </ShowOnLogin>
              <AdminLink>
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    className=" bg-orange-400 p-2 rounded-full text-white "
                  >
                    <button className="w-24">Dashborad</button>
                  </NavLink>
                </li>
              </AdminLink>
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
