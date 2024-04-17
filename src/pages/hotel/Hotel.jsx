import React, { useEffect, useState } from "react";
import heroImg from "../../assets/HotelHero.jpg";
import hotelA from "../../assets/HotelA.jpg";
import hotelB from "../../assets/HotelB.jpg";
import Datepicker from "react-tailwindcss-datepicker";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../../redux/features/hotels/hotelSlice";
const Hotel = () => {
  const dispatch = useDispatch();
  const { hotels, isloading, isError, message } = useSelector(
    (state) => state.hotel
  );
  let firstFourElements = [];
  useEffect(() => {
    dispatch(getAllHotels());
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, message]);

  if (hotels.length >= 4 && hotels.length >= 1) {
    firstFourElements = hotels.slice(0, 4);
  }

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const styles = {
    backgroundImage: `url(${heroImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <>
      <section className="h-screen" style={styles}>
        <div className="bg-[#222222] opacity-35 h-full w-full absolute top-[4.75rem] mix-blend-multiply [transition:background_0.3s,_border-radius_0.3s,_opacity_0.3s] z-10"></div>
        <div className="relative  h-full w-full flex flex-col justify-center  items-center px-[4rem] z-30">
          <h3 className="text-white font-bold text-6xl">
            Luxury Hotel And Best Resort
          </h3>
          <h5 className="text-white text-xl mt-3">
            Our Amazing hotel has some of the best rooms on earth. Book Now for
            the best summer deals.
          </h5>
        </div>
      </section>

      <div className="container mb-8">
        <div className=" py-6 h-36  relative z-30 [box-shadow:0px_0px_10px_0px_rgba(0,0,0,0.5)] m-0 -mt-24  bg-slate-50">
          <form className="sm:flex-row flex-col px-4 flex items-center justify-center mt-4">
            <div className="flex h-16 p-2 [box-shadow:rgba(0,_0,_0,_0.19)_0px_10px_20px,_rgba(0,_0,_0,_0.23)_0px_6px_6px]   w-full  sm:flex-nowrap flex-wrap">
              <input
                type="text"
                className="w-full sm:w-[55%] bg-white rounded border-2 border-gray-200 hover:bg-gray-100 caret-orange-400 focus:border-orange-400  pl-2  text-gray-600 font-normal outline-0 sm:mr-2 mr-0"
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
                inputClassName="w-full h-full px-3 rounded text-gray-500 outline-0 hover:bg-gray-100  bg-white border-x-1 border-x-gray-200  caret-orange-400 focus:border-orange-400  "
                containerClassName="relative"
                toggleClassName="absolute rounded-r-lg text-orange-400 right-0 h-full px-3 focus:outline-none "
                startFrom={new Date()}
                displayFormat={"DD/MM/YYYY"}
                minDate={new Date()}
                showFooter={true}
              />
              <button
                type="submit"
                className="bg-orange-400 w-full sm:w-[20%] ml-2 flex items-center justify-center rounded h-auto text-white font-semibold "
              >
                <CiSearch size={25} />
                &nbsp; Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <section className="mx-auto w-full  max-w-7xl my-0 py-0 px-5 mt-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6  w-full my-8 mx-4 p-4">
            <div>
              <img src={hotelA} alt="" className="w-full" />
            </div>

            <div className="text-justify mt-8">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias
                officia voluptatum sunt. Aspernatur ab delectus alias nam quam
                libero asperiores aliquid, eveniet saepe ratione praesentium qui
                adipisci et expedita quibusdam suscipit. Laudantium
                necessitatibus et distinctio asperiores accusamus doloribus
                accusantium, a exercitationem
              </p>
            </div>
            <div className="grid grid-cols-3 mt-4 text-white font-semibold">
              <button className="w-full h-12 bg-orange-400 hover:bg-orange-300">
                View More
              </button>
            </div>
          </div>
          <div className="col-span-6 my-8 mx-4 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-5xl font-bold mb-8 ">
                Experience the Life of Mykonos City
              </h2>
              <p className="text-justify text-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae sapiente nobis dolorum dolore rerum voluptatibus nam
                maiores mollitia cumque error veniam tenetur consectetur dolorem
                libero, atque hic ipsum exercitationem labore assumenda repellat
                ullam et sint facilis perspiciatis. Debitis, molestiae aperiam.
              </p>
            </div>
            <div className="mt-8">
              <img src={hotelB} alt="" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 w-full max-w-7xl my-0 py-0 px-5 mx-auto">
        <h3 className="text-5xl font-bold capitalize ">Popular Hotels</h3>
        <div className="flex justify-between items-center my-8">
          <p className="text-justify w-1/2 mt-4 text-md">
            During the course of time, developers do not need that, but in the
            development of the clinical phase, the airline always needs fear.
          </p>
          <div className="text-white font-semibold mr-9">
            <Link to={"/hotel-list"}>
              <button className="w-44 h-12 bg-orange-400 hover:bg-orange-300">
                View All
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full mb-4">
          <div className="grid grid-cols-12 gap-4">
            {hotels.length >= 4 && hotels.length >= 1
              ? firstFourElements.map((item) => (
                  <div
                    key={item._id}
                    className="col-span-3 w-[95%] h-[26rem] border border-gray-400 p-4"
                  >
                    <div className="w-full object-cover overflow-hidden h-64">
                      <img
                        src={item.photos[0] || hotelA}
                        alt="Hotel"
                        className="w-full object-cover overflow-hidden"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">{item?.title}</h3>
                      <p className="mt-4 truncate">{item?.desc}</p>
                    </div>

                    <div className="grid grid-cols-2 my-4 text-white font-semibold hover:bg-orange-300">
                      <Link to={`/hotel-details/${item._id}`}>
                        <button className="capitalize bg-orange-400 h-11 w-full ">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              : hotels.map((item) => (
                  <div
                    key={item._id}
                    className="col-span-3 w-[95%] h-[26rem] border border-gray-400 p-4"
                  >
                    <div className="w-full object-cover overflow-hidden h-64">
                      <img
                        src={item.photos[0] || hotelA}
                        alt="Hotel"
                        className="w-full object-cover overflow-hidden"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">{item?.title}</h3>
                      <p className="mt-4 truncate">{item?.desc}</p>
                    </div>

                    <div className="grid grid-cols-2 my-4 text-white font-semibold hover:bg-orange-300">
                      <Link to={`/hotel-details/${item._id}`}>
                        <button className="capitalize bg-orange-400 h-11 w-full ">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hotel;
