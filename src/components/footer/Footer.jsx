import { Link } from "react-router-dom";
// import { FaPhoneAlt } from "react-icons/fa";
import { FaGithub, FaFacebookSquare } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa6";
const Footer = () => {
  const SocialLink = [
    {
      name: "Facebook",
      icon: <FaGithub size={25} />,
      link: "",
    },
    {
      name: "Github",
      icon: <FaFacebookSquare size={25} />,
      link: "",
    },
    {
      name: "Linkedin",
      icon: <FaLinkedin size={25} />,
      link: "",
    },
    {
      name: "Instagram",
      icon: <FiInstagram size={25} />,
      link: "",
    },
  ];
  return (
    <>
      <footer className="container py-6  border-t border-gray-200 font-light flex flex-col lg:flex-row justify-between items-center">
        <p className="text-gray-700 mb-6 lg:mb-0">
          Copyright &copy; Natours {new Date().getFullYear()} All Rights
          Reserved
        </p>

        <ul className="list-unstyled flex">
          <li className="mr-6">
            <Link
              to={"/about"}
              className="text-gray-700 hover:text-gray-900 font-medium block text-sm"
            >
              About Us
            </Link>
          </li>
          <li className="mr-6">
            <Link
              to={"/contact"}
              className="text-gray-700 hover:text-gray-900 font-medium block text-sm"
            >
              Contact Us
            </Link>
          </li>
          {SocialLink.map((link, index) => (
            <Link
              to={link.link}
              key={index}
              className="mr-3 flex h-5 w-5 items-center justify-center rounded-full border border-stroke text-dark hover:border-primary hover:bg-primary hover:text-black dark:border-dark-3 dark:text-gray-400  dark:hover:border-primary sm:mr-4 lg:mr-3 xl:mr-4"
            >
              {link.icon}
            </Link>
          ))}
        </ul>
      </footer>
    </>
  );
};

export default Footer;
