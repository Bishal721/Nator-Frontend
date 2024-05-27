import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
// import { RiProductHuntLine } from "react-icons/ri";
import heroImg from "../../assets/heroimage.png";
import { CiSearch } from "react-icons/ci";
import CarouselItem from "../../components/carousel/CarouselItem";
import PackageCarousel from "../../components/carousel/PackageCarousel";
import { useDispatch, useSelector } from "react-redux";
import { getFivePackages } from "../../redux/features/packages/packageSlice";
import { NewHomeSearch } from "../../redux/features/hotels/SearchSlice";
import { useNavigate } from "react-router-dom";
import { setLocation } from "../../redux/features/bookingdata/bookingdataSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { packages, isLoading, isError, message } = useSelector(
    (state) => state.package
  );
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const [destination, setDestination] = useState("");

  const handleSubmit = async (e) => {
    const formData = {
      location: destination,
    };
    e.preventDefault();
    const data = await dispatch(setLocation(formData));
    if (data.meta.requestStatus === "fulfilled") {
      navigate("/packages");
    }
  };
  const styles = {
    backgroundImage: `url(${heroImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
  useEffect(() => {
    dispatch(getFivePackages());
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, message]);

  const packagess = packages.map((item) => (
    <div
      key={item._id}
      className="border border-gray-400 h-[31rem] rounded-lg mx-4"
    >
      <CarouselItem
        name={shortenText(item?.name, 20)}
        url={item.image?.filePath}
        price={item?.price}
        id={item._id}
      />
    </div>
  ));


  return (
    <>
      <section className="h-screen" style={styles}>
        <div className="h-full w-full flex flex-col justify-center px-[4rem] ">
          <h3 className="text-white font-bold text-7xl">Good Trips </h3>
          <h3 className="text-white text-7xl font-bold ">Only.</h3>

          {/* <button className="w-[10rem] py-[6px] rounded-3xl bg-[#98EC65] hover:bg-[#81E047] mt-[1rem]">
          Explore Now
        </button> */}

          <form className="sm:flex-row flex-col" onSubmit={handleSubmit}>
            <div className="flex h-16 p-2 shadow-2xl border-none bg-none w-2/3 mt-6 sm:flex-nowrap flex-wrap ">
              <input
                type="text"
                className="w-full sm:w-[55%] bg-white rounded border-2 border-gray-200 hover:bg-gray-100 caret-orange-400 focus:border-orange-400  pl-2  text-gray-600 font-normal outline-0 sm:mr-2 mr-0"
                placeholder="Search for your destination..."
                onChange={(e) => setDestination(e.target.value)}
                required
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
      </section>
      <div className="my-14 flex items-center justify-center w-full">
        <div className="text-3xl">
          <h2 className="font-semibold mb-3 ml-8">
            Small group travel that's good all over.
          </h2>
          <p className="text-sm text-gray-500">
            GOOD VIEWS, GOOD FRIENDS AND GOOD TIMES ON OVER 1000 TRIPS IN MORE
            THAN 100 COUNTRIES
          </p>
        </div>
      </div>
      <div className="m-auto w-full px-8 mb-8">
        <div className="my-3">
          <PackageCarousel packages={packagess} />
        </div>
      </div>
    </>
  );
};

export default Home;
