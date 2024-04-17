import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <div className="border-[1px] border-[solid] border-[lightgray] p-[10px] rounded-[5px] flex justify-between gap-[20px] mb-[20px]">
      <img src={item.photos[0]} alt="" className="w-[200px] h-[200px] object-cover" />
      <div className="flex flex-col gap-[10px] flex-[2]">
        <h1 className="text-[20px] text-[#0071c2]">{item.name}</h1>
        <span className="text-[12px]">{item.distance}m from center</span>
        <span className="text-[12px] bg-[#008009] text-[white] w-max p-[3px] rounded-[5px]">Free airport taxi</span>
        <span className="text-[12px] font-bold">
          Studio Apartment with Air conditioning
        </span>
        <span className="text-[12px]">{item.desc}</span>
        <span className="text-[12px] text-[#008009] font-bold">Free cancellation </span>
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
          <span className="text-[12px] text-[gray]">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="bg-[#0071c2] text-[white] font-bold px-[5px] py-[10px] border-[none] cursor-pointer rounded-[5px]">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
