"use client"

import Header from "@/app/components/NavBar";
import RecipeDetails from "@/app/components/RecipeDetais";
import Link from "next/link";
import Footer from "../../components/Footer";



export default function Details() {

    return (

        <main className="min-h-screen bg-white">
            <Header />
            <div className="max-w-screen-xl mx-auto flex flex-wrap py-6"> 
                <section className="w-full md:w-2/3 flex flex-col items-center px-3 ">
                    <RecipeDetails />
                </section> 
                <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
                    <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                        <p className="text-xl font-semibold pb-5">About Us</p>
                        <p className="pb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis est eu odio sagittis tristique. Vestibulum ut finibus leo. In hac habitasse platea dictumst.</p>
                        <Link href="/" className="w-full bg-gray-800 text-white font-bold text-sm uppercase rounded hover:bg-gray-700 flex items-center justify-center px-2 py-3 mt-4">
                            Get to know us
                        </Link>
                    </div>
                </aside>
            </div>
            <Footer />
        </main>
    )
}