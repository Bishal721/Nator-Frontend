import { FaHotel } from "react-icons/fa";
import {
  HiOutlineViewGrid,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
  HiOutlineUsers,
} from "react-icons/hi";
import { TbBrandBooking, TbPackages } from "react-icons/tb";
export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "dashboard",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "Users",
    label: "Users",
    path: "users",
    icon: <HiOutlineUsers />,
  },
  {
    key: "AddPackage",
    label: "Add Package",
    path: "add-package",
    icon: <TbPackages />,
  },
  {
    key: "AddHotels",
    label: "Add Hotels",
    path: "add-hotels",
    icon: <FaHotel />,
  },
  {
    key: "Bookings",
    label: "Bookings",
    path: "Allbookings",
    icon: <TbBrandBooking />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
