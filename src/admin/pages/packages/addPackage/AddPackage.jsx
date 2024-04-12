import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import ProductForm from "../../../components/productform/ProductForm";
import Loader from "../../../../components/loader/Loader";
import {
  createPackage,
  selectIsLoading,
} from "../../../../redux/features/packages/packageSlice";
const initialState = {
  name: "",
  duration: "",
  location: "",
  price: "",
  difficulty: "",
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
  const { name, duration, price, location, maxGroupSize } =
    packages;

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

  // const generateSKU = (category) => {
  //   const letter = category.slice(0, 3).toUpperCase();
  //   const number = Date.now();
  //   const Sku = letter + "-" + number;
  //   return Sku;
  // };

  const saveProduct = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !duration ||
      !price ||
      !location ||
      !maxGroupSize ||
      !description
    ) {
      return toast.info("Please Fill all required Fields");
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
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }
    // formData.append("image", productImage);
   
    console.log(...formData);

    // console.log(formData);
    const data = await dispatch(createPackage(formData));
    if (data.meta.requestStatus === "fulfilled") {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="mt-4 text-3xl">Add New Package</h3>
      <ProductForm
        packages={packages}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        HandleInputChange={HandleInputChange}
        HandleImageChange={HandleImageChange}
        select={select}
        HandleDropDown={HandleDropDown}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddPackage;
