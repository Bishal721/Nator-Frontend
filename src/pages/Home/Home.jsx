import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
// import { RiProductHuntLine } from "react-icons/ri";
import heroImg from "../../assets/hero.jpg";
import { CiSearch } from "react-icons/ci";
import CarouselItem from "../../components/carousel/CarouselItem";
import PackageCarousel from "../../components/carousel/PackageCarousel";
const Home = () => {
  const Pics = [
    {
      name: "Picture",
      image:
        "https://course.zinotrustacademy.com/wp-content/uploads/2023/09/Udemy-Course-Image-5.png",
      id: "1",
    },
    {
      name: "Picture1",
      image:
        "https://course.zinotrustacademy.com/wp-content/uploads/2023/09/Udemy-Course-Image-5.png",
      id: "2",
    },
    {
      name: "Picture2",
      image:
        "https://course.zinotrustacademy.com/wp-content/uploads/2023/09/Udemy-Course-Image-5.png",
      id: "3",
    },
    {
      name: "Picture3",
      image:
        "https://course.zinotrustacademy.com/wp-content/uploads/2023/09/Udemy-Course-Image-5.png",
      id: "4",
    },
    {
      name: "Picture4",
      image:
        "https://course.zinotrustacademy.com/wp-content/uploads/2023/09/Udemy-Course-Image-5.png",
      id: "4",
    },
    {
      name: "Picture5",
      image:
        "https://course.zinotrustacademy.com/wp-content/uploads/2023/09/Udemy-Course-Image-5.png",
      id: "5",
    },
  ];
  const packagess = Pics.map((item) => (
    <div key={item.id}>
      <CarouselItem name={item.name} url={item.image} id={item.id} />
    </div>
  ));

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <section className="flex flex-col min-h-screen  my-3 ">
      <div className="flex mb-2 p-2">
        <form className="rounded-3xl shadow-2xl mx-auto w-full  ">
          <div className="flex h-16 bg-white p-2 shadow-2xl rounded-full">
            <input
              type="text"
              className="w-[60%] bg-white rounded-tl-full border-2 border-gray-200 hover:bg-gray-100 caret-blue-400 focus:border-blue-400  rounded-bl-full pl-2  text-gray-600 font-normal outline-0"
              placeholder="Search for your destination..."
              required
            />
            <Datepicker
              value={value}
              onChange={handleValueChange}
              primaryColor={"orange"}
              useRange={false}
              placeholder={"Start Date to End Date"}
              separator={"to"}
              inputClassName="w-full h-full px-3 text-gray-500 outline-0 hover:bg-gray-100  bg-white border-x-2 border-x-gray-400  caret-blue-400 focus:border-blue-400 border-2 border-gray-200 "
              containerClassName="relative"
              toggleClassName="absolute  text-blue-500 rounded-r-lg text-blue-400 right-0 h-full px-3 focus:outline-none "
              startFrom={new Date()}
              displayFormat={"DD/MM/YYYY"}
              minDate={new Date()}
              showFooter={true}
            />
            <button
              type="submit"
              className="bg-[#00D6AF] w-[15%] ml-3 flex items-centere justify-center items-center p-2 rounded-full h-12 mt-1 text-white font-semibold hover:bg-[#4CBAA8] "
            >
              <CiSearch size={25} />
              &nbsp; Search
            </button>
          </div>
        </form>
      </div>

      <section className=" w-[95%] mx-auto">
        <div className="relative text-white">
          <div className="absolute inset-0 w-full h-full rounded-[50px] bg-black/60 z-0" />
          <img
            src={heroImg}
            className="object-cover max-h-[23rem] rounded-2xl w-full"
            alt="Hero Image"
          />
          <div className="absolute  inset-12  ">
            <h1 className="text-4xl font-bold mt-10 ">Adventure Begins Here</h1>
            <h3 className="text-2xl font-semibold mt-9 ">
              Find the world’s largest collection of tours & travels packages
            </h3>
          </div>
        </div>
        <div className="w-full m-auto rounded ">
          <div className="mt-6">
            <PackageCarousel packages={packagess} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
