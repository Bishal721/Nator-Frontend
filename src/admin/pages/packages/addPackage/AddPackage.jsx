import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";
// import ProductForm from "../../../components/productform/ProductForm";
import Loader from "../../../../components/loader/Loader";
import {
  createPackage,
  selectIsLoading,
} from "../../../../redux/features/packages/packageSlice";
import Card from "../../../../components/card/Card";
const initialState = {
  name: "",
  duration: "",
  location: "",
  price: "",
  difficulty: "",
};

export const calculateDays = ({ startDate, endDate }) => {
  // Convert start and end dates to JavaScript Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the total duration in milliseconds between the start and end dates
  const totalDurationMillis = end.getTime() - start.getTime();
  const DAY_DURATION_MILLIS = 24 * 60 * 60 * 1000;
  const days = Math.ceil(totalDurationMillis / DAY_DURATION_MILLIS);

  return days;
};

const AddPackage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [packages, setPackages] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [select, setSelect] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const isLoading = useSelector(selectIsLoading);
  const { name, duration, price, location, maxGroupSize, minGroupSize } =
    packages;


  const [recurringDates, setRecurringDates] = useState([]);
  const addDatePicker = () => {
    const newDatePickers = [...recurringDates];
    newDatePickers.push({
      startDate: null,
      endDate: null,
    });
    setRecurringDates(newDatePickers);
  };
  const removeDatePicker = (index) => {
    const newDatePickers = [...recurringDates];
    newDatePickers.splice(index, 1);
    setRecurringDates(newDatePickers);
  };
  const handleValueChange = (index, newValue, duration) => {
    if (!duration) {
      return toast.info("Please fill the duration field");
    }
    const startDate = new Date(newValue.startDate);

    // Calculate the end date
    const endDate = new Date(
      startDate.getTime() + duration * 24 * 60 * 60 * 1000
    );

    // Convert endDate to a string in the same format as startDate
    const endDateString = endDate.toISOString().split("T")[0];

    console.log(endDateString); // This will give you the e
    const updatedValue = { ...newValue, endDate: endDateString };
    const newDatePickers = [...recurringDates];
    newDatePickers[index] = updatedValue;
    setRecurringDates(newDatePickers);
  };

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setPackages({ ...packages, [name]: value });
  };
  const HandleDropDown = (e) => {
    setSelect(e.target.value);
  };
  const HandleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const isEmptyContent = (content) => {
    const strippedContent = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
    return strippedContent.length === 0;
  };
  const handleChange = (content, delta, source, editor) => {
    setDescription(content);
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !duration ||
      !price ||
      !location ||
      !maxGroupSize ||
      !minGroupSize ||
      !description ||
      !recurringDates || // Check if recurringDates are provided
      recurringDates.length === 0 || // Check if recurringDates array is not empty
      isEmptyContent(description)
    ) {
      return toast.info("Please Fill all required Fields");
    }
    if (minGroupSize > maxGroupSize) {
      return toast.info(
        "Minimum Group Size cannot be greater than maximum Group Size"
      );
    }
    if (!select) {
      return toast.info("Please select Package difficulty");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("difficulty", select);
    formData.append("duration", duration);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("maxGroupSize", maxGroupSize);
    formData.append("minGroupSize", minGroupSize);
    formData.append("description", description);
    formData.append("recurringDates", JSON.stringify(recurringDates));
    if (productImage) {
      formData.append("image", productImage);
    }

    console.log(...formData);

    const data = await dispatch(createPackage(formData));
    if (data.meta.requestStatus === "fulfilled") {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="mt-4 text-3xl">Add New Package</h3>
      <div className="overflow-x-auto">
        <Card>
          <form onSubmit={saveProduct} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="mt-2">
                  <div className="drop-shadow-2xl bg-white text-black border border-solid p-4 border-transparent rounded-lg overflow-hidden">
                    <label className="text-2xl block">Package Image</label>
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
                      name="image"
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
                    <label className="block">Package Name :</label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
                      placeholder="Package Name"
                      name="name"
                      value={packages?.name}
                      onChange={HandleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block">Package Duration in Days:</label>
                    <input
                      required
                      type="number"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
                      placeholder="Package duration "
                      name="duration"
                      value={`${packages?.duration}`}
                      onChange={HandleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block">Package Price :</label>
                    <input
                      required
                      type="number"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
                      placeholder="Package Price"
                      name="price"
                      value={packages?.price}
                      onChange={HandleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block"> Package Difficulty : </label>
                    <select
                      className="w-full border border-gray-300 rounded-md py-2 px-3 bg-white focus:outline-none focus:border-orange-500"
                      name="difficulty"
                      value={select}
                      onChange={HandleDropDown}
                    >
                      <option value="" className="bg-white">
                        --Select Difficulty--
                      </option>
                      <option value="Easy" className="bg-white">
                        Easy
                      </option>
                      <option value="Medium" className="bg-white">
                        Medium
                      </option>
                      <option value="Hard" className="bg-white">
                        Hard
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block">Package Location :</label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
                      placeholder="Enter Location"
                      name="location"
                      value={packages?.location}
                      onChange={HandleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block">Package Min Group Size :</label>
                    <input
                      required
                      type="number"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
                      placeholder="Enter minGroupSize"
                      name="minGroupSize"
                      value={packages?.minGroupSize}
                      onChange={HandleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block">Package Max Group Size :</label>
                    <input
                      required
                      type="number"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
                      placeholder="Enter maxGroupSize"
                      name="maxGroupSize"
                      value={packages?.maxGroupSize}
                      onChange={HandleInputChange}
                    />
                  </div>

                  <div className="col-span-2 text-black">
                    <label className="block">Package Description :</label>
                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={handleChange}
                      modules={AddPackage.modules}
                      formats={AddPackage.formats}
                    />
                  </div>
                  <div className="col-span-2 text-black">
                    <label className="block">
                      Package Start and End dates :
                    </label>
                    {recurringDates.map((dates, index) => (
                      <div key={index} className="grid grid-cols-4 gap-2">
                        <div className="col-span-3">
                          <Datepicker
                            value={dates}
                            onChange={(newValue) =>
                              handleValueChange(index, newValue, duration)
                            }
                            asSingle={true}
                            primaryColor={"orange"}
                            useRange={false}
                            placeholder={"Enter Start Date"}
                            separator={"to"}
                            inputClassName="w-full h-full px-3 border border-gray-400  rounded text-gray-500  bg-white  caret-orange-400 focus:border-orange-400  "
                            containerClassName="relative h-9 w-full mb-3 "
                            toggleClassName="absolute rounded-r-lg text-orange-400 right-0 px-3 focus:outline-none h-full "
                            startFrom={new Date()}
                            displayFormat={"DD/MM/YYYY"}
                            popoverDirection="up"
                            minDate={new Date()}
                            showFooter={true}
                          />
                        </div>
                        <div className="h-full">
                          <button
                            onClick={() => removeDatePicker(index)}
                            className="font-normal px-4  h-9 w-full border rounded-md cursor-pointer transition duration-300 bg-orange-500 text-white"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-1">
                      <button
                        type="button"
                        onClick={addDatePicker}
                        className="font-normal px-4 py-2 border rounded-md cursor-pointer transition duration-300 bg-orange-500 text-white"
                      >
                        Add Date
                      </button>
                    </div>
                  </div>
                </div>
                <div className="my-4">
                  <button
                    type="submit"
                    className="font-normal px-4 py-2 border rounded-md cursor-pointer transition duration-300 bg-orange-500 text-white"
                  >
                    Add Package
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

AddPackage.modules = {
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
AddPackage.formats = [
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

export default AddPackage;
