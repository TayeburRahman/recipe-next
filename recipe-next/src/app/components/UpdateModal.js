"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { FetchingApiError } from "../utils/exceptions";
import labelsData from '/ingredients.json';



const formInit = {
  name: "",
  label: "",
  description: "",
}

const API_URL = "http://localhost:6060/api/v1/recipe/update/";

const UpdateModal = ({ isOpenUpdate, setOpenUpdate, children, setStatus }) => {
  const [updateData, setUpdateData] = useState(formInit);
  const [image, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Set initial data when children prop changes
  useEffect(() => {
    if (children) {
      setUpdateData({
        name: children.name,
        label: children.label,
        description: children.description,
      });
    }
  }, [children]);

  // Update preview image when the selected image changes
  useEffect(() => {
    if (image) {
      const imageURL = URL.createObjectURL(image);
      setPreviewImage(imageURL);
    } else {
      setPreviewImage(null);
    }
  }, [image]);

  // Handle the update operation
  const handleOnUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_URL}${children._id}`,
        { updateData, image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Successfully Update Recipe!");
        setOpenUpdate(false);
        setFile(null);
        // Trigger a status for update data 
        setStatus((status) => !status);
      } else {
        // Throw an error  message
        throw new FetchingApiError("Network response was not ok");
      }
    } catch (error) {
      // Handle any error during the update process
      console.error("Error:", error.message);
    }
  };

  // Render the update modal and close modal if clicks outside the content area
  if (!isOpenUpdate) return null;

  const handleOnClose = (e) => {
    e.target.id === "update" && setOpenUpdate(false);
  };



  return (
    <div className="fixed inset-0 modal-opacity backdrop-blur-sm flex justify-center items-center"
      id="update"
      onClick={handleOnClose}
    >
      <div className="w-[600px] flex flex-col">

        <button className="text-white text-xl place-self-end"
          onClick={e => setOpenUpdate(false)}
        >X</button>

        <div className="bg-white p-2 rounded">
          <div className="ps-10 pt-5 text-bold"><h2>Recipe ID: {children._id}</h2></div>

          <form className="pb-7 ps-10 pe-10 pt-5 " onSubmit={handleOnUpdate}>
            <div className="">
              <label className="block text-sm text-gray-600">Name</label>
              <input className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" name="name" type="text" required placeholder="Recipe Name"
                value={updateData.name}
                onChange={(e) => {
                  setUpdateData({
                    ...updateData,
                    name: e.target.value
                  });
                }}
                aria-label="Name" />
            </div>

            <div className="mt-2">
              <label className="block text-sm text-gray-600">Label</label>
              <select className="w-full px-5 py-2 pe-4 text-gray-700 bg-gray-200 rounded" name="category" id="category" required
                value={updateData.label}
                onChange={(e) => {
                  setUpdateData({
                    ...updateData,
                    label: e.target.value
                  });
                }}
              >
                {
                  labelsData && labelsData?.map((data, idx) => (
                    <option key={data.id} value={data.label}>{data.label}</option>
                  ))
                }
              </select>
            </div>

            <div className="mt-2">
              <label className=" block text-sm text-gray-600" >Description</label>
              <textarea className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" name="description" rows="4" required placeholder="Description.."
                value={updateData.description}
                onChange={(e) => {
                  setUpdateData({
                    ...updateData,
                    description: e.target.value
                  });
                }}
                aria-label="Description" />
            </div>

            <div className="">
              <label className=" block text-sm text-gray-600" >Image</label>
              <input className="w-full px-5  py-2 text-gray-700 bg-gray-200 rounded" type='file' name="avatar"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <div className="flex-shrink-0 w-20 h-10">
                <img className="w-full h-full rounded-sm"
                  src={previewImage ? previewImage : `http://localhost:6060/${children.image}`}
                  alt="" />
              </div>
            </div>

            <div className="mt-6">
              <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Update</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default UpdateModal