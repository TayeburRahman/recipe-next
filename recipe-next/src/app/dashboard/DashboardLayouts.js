import Link from 'next/link'


function DashboardLayout({ children }) {
    return (
        <div>
            <header>
                <nav aria-label="menu nav" className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">

                    <div className="flex flex-wrap items-center">
                        <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
                            <a href="/" aria-label="Home">
                                <span className="text-xl pl-2"><i className="em em-grinning"></i></span>
                            </a>
                        </div>
                        <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
                            <span className="relative w-full">
                                <input aria-label="search" type="search" id="search" placeholder="Search" className="w-full bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal" />
                            </span>
                        </div>

                        <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
                            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                                <li className="flex-1 md:flex-none md:mr-3">
                                    <Link href="/" className="inline-block py-2 px-4 text-white no-underline" >Go Back Home</Link>
                                </li>
                                <li className="flex-1 md:flex-none md:mr-3">
                                    <div className="relative inline-block">
                                        <button className="drop-button text-white py-2 px-2"> <span className="pr-2"><i className="em em-robot_face"></i></span> Hi, User <svg className="h-3 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg></button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div> 
                </nav>
            </header>
            <main>
                <div className="flex flex-col md:flex-row">
                    <nav aria-label="alternative nav">
                        <div className="bg-gray-800 shadow-xl h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center">

                            <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
                                <ul className="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
                                    <li className="mr-3 flex-1">
                                        <Link href="/dashboard/home" className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                                            <i className="fas fa-tasks pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Dashboard</span>
                                        </Link>
                                    </li> 
                                    <li className="mr-3 flex-1">
                                        <Link href="/dashboard/managerecipe" className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-blue-600">
                                            <i className="fas fa-chart-area pr-0 md:pr-3 text-blue-600"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Manage Recipe</span>
                                        </Link>
                                    </li>
                                    <li className="mr-3 flex-1">
                                        <Link href="/dashboard/newrecipe" className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500">
                                            <i className="fa fa-wallet pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Add Recipe</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div> 
                        </div>
                    </nav>
                    <section className='w-full md:p-4 my-10'> {children} </section>

                </div>
            </main>

        </div>
    )
}

export default DashboardLayout
