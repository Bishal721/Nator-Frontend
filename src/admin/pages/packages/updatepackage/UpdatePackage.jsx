import React, { useEffect, useState } from "react";
import Card from "../../../../components/card/Card";
import {
  getPackage,
  getPackages,
  selectIsLoading,
  selectPackage,
  updatePackage,
} from "../../../../redux/features/packages/packageSlice";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdatePackage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPackage(id));
  }, [dispatch, id]);

  const packageEdit = useSelector(selectPackage);

  const [packages, setPackages] = useState(packageEdit);
  const [productImage, setProductImage] = useState("");
  const [select, setSelect] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const isLoading = useSelector(selectIsLoading);

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

  useEffect(() => {
    setPackages(packageEdit);
    setImagePreview(
      packageEdit && packageEdit.image ? `${packageEdit.image.filePath}` : null
    );
    setDescription(
      packageEdit && packageEdit.description ? packageEdit.description : ""
    );
    setSelect(
      packageEdit && packageEdit.difficulty ? packageEdit.difficulty : ""
    );
  }, [packageEdit]);
  // const { name, duration, price, location, maxGroupSize } = packages;

  const saveProduct = async (e) => {
    e.preventDefault();
    if (
      !packages?.name ||
      !packages?.duration ||
      !packages?.price ||
      !packages?.location ||
      !packages?.maxGroupSize ||
      !description
    ) {
      return toast.info("Please Fill all required Fields");
    }

    if (!select) {
      return toast.info("Please select Package difficulty");
    }
    const formData = new FormData();
    formData.append("name", packages?.name);
    formData.append("duration", packages?.duration);
    formData.append("difficulty", select);
    formData.append("price", packages?.price);
    formData.append("location", packages?.location);
    formData.append("maxGroupSize", packages?.maxGroupSize);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }
    console.log(...formData);
    // const formData = {
    //   name: packages?.name,
    //   duration: packages?.duration,
    //   difficulty: select,
    //   price: packages?.price,
    //   location: packages?.location,
    //   maxGroupSize: packages?.maxGroupSize,
    //   description,
    // };

    // if (productImage) {
    //   formData.image = productImage;
    // }

    const data = await dispatch(updatePackage({ id, formData }));
    console.log(data.meta.requestStatus);
    if (data.meta.requestStatus === "fulfilled") {
      await dispatch(getPackages());
      navigate("/admin/dashboard");
    }
  };

  return (
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
                  <label className="block">Package Duration :</label>
                  <input
                    required
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
                    placeholder="Package duration"
                    name="duration"
                    value={packages?.duration}
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
                <div className="col-span-2">
                  <label className="block">Package Description :</label>
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    modules={UpdatePackage.modules}
                    formats={UpdatePackage.formats}
                  />
                </div>
              </div>
              <div className="my-4">
                <button
                  type="submit"
                  className="font-normal px-4 py-2 border rounded-md cursor-pointer transition duration-300 bg-orange-500 text-white"
                >
                  Update Package
                </button>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
UpdatePackage.modules = {
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
UpdatePackage.formats = [
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

export default UpdatePackage;
