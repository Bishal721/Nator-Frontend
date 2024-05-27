import { Link, useLocation } from "react-router-dom";
import DOMPurify from "dompurify";

const SearchItem = ({ item }) => {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const location = useLocation();
  return (
    <div className="border-[1px] border-[solid] border-[lightgray] p-[10px] rounded-[5px] flex justify-between gap-[20px] mb-[20px]">
      <img
        src={item?.photos?.filePath}
        alt={item?.photos?.fileName}
        className="w-[200px] h-[200px] object-cover"
      />
      <div className="flex flex-col gap-[10px] flex-[2]">
        <h1 className="text-2xl font-semibold text-orange-400 capitalize ">
          {item.name}
        </h1>
        <span className="text-[12px]">{item.distance}m from center</span>
        <span className="text-[12px] bg-[#008009] text-[white] w-max p-[3px] rounded-[5px]">
          Free airport taxi
        </span>
        <span className="text-[12px] font-bold">
          Studio Apartment with Air conditioning
        </span>
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(shortenText(item.desc, 250)),
          }}
          className="text-[12px]  text-clip"
        ></span>
        <span className="text-[12px] text-[#008009] font-bold">
          Free cancellation
        </span>
        <span className="text-[12px] text-[#008009]">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="flex-[1] flex flex-col justify-between">
        {item.rating && (
          <div className="flex justify-between">
            <span className="font-medium">Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="text-right flex flex-col gap-[5px]">
          <span className="text-[24px]">${item.cheapestPrice}</span>
          <span className="text-[12px] text-[gray]">
            Includes taxes and fees
          </span>
          <Link
            to={{
              pathname: `/hotel-detail/${item._id}`,
              state: location.state,
            }}
          >
            <button className="bg-orange-400 hover:bg-orange-300 text-[white] font-bold px-[5px] py-[10px] border-[none] cursor-pointer rounded-[5px]">
              See availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
