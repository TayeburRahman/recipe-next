const { addNewRecipe, updateRecipe, deleteRecipe, getAllRecipe, getRecipeDetails, findBySearchFilter} = require("../controllers/recipe.controllers");

const router = require("express").Router();
const upload = require("../middleware/uploadImage"); 

router.route("/add_new").post(
  upload.single("image"),
  addNewRecipe);

  router.route("/get_all").get(getAllRecipe);
  router.route("/get/:id").get(getRecipeDetails);


router.route("/update/:id").put( 
  upload.single("image"),
  updateRecipe);

router.route("/delete/:deleteId").delete(deleteRecipe);

router.route("/find").get(findBySearchFilter);


module.exports = router;
