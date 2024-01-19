// import ingredients from '../../ingredients.json'
"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/NavBar";
import Recipes from "./components/Recipes";
import SearchFiltering from "./components/SearchFiltering";


export default function Home() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recipes, setRecipes] = useState([])
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:6060/api/v1/recipe/find?label=${filter}&search=${search}`);
                setRecipes(response.data);

                setLoading(false);   

                if (response.status !== 200) {
                    setError(`Failed to fetch data. Status: ${response.status}`) 
                  }
                  setError()
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setError('Failed to fetch data');
                setLoading(false);
            }
        };
        fetchData()
    }, [search, filter])



    return (
        <main className="min-h-screen bg-white">
            <Header />
            <section className="">
                <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl "> At the Lebanese table,  <br /> we invite you to share everything.</h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl"> And always unique. From our ancestral palate, we’re forging modern favorites with New York’s visionary energy. Enjoy traditional recipes and our contemporary approaches. Come feel close to home and a part of something new.</p>
                        <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                            <Link href="/menu" className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100">
                                    View on menu 
                            </Link>
                            <Link href="" className="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-gray-700  ">
                                Get more
                            </Link>
                        </div>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src="https://i.ibb.co/2M1Wpj6/blog-Post9.png" alt="hero image" />
                    </div>
                </div>
            </section>

            <section className="custom_class_se">
                <SearchFiltering recipes={recipes} setFilter={setFilter} setSearch={setSearch} search={search} filter={filter} />
                <Recipes recipes={recipes} loading={loading} error={error}/>
            </section>
            <Footer />
        </main>
    )
}
