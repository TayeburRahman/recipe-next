import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { FetchingApiError } from "../utils/exceptions";

function RecipeDetails({ }) {
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState({})
    const { slug } = useParams()
    const [errors, setErrors] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:6060/api/v1/recipe/get/${slug}`);
                const result = response.data.recipe;

                setRecipe(result);
                setErrors(null);
                setLoading(false);
                if (response.status !== 200) {
                    throw new FetchingApiError(`Failed to fetch data. Status: ${response.status}`)
                }
            } catch (error) {
                setErrors('Error fetching data:', error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (errors) return <div className=" text-red "> {errors}.</div>;
    if (loading) return <div className=" font-bold h-screen"> Loading..</div>;


    return (
        <Fragment>

            <article className="flex flex-col shadow my-4">
                <img src={`http://localhost:6060/${recipe?.image}`} />
                <div className="bg-white flex flex-col justify-start p-6">
                    <p className="text-blue-700 text-sm font-bold uppercase pb-4">{recipe?.label}</p>
                    <p className="text-3xl font-bold  pb-4">{recipe?.name}</p>
                    <p className="text-sm pb-3">  <a className="font-semibold  ">{recipe?.time}</a>
                    </p>
                    <p className="pb-6">{recipe?.description} </p>
                    <Link href="#" className="uppercase text-gray-800">Continue Reading <i className="fas fa-arrow-right"></i></Link>
                </div>
            </article>

        </Fragment>
    )
}

export default RecipeDetails
