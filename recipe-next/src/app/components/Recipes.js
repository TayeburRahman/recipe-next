import Link from "next/link";
import { FetchingApiError } from "../utils/exceptions";

function Recipes({recipes, loading, error}) {

    if (error) throw new FetchingApiError(error);
    if (loading) return  <div className="flex flex-col font-bold items-center h-72"> Loading..</div>

    if (!recipes.length) return  <div className="flex flex-col font-bold items-center h-72">Search result not found!</div> 
    
    return (
        <div className="max-w-screen-xl px-4 pb-20 mx-auto">  
                <div className="grid md:grid-cols-3 gap-4 "> 
                    {
                        recipes && recipes?.map((recipe, idx) => (
                            <div key={idx} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow  ">
                                <Link href={`/recipe/${recipe._id}`}>
                                    <img className="rounded-t-lg h-52 w-full"  src={`http://localhost:6060/${recipe.image}`} alt="" />
                                </Link>
                                <div className="p-5">
                                    <p className="text-sm font-bold  text-gray-700"> {recipe?.label}</p>
                                    <Link href={`/recipe/${recipe._id}`}>
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{recipe?.name}</h5>
                                    </Link>
                                    <p className="mb-3 font-normal text-gray-700 ">{recipe?.description.slice(0, 200)}..</p>
                                    <Link href={`/recipe/${recipe._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 ">
                                        Read more
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div> 

    </div>
    )
}

export default Recipes
