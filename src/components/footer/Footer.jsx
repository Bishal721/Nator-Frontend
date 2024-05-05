import { Link } from "react-router-dom";
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
      <footer className="p-4 bg-neutral-200 sm:p-6 ">
        <div className="mx-auto max-w-screen-xl">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link to={"/"} className="flex items-center">
                <span className="self-center text-3xl font-semibold whitespace-nowrap ">
                  Natours
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                  Follow us
                </h2>
                <ul className="text-gray-600 400">
                  <li className="mb-4">
                    <Link className="hover:underline ">Github</Link>
                  </li>
                  <li>
                    <Link className="hover:underline">Discord</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                  Support
                </h2>
                <ul className="text-gray-600 400">
                  <li className="mb-4">
                    <Link className="hover:underline ">Contact us</Link>
                  </li>
                  <li>
                    <Link className="hover:underline">Help Center</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                  Legal
                </h2>
                <ul className="text-gray-600 400">
                  <li className="mb-4">
                    <Link className="hover:underline">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link className="hover:underline">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto y-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center 400">
              © {new Date().getFullYear()} Natours™ . All Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
              {SocialLink.map((link, index) => (
                <Link
                  to={link.link}
                  key={index}
                  className="text-gray-500 hover:text-gray-900 -white"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
