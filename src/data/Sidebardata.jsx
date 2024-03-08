import { BiImageAdd } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";
import { TiUserAddOutline } from "react-icons/ti";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { FcAbout } from "react-icons/fc";


const menu = [
  {
    title: "Dashboard",
    icon: <MdSpaceDashboard />,
    path: "/dashboard",
  },
  {
    title: "Home",
    icon: <IoMdHome />,
    path: "/",
  },
  {
    title: "Services",
    icon: <MdOutlineSupportAgent />,
    path: "/services",
  },
  {
    title: "Profile",
    icon: <FaUser />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Packages",
    icon: <BiImageAdd />,
    path: "/packages",
  },
  {
    title: "About Us",
    icon: <FcAbout />,
    path: "/about",
  },
  {
    title: "Contact Us",
    icon: <IoIosContact />,
    path: "/contactus",
  },
  {
    title: "Login",
    icon: <BiLogIn />,
    path: "/login",
  },
  {
    title: "Register",
    icon: <TiUserAddOutline />,
    path: "/register",
  },
];

export default menu;
