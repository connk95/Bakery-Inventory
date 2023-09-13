const express = require("express");
const router = express.Router();

// Require controller modules.
const food_controller = require("../controllers/foodController");
const ingredient_controller = require("../controllers/ingredientController");
const category_controller = require("../controllers/categoryController");

/// food ROUTES ///

// GET catalog home page.
router.get("/", food_controller.index);

// GET request for creating a food. NOTE This must come before routes that display food (uses id).
router.get("/food/create", food_controller.food_create_get);

// POST request for creating food.
router.post("/food/create", food_controller.food_create_post);

// GET request to delete food.
router.get("/food/:id/delete", food_controller.food_delete_get);

// POST request to delete food.
router.post("/food/:id/delete", food_controller.food_delete_post);

// GET request to update food.
router.get("/food/:id/update", food_controller.food_update_get);

// POST request to update food.
router.post("/food/:id/update", food_controller.food_update_post);

// GET request for one food.
router.get("/food/:id", food_controller.food_detail);

// GET request for list of all food items.
router.get("/foods", food_controller.food_list);

/// ingredient ROUTES ///

// GET request for creating ingredient. NOTE This must come before route for id (i.e. display ingredient).
router.get("/ingredient/create", ingredient_controller.ingredient_create_get);

// POST request for creating ingredient.
router.post("/ingredient/create", ingredient_controller.ingredient_create_post);

// GET request to delete ingredient.
router.get(
  "/ingredients/:id/delete",
  ingredient_controller.ingredient_delete_get
);

// POST request to delete ingredient.
router.post(
  "/ingredients/:id/delete",
  ingredient_controller.ingredient_delete_post
);

// GET request to update ingredient.
router.get(
  "/ingredients/:id/update",
  ingredient_controller.ingredient_update_get
);

// POST request to update ingredient.
router.post(
  "/ingredients/:id/update",
  ingredient_controller.ingredient_update_post
);

// GET request for one ingredient.
router.get("/ingredients/:id", ingredient_controller.ingredient_detail);

// GET request for list of all ingredients.
router.get("/ingredients", ingredient_controller.ingredient_list);

/// category ROUTES ///

// GET request for creating a category. NOTE This must come before route that displays category (uses id).
router.get("/category/create", category_controller.category_create_get);

//POST request for creating category.
router.post("/category/create", category_controller.category_create_post);

// GET request to delete category.
router.get("/category/:id/delete", category_controller.category_delete_get);

// POST request to delete category.
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET request to update category.
router.get("/category/:id/update", category_controller.category_update_get);

// POST request to update category.
router.post("/category/:id/update", category_controller.category_update_post);

// GET request for one category.
router.get("/category/:id", category_controller.category_detail);

// GET request for list of all category.
router.get("/categories", category_controller.category_list);

module.exports = router;
