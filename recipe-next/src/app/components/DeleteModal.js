 
import axios from "axios";



const DeleteModal = ({ isOpenDelete, setOpenDelete, children, setStatus }) => { 

    // Handle the Delete operation
    const handleOnDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`http://localhost:6060/api/v1/recipe/delete/${children._id}`);

            if (response.status === 200) {
                alert("Successfully Delete Recipe!");
                // Close the Delete modal and reset file state
                setOpenDelete(false);
                setStatus((status) => !status);
            } else {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            // Handle any error during the Delete process
            console.error("Error:", error.message);
        }
    };

    // Render the Delete modal
    if (!isOpenDelete) return null;

    const handleOnClose = (e) => {
        if (e.target.id === "delete") setOpenDelete(false);
    };



    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
            id="delete"
            onClick={handleOnClose}
        >
            <div className="w-[600px] flex flex-col">

                <button className="text-white text-xl place-self-end"
                    onClick={e => setOpenDelete(false)}
                >X</button>

                <div className="bg-white p-5 rounded">

                    <h5 className="mb-2 font-bold  text-gray-900">Are you sure you want to delete the recipe?</h5>

                    <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
                        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={`http://localhost:6060/${children.image}`} alt="" />
                        <div class="flex flex-col justify-between p-4 leading-normal">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{children.name}</h5>
                            <p class="mb-2 font-bold tracking-tight text-gray-900">{children.label}</p>
                        </div>
                    </a>

                    <button type="button" class="mt-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 mb-2 outline-none" onClick={handleOnDelete}>Delete</button>

                </div>

            </div>
        </div>
    )
}

export default DeleteModal