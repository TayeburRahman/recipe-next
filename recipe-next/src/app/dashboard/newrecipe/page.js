"use client"

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import labelsData from '/ingredients.json';
 

 

export default function NewRecipe() {

    const [image, setFile] = useState(null)  
    const [errorImag, setErrorImg]= useState({message:""})


    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm() 

 
    const onSubmit = async (data) => {

        const ddd =''
        if(ddd) throw new FetchingApiError()
        
        if(!image){
            setErrorImg({message: "Image is required"})
            return;
        }
        setErrorImg({message:""})

        const formData={
            name: data.name,
            label: data.label,
            description: data.description,
        }  

        try {

            const response = await axios.post(
                "http://localhost:6060/api/v1/recipe/add_new",
                { formData, image },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                alert("Successfully create new Recipe!");
                // Handle successful response data if needed
                console.log(response.data); 
                setFile(null)
            } else {
                if(response.statusText !=="OK") throw new FetchingApiError()
            }

        } catch (error) {
            console.error('Error:', error.message);
            throw new Error('Network response was not ok');
        }
    }
         

    return (
        <div id="main" className="main-content flex-1 mt-12 mt-5 bg-gray-100">
            <div className=" rounded-tl-3xl mt-5 ">
                <div className=" bg-gradient-to-r to-gray-800 p-4 shadow text-2xl text-white">
                    <h1 className="font-bold pl-2">Add New</h1>
                </div>
            </div>
            <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
                    <div className="leading-loose">
                        <form className="p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(onSubmit)}>
                            <div className="">
                                <label className="block text-sm text-gray-600">Name</label>
                                <input className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" name="name" type="text" placeholder="Recipe Name" {...register("name", { required: "Recipe Name is required" })} />
                                 <p className="text-red-500">{errors.name?.message}</p>
                            </div>

                            <div className="mt-2">
                                <label className="block text-sm text-gray-600">Label</label>
                                <select className="w-full px-5 py-3 pe-4 text-gray-700 bg-gray-200 rounded" name="label" id="label"  
                                    defaultValue="Flour"
                                    {...register("label", { required: "Recipe Label is required" })}
                                >
 
                                    {
                                        labelsData && labelsData?.map((data, idx) => (
                                            <option key={data.id} value={data.label}>{data.label}</option>
                                        ))
                                    }
                                </select>

                                <p className="text-red-500">{errors.label?.message}</p>
                            </div>

                            <div className="mt-2">
                                <label className=" block text-sm text-gray-600" >Description</label>
                                <textarea className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" name="description" rows="6"  placeholder="Description.." {...register("description", { required: "Recipe Description is required" })} />

                              
                                    <p className="text-red-500">{errors.description?.message}</p>
                                 
                            </div>

                            <div className="">
                                <label className=" block text-sm text-gray-600" >Image</label>
                                <input className="w-full px-5  py-2 text-gray-700 bg-gray-200 rounded" type='file' name="avatar"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                  {errorImag && <p className="text-red-500">{errorImag?.message}</p>}
                            </div>

                            <div className="mt-6">
                                <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

