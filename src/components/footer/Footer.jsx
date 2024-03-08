import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
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
      <footer className="relative z-10 bg-blue-500  pt-5 text-white  dark:bg-dark ">
        <div className=" container flex flex-wrap ">
          <div className="w-full px-4 sm:w-2/3 lg:w-3/12">
            <div className="mb-10 w-full">
              <Link
                to="/"
                className="mb-6 inline-block text-3xl font-bold max-w-[160px]"
              >
                Natour
              </Link>
              <p className="mb-7 text-base text-body-color dark:text-dark-6">
                The goal is to provide a seamless and enjoyable travel
                experience for clients, whether it be for business or leisure
                purposes.
              </p>
            </div>
          </div>

          <LinkGroup header="About Us">
            <NavLink link="/#" label="SaaS Development" />
          </LinkGroup>
          <LinkGroup header="Services">
            <NavLink link="/#" label="About Natour" />
          </LinkGroup>
          <LinkGroup header="Contact  Us">
            <NavLink link="/#" label="Premium Support" />
          </LinkGroup>

          <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
            <div className="mb-4 w-full">
              <h4 className="mb-9 text-lg font-semibold text-dark dark:text-white">
                Follow Us On
              </h4>
              <div className="mb-6 flex items-center">
                {SocialLink.map((link, index) => (
                  <Link
                    to={link.link}
                    key={index}
                    className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-white dark:hover:border-primary sm:mr-4 lg:mr-3 xl:mr-4"
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
              <p className="flex items-center text-sm font-medium space-x-4 text-dark dark:text-white">
                <FaPhoneAlt size={20} />
                <span>+977 9840******</span>
              </p>
              <p className="text-base mt-3 text-body-color dark:text-dark-6">
                &copy; All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

const LinkGroup = ({ children, header }) => {
  return (
    <>
      <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
        <div className="mb-10 w-full">
          <h4 className="mb-9 text-lg font-semibold text-dark dark:text-white">
            {header}
          </h4>
          <ul className="space-y-3">{children}</ul>
        </div>
      </div>
    </>
  );
};

const NavLink = ({ link, label }) => {
  return (
    <li>
      <Link
        // to={link}
        className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
      >
        {label}
      </Link>
    </li>
  );
};
