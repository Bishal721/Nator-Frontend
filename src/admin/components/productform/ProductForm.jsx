// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import Card from "../../../components/card/Card";
// import Datepicker from "react-tailwindcss-datepicker";
// // import { useState } from "react";
// const ProductForm = ({
//   packages,
//   productImage,
//   imagePreview,
//   description,
//   setDescription,
//   HandleInputChange,
//   HandleImageChange,
//   select,
//   HandleDropDown,
//   saveProduct,
//   handleValueChange,
//   dates,
// }) => {
//   return (
//     <div className="overflow-x-auto">
//       <Card>
//         <form onSubmit={saveProduct} className="p-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div className="md:col-span-1">
//               <div className="mt-2">
//                 <div className="drop-shadow-2xl bg-white text-black border border-solid p-4 border-transparent rounded-lg overflow-hidden">
//                   <label className="text-2xl block">Package Image</label>
//                   <br />
//                   <code className="text-gray-600 block">
//                     Supported Formats: jpg, jpeg, png
//                   </code>
//                   <input
//                     type="file"
//                     className="block w-full text-sm text-slate-500
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-full file:border-0
//                     file:text-sm file:font-semibold
//                     file:bg-violet-50 file:text-violet-700
//                     hover:file:bg-violet-100"
//                     name="image"
//                     onChange={(e) => HandleImageChange(e)}
//                   />
//                   {imagePreview !== null ? (
//                     <div className="w-full max-h-[280px] mt-4 bg-gray-300 text-white p-4 rounded-lg overflow-hidden">
//                       <img
//                         src={imagePreview}
//                         className="w-full h-full object-cover"
//                         alt="Package Pics"
//                       />
//                     </div>
//                   ) : (
//                     <p className="mt-4 text-lg">
//                       No Image set for this Package
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="md:col-span-2">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block">Package Name :</label>
//                   <input
//                     required
//                     type="text"
//                     className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
//                     placeholder="Package Name"
//                     name="name"
//                     value={packages?.name}
//                     onChange={HandleInputChange}
//                   />
//                 </div>
//                 <div>
//                   <label className="block">Package Duration :</label>
//                   <input
//                     required
//                     type="text"
//                     className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
//                     placeholder="Package duration"
//                     name="duration"
//                     value={`${packages?.duration}`}
//                     onChange={HandleInputChange}
//                     disabled={true}
//                     readOnly={true}
//                   />
//                 </div>
//                 <div>
//                   <label className="block">Package Price :</label>
//                   <input
//                     required
//                     type="number"
//                     className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
//                     placeholder="Package Price"
//                     name="price"
//                     value={packages?.price}
//                     onChange={HandleInputChange}
//                   />
//                 </div>
//                 <div>
//                   <label className="block"> Package Difficulty : </label>
//                   <select
//                     className="w-full border border-gray-300 rounded-md py-2 px-3 bg-white focus:outline-none focus:border-orange-500"
//                     name="difficulty"
//                     value={select}
//                     onChange={HandleDropDown}
//                   >
//                     <option value="" className="bg-white">
//                       --Select Difficulty--
//                     </option>
//                     <option value="Easy" className="bg-white">
//                       Easy
//                     </option>
//                     <option value="Medium" className="bg-white">
//                       Medium
//                     </option>
//                     <option value="Hard" className="bg-white">
//                       Hard
//                     </option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block">Package Location :</label>
//                   <input
//                     required
//                     type="text"
//                     className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
//                     placeholder="Enter Location"
//                     name="location"
//                     value={packages?.location}
//                     onChange={HandleInputChange}
//                   />
//                 </div>
//                 <div>
//                   <label className="block">Package Max Group Size :</label>
//                   <input
//                     required
//                     type="number"
//                     className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
//                     placeholder="Enter maxGroupSize"
//                     name="maxGroupSize"
//                     value={packages?.maxGroupSize}
//                     onChange={HandleInputChange}
//                   />
//                 </div>

//                 <div className="col-span-2 text-black">
//                   <label className="block">Package Description :</label>
//                   <ReactQuill
//                     theme="snow"
//                     value={description}
//                     onChange={setDescription}
//                     modules={ProductForm.modules}
//                     formats={ProductForm.formats}
//                   />
//                 </div>
//                 <div className="col-span-2 text-black">
//                   <label className="block">Package Start and End dates :</label>
//                   <Datepicker
//                     value={dates}
//                     onChange={handleValueChange}
//                     primaryColor={"orange"}
//                     useRange={false}
//                     placeholder={"Start Date to End Date"}
//                     separator={"to"}
//                     inputClassName="w-full h-full px-3 border border-gray-400  rounded text-gray-500  bg-white  caret-orange-400 focus:border-orange-400  "
//                     containerClassName="relative h-9 w-full mb-3 "
//                     toggleClassName="absolute rounded-r-lg text-orange-400 right-0 px-3 focus:outline-none h-full "
//                     startFrom={new Date()}
//                     displayFormat={"DD/MM/YYYY"}
//                     popoverDirection="up"
//                     minDate={new Date()}
//                     showFooter={true}
//                   />
//                   <div className="mt-1">
//                     <button
//                       type="submit"
//                       className="font-normal px-4 py-2 border rounded-md cursor-pointer transition duration-300 bg-orange-500 text-white"
//                     >
//                       Add Date
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="my-4">
//                 <button
//                   type="submit"
//                   className="font-normal px-4 py-2 border rounded-md cursor-pointer transition duration-300 bg-orange-500 text-white"
//                 >
//                   Add Package
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// };

// ProductForm.modules = {
//   toolbar: [
//     [{ header: "1" }, { header: "2" }, { font: [] }],
//     [{ size: [] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [{ align: [] }],
//     [{ color: [] }, { background: [] }],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["clean"],
//   ],
// };
// ProductForm.formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "color",
//   "background",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "video",
//   "image",
//   "code-block",
//   "align",
// ];

// export default ProductForm;
