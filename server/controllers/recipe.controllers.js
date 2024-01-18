 
const logTimeMiddleware = require("../middleware/logger");
const recipeModels = require("../models/recipe.models");







const addNewRecipe = async (req, res) => {
  try {
      const { name, label, description } = req.body.formData;

      let image = '';
      if (req.file) {
          image = req.file.path;
      }

      const time = logTimeMiddleware();

      console.log('hid', name, label, description, time);

      const result = await recipeModels.create({
          name: name,
          label: label,
          description: description,
          image: image,
          time: time,
      });

      return res.status(200).json({
          result,
          status: 'success',
          message: 'Recipe add success',
      });
  } catch (error) {
      return res.json({
          status: 'error',
          message: 'Server error: ' + error.message,
      });
  }
};


const getAllRecipe= async (req, res) => {
  try {
    const result = await recipeModels.find();
    return res.json({
      status: "success",
      message: "Recipe Found",
      recipe: result,
    });
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
};


const getRecipeDetails = async (req, res)=>{
  const {id}= req.params;
  console.log("result", id)
  try {
    const {id}= req.params;
    
    console.log("result", id)
    const result = await recipeModels.findById({_id: id});

    console.log(result)
    return res.json({
      status: "success",
      message: "Recipe Found",
      recipe: result,
    });
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
}


const updateRecipe = async (req, res) => {
  
  try {
    const { name, labile, description } = req.body?.updateData
    const { id } = req.params

    console.log(`updating ${ name, labile, description, id}`)

    const time = logTimeMiddleware();

    if (req.file) { 
      let image = ''
      if (req.file) {
        image = req.file.path
      }

      const result = await recipeModels.updateOne((
        { _id: id },
        { $set: { name, labile, description, image, time} }
      ));

      return res.status(200).json({
        Recipe: result,
        status: "success",
        message: "Recipe Update Success",
      });
    } 

    const result = await recipeModels.updateOne((
      { _id: id },
      { $set: { name, labile, description,time } }
    ));

    return res.status(200).json({
      Recipe: result,
      status: "success",
      message: "Recipe Update Success",
    });

  } catch (error) {
    return res.status(500).json({ status: "error", message: error })
  }
}

const deleteRecipe = async (req, res) => {
  try {
    const { deleteId } = req.params;

    
    const result = await recipeModels.deleteOne({ _id: deleteId });
    return res.status(200).json({
      result,
      status: "success",
      message: "recipe Delete Successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};



const findBySearchFilter  = async (req, res) => {
  const { label, search } = req.query;

  console.log("nn",label, search);

  let query = {};

  // Add label filter if provided
  if (label) {
    query.label = label;
  }

  // Add name search if provided
  if (search) {
    query.name = { $regex: search, $options: 'i' }; // Case-insensitive name search
  }

  try {
    const recipes = await recipeModels.find(query);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllRecipe,addNewRecipe, updateRecipe, deleteRecipe, getRecipeDetails, findBySearchFilter};
