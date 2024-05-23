import React, { Fragment, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import {
  AdminLink,
  ShowOnLogOut,
  ShowOnLogin,
  UserLink,
} from "../../components/protect/HiddenLinks";
import {
  RESET,
  logoutUser,
  selectUser,
} from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
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
      name: "Hotels",
      link: "/hotels",
    },
  ];

  const logout = () => {
    dispatch(logoutUser());
    dispatch(RESET());
    navigate("/login");
  };

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
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                      <div
                        className="h-12 w-12 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                        style={{
                          backgroundImage: `url(${user?.image})`,
                        }}
                      ></div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => navigate("/profile")}
                            className={classNames(
                              active && "bg-gray-100",
                              "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                            )}
                          >
                            My Account
                          </div>
                        )}
                      </Menu.Item>
                      <UserLink>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              onClick={() => navigate("/bookings")}
                              className={classNames(
                                active && "bg-gray-100",
                                "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                              )}
                            >
                              My Bookings
                            </div>
                          )}
                        </Menu.Item>
                      </UserLink>
                      <AdminLink>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={classNames(
                                active && "bg-gray-100",
                                "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                              )}
                              onClick={() => navigate("/admin/dashboard")}
                            >
                              Dashboard
                            </div>
                          )}
                        </Menu.Item>
                      </AdminLink>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active && "bg-gray-100",
                              "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                            )}
                            onClick={logout}
                          >
                            Logout
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
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
