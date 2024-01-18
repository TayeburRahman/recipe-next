"use client"
 
import labelsData from '/ingredients.json';


 
 
function SearchFiltering({ recipes, setSearch, setFilter, search}) {
    // const [recipes, setRecipes] = useState([]);
    // const [filteredRecipes, setFilteredRecipes] = useState([]);
 
 

    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await axios.get('http://localhost:6060/api/v1/recipe/');
    //       setRecipes(response.data);
    //       setLoading(false);
    //     } catch (error) {
    //       console.error('Error fetching data:', error.message);
    //       setError('Failed to fetch data');
    //       setLoading(false);
    //     }
    //   };

    //   fetchData();
    // }, []);


    // console.log('filteredRecipes', filteredRecipes, filterLabel)

    // useEffect(() => {
    //   // Filter recipes by label
    //   const filterByLabel = () => {
    //      if(filterLabel){
    //         const filtered = filterLabel
    //       ? recipes.filter((recipe) => recipe.label === filterLabel)
    //       : recipes;
    //     setFilteredRecipes(filtered);
    //      }
    //   };

    //   // Search recipes by name
    //   const searchByName = () => {
    //      if(searchTerm){
    //         const filtered = searchTerm
    //       ? recipes.filter((recipe) =>
    //           recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    //         )
    //       : recipes;
    //     setFilteredRecipes(filtered);
    //      }
    //   };

    //   filterByLabel();
    //   searchByName();
    // }, [filterLabel, searchTerm, recipes]);

 



    return (
        <div className="mx-auto mt-5 w-screen max-w-screen-md py-20 leading-6">
            <form>
                <div className="flex">
                    <label className="flex-shrink-0 z-10 inline-flex items-center text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 " for="category">
                        <select className="bg-transparent px-6 py-4 outline-none" name="category" id="category" onChange={(e) => setFilter(e.target.value)}>
                            <option className="cursor-pointer" value="">All</option>
                            {
                                labelsData?.map((data, idx) => (
                                    <option value={data.label} key={data.id}>{data.label}</option>
                                ))
                            }
                        </select>
                    </label>
                    <div className="relative w-full">

                        <input
                            id="search-dropdown"
                            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-gray-500 focus:border-gray-500 outline-none h-full"
                            placeholder="Search your recipe.."
                            required
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="absolute top-0 end-0 h-full text-white bg-gray-700 rounded-e-lg border border-gray-700 ps-5 pe-5 ">
                            <svg className="w-4 h-4 mt-5" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </form>

            {
                recipes.length > 0 && search  && (
                    <div className="mt-2 divide-y rounded-b-xl border px-4 shadow-lg sm:mr-32 sm:ml-28" >
                    {
                         recipes.map((recipe, idx) => (
                            <div className="cursor-pointer px-4 py-2 text-gray-600 hover:bg-gray-600 hover:text-white" onClick={e => setSearch(recipe?.name)}><span className="m-0 font-medium"> {recipe?.name}</span></div>
                        ))
                    }
                </div>
                )
            }

            
        </div>
    )
}

export default SearchFiltering
