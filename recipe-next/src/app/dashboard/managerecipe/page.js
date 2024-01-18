"use client"

import DeleteModal from "@/app/components/DeleteModal";
import UpdateModal from "@/app/components/UpdateModal";
import axios from "axios";
import { useEffect, useState } from "react";




function ManageRecipe() {
    const [isOpenUpdate, setOpenUpdate] = useState(false);
    const [updateRecipe, setUpdateRecipe] = useState({});
    const [isOpenDelete, setOpenDelete] = useState(false);
    const [deleteRecipe, setDeleteRecipe] = useState({});

    const [recipes, setRecipes] = useState(null);
    const [error, setError] = useState(null); 
    const [status, setStatus]= useState(false)

    useEffect(() => {
      const fetchData = async () => {
        try { 
          const response = await axios.get('http://localhost:6060/api/v1/recipe/get_all');
          const result = response.data.recipe; 

          setRecipes(result);
          setError(null);
        } catch (error) {
          console.error('Error fetching data:', error.message);  
          setError('Failed to fetch data');
        }
      };
  
      // Call the fetchData function
      fetchData();
    }, [status]);


    const handleOnUpdate = (data)=>{
        setUpdateRecipe(data)
        setOpenUpdate(true)
    }

    const handleOnDelete = (data)=>{
        setDeleteRecipe(data)
        setOpenDelete(true)
    }


    return (
        <div id="main" className="main-content flex-1 mt-12 mt-5 bg-gray-100"> 
        <div className=" rounded-tl-3xl mt-5 ">
            <div className=" bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                <h1 className="font-bold pl-2">Manage Recipe</h1>
            </div>
        </div>
               <div className="w-full mt-8"> 
                    <div className="bg-white overflow-auto">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Recipe
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Label
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        latest at
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Update
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    recipes && recipes.map((recipe, idx) =>(
                                        <tr key={recipe._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-20 h-10">
                                                    <img className="w-full h-full rounded-sm"
                                                        src={`http://localhost:6060/${recipe.image}`}
                                                        alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                    {recipe.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{recipe.label}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                            {recipe?.time}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button
                                                className=" inset-0 bg-green-200  rounded-full inline-block px-3 py-1 font-semibold text-green-900"
                                                onClick={e => handleOnUpdate(recipe)}
                                                > 
                                                Edit
                                            </button>
                                            <UpdateModal isOpenUpdate= {isOpenUpdate} setOpenUpdate={setOpenUpdate} children={updateRecipe} setStatus={setStatus} />
                                        </td>
    
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button
                                                className=" inset-0 bg-red-300  rounded-full inline-block px-3 py-1 font-semibold text-green-900"
                                                onClick={e => handleOnDelete(recipe)}
                                                > 
                                               Delete
                                            </button>
                                            <DeleteModal isOpenDelete= {isOpenDelete} setOpenDelete={setOpenDelete} children={deleteRecipe} setStatus={setStatus} />
                                        </td>
                                    </tr> 
                                    ))
                                }
                                
                            </tbody>
                        </table>
                    </div> 
                </div>
        </div>
    )
}

export default ManageRecipe
