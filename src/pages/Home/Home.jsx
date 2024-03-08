import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { RiProductHuntLine } from "react-icons/ri";
import heroImg from "../../assets/hero.jpg";
import { CiSearch } from "react-icons/ci";
import Card from "../../components/card/Card";

const Home = () => {
  const Pics = [
    {
      name: "Picture",
      id: "1",
    },
    {
      name: "Picture1",
      id: "2",
    },
    {
      name: "Picture2",
      id: "3",
    },
  ];
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
        <form className="rounded-lg p-2 shadow-2xl mx-auto w-full">
          <div className="flex">
            <input
              type="text"
              className="w-[60%] bg-gray-100 rounded-tl-lg border-2 border-gray-200 caret-blue-400 focus:border-blue-400  rounded-bl-lg pl-2 text-gray-600 font-normal outline-0"
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
              inputClassName="w-full h-full px-3 text-gray-500 outline-0  bg-gray-100 border-x-2 border-x-gray-400  caret-blue-400 focus:border-blue-400 border-2 border-gray-200 "
              containerClassName="relative"
              toggleClassName="absolute  text-blue-500 rounded-r-lg text-blue-400 right-0 h-full px-3 focus:outline-none "
              startFrom={new Date()}
              displayFormat={"DD/MM/YYYY"}
              minDate={new Date()}
              showFooter={true}
            />
            <button
              type="submit"
              className="bg-[#00D6AF] w-[18%] flex items-centere justify-center p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-[#4CBAA8] "
            >
              <CiSearch size={25} />
              &nbsp; Search
            </button>
          </div>
        </form>
      </div>

      <section className=" w-[95%] mx-auto">
        <div className="relative text-white">
          <div className="absolute inset-0 w-full h-full rounded-[50px] bg-black/50 z-0" />
          <img
            src={heroImg}
            className="object-cover max-h-screen rounded-2xl w-full"
            alt="Hero Image"
          />
          <div className="absolute  inset-10 mt-32 ">
            <h1 className="text-4xl font-bold  ">Adventure Begins Here</h1>
            <h3 className="text-2xl font-semibold mt-10 ">
              Find the world’s largest collection of tours & travels packages
            </h3>
          </div>
          <div className="absolute inset-y-12 space-x-56 pl-8  flex items-center  ">
            {Pics.map((pic) => (
              <Card key={pic.id}>
                <div className="w-20 border-4 ">{pic.name}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
