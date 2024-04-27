import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Card from "../../../components/card/Card";
import Select from "react-select";
import { getAllRooms } from "../../../redux/features/rooms/roomSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createHotel } from "../../../redux/features/hotels/hotelSlice";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  cheapestPrice: "",
  city: "",
  address: "",
  distance: "",
};
const AddHotel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rooms, isError, isLoading, message } = useSelector(
    (state) => state.room
  );
  useEffect(() => {
    dispatch(getAllRooms());
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, message]);

  const options = rooms.map((room) => ({
    value: room._id,
    label: room.title,
  }));
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hotel, setHotel] = useState(initialState);
  const [hotelImage, setHotelImage] = useState("");
  const [select, setSelect] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [desc, setDesc] = useState("");

  const { name, cheapestPrice, address, distance, city } = hotel;
  const HandleSelectOption = (selectedoption) => {
    setSelectedOptions(selectedoption);
  };
  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };
  const HandleDropDown = (e) => {
    setSelect(e.target.value);
  };
  const HandleImageChange = (e) => {
    setHotelImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (content, delta, source, editor) => {
    setDesc(content);
  };
  const isEmptyContent = (content) => {
    // Remove HTML tags and whitespace
    const strippedContent = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
    return strippedContent.length === 0;
  };
  const saveHotel = async (e) => {
    e.preventDefault();
    if (
      !hotel.name ||
      !hotel.cheapestPrice ||
      !hotel.address ||
      !hotel.distance ||
      !hotel.city ||
      !select ||
      selectedOptions.length === 0 ||
      isEmptyContent(desc)
    ) {
      return toast.info("Please Fill all required Fields");
    }

    if (hotel.cheapestPrice < 0) {
      return toast.info("Price cannot be less than 0");
    }

    const roomnumbers = selectedOptions.map((options) => options.value);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("cheapestPrice", cheapestPrice);
    formData.append("address", address);
    formData.append("distance", distance);
    formData.append("city", city);
    formData.append("featured", select);
    formData.append("desc", desc);
    formData.append("rooms", roomnumbers);
    if (hotelImage) {
      formData.append("photos", hotelImage);
    }
    console.log(...formData);

    const data = await dispatch(createHotel(formData));
    console.log(data);
    if (data.meta.requestStatus === "fulfilled") {
      navigate("/admin/dashboard");
    }
  };
  return (
    <div className="overflow-x-auto">
      <Card>
        <form onSubmit={saveHotel} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <div className="mt-2">
                <div className="drop-shadow-2xl bg-white text-black border border-solid p-4 border-transparent rounded-lg overflow-hidden">
                  <label className="text-2xl block">Hotel Image</label>
                  <br />
                  <code className="text-gray-600 block">
                    Supported Formats: jpg, jpeg, png
                  </code>
                  <input
                    type="file"
                    className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                    name="photos"
                    onChange={(e) => HandleImageChange(e)}
                  />
                  {imagePreview !== null ? (
                    <div className="w-full max-h-[280px] mt-4 bg-gray-300 text-white p-4 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        className="w-full h-full object-cover"
                        alt="Package Pics"
                      />
                    </div>
                  ) : (
                    <p className="mt-4 text-lg">
                      No Image set for this Package
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block">Hotel Name :</label>
                  <input
                    required
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
                    placeholder="Hotel Name"
                    name="name"
                    value={name}
                    onChange={HandleInputChange}
                  />
                </div>
                <div>
                  <label className="block">Hotel Price :</label>
                  <input
                    required
                    type="number"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
                    placeholder="Hotel Price"
                    name="cheapestPrice"
                    value={cheapestPrice}
                    onChange={HandleInputChange}
                  />
                </div>
                <div>
                  <label className="block"> Featured Hotel : </label>
                  <select
                    className="w-full border border-gray-300 rounded-md py-2 px-3 bg-white focus:outline-none focus:border-orange-500"
                    name="featured"
                    value={select}
                    onChange={HandleDropDown}
                  >
                    <option value="" className="bg-white">
                      --Select --
                    </option>
                    <option value="true" className="bg-white">
                      Yes
                    </option>
                    <option value="false" className="bg-white">
                      No
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block">Hotel Address :</label>
                  <input
                    required
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
                    placeholder="Enter Address"
                    name="address"
                    value={address}
                    onChange={HandleInputChange}
                  />
                </div>
                <div>
                  <label className="block">Hotel distance :</label>
                  <input
                    required
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
                    placeholder="Enter maxGroupSize"
                    name="distance"
                    value={distance}
                    onChange={HandleInputChange}
                  />
                </div>
                <div>
                  <label className="block">Hotel City :</label>
                  <input
                    required
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
                    placeholder="Enter Location"
                    name="city"
                    value={city}
                    onChange={HandleInputChange}
                  />
                </div>
                <div>
                  <label className="block">Hotel Rooms :</label>
                  <Select
                    options={options}
                    value={selectedOptions}
                    name="rooms"
                    onChange={HandleSelectOption}
                    isMulti={true}
                    placeholder="Select Hotel Rooms"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block">Hotel Description :</label>
                  <ReactQuill
                    theme="snow"
                    value={desc}
                    onChange={handleChange}
                    modules={AddHotel.modules}
                    formats={AddHotel.formats}
                  />
                </div>
              </div>
              <div className="my-4">
                <button
                  type="submit"
                  className="font-normal px-4 py-2 border rounded-md cursor-pointer transition duration-300 bg-orange-500 text-white"
                >
                  Add Hotel
                </button>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
AddHotel.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
AddHotel.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];
export default AddHotel;
