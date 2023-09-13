const Food = require("../models/food");
const Ingredient = require("../models/ingredient");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [numFoods, numIngredients, numCategories] = await Promise.all([
    Food.countDocuments({}).exec(),
    Ingredient.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Bakery Inventory",
    food_count: numFoods,
    ingredient_count: numIngredients,
    category_count: numCategories,
  });
});

// Display list of all foods.
exports.food_list = asyncHandler(async (req, res, next) => {
  const allFoods = await Food.find().sort({ name: 1 }).populate("name").exec();

  res.render("food_list", { title: "Food List", food_list: allFoods });
});

// Display detail page for a specific food.
exports.food_detail = asyncHandler(async (req, res, next) => {
  const [food, ingredients] = await Promise.all([
    Food.findById(req.params.id)
      .populate("category")
      .populate("ingredients")
      .exec(),
    Ingredient.find({ food: req.params.id }).populate("name").exec(),
  ]);

  if (food === null) {
    const err = new Error("Food not found");
    err.status = 404;
    return next(err);
  }

  res.render("food_detail", {
    title: food.name,
    food: food,
    ingredients: ingredients,
  });
});

// Display food create form on GET.
exports.food_create_get = asyncHandler(async (req, res, next) => {
  const [allIngredients, allCategories] = await Promise.all([
    Ingredient.find().exec(),
    Category.find().exec(),
  ]);

  res.render("food_form", {
    title: "Create Food",
    ingredients: allIngredients,
    categories: allCategories,
  });
});

// Handle food create on POST.
exports.food_create_post = [
  (req, res, next) => {
    if (!(req.body.ingredients instanceof Array)) {
      if (typeof req.body.ingredients === "undefined")
        req.body.ingredients = [];
      else req.body.ingredients = new Array(req.body.ingredients);
    }
    next();
  },

  body("name", "Name must not be empty.").trim().isLength({ min: 3 }).escape(),
  body("category.*").escape(),
  body("ingredients.*").escape(),
  body("price", "Price must not be empty.").trim().isInt().escape(),
  body("stock", "Stock must not be empty.").trim().isInt().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const food = new Food({
      name: req.body.name,
      category: req.body.category,
      ingredients: req.body.ingredient,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      const [allIngredients, allCategories] = await Promise.all([
        Ingredient.find().exec(),
        Category.find().exec(),
      ]);

      for (const ingredient of allIngredients) {
        if (food.ingredients.includes(ingredient._id)) {
          ingredient.checked = "true";
        }
      }

      res.render("food_form", {
        title: "Create Food",
        categories: allCategories,
        ingredients: allIngredients,
        food: food,
        errors: errors.array(),
      });
    } else {
      await food.save();
      res.redirect(food.url);
    }
  }),
];

// Display food delete form on GET.
exports.food_delete_get = asyncHandler(async (req, res, next) => {
  const food = await Food.findById(req.params.id).exec();

  if (food == null) {
    res.redirect("/catalog/foods");
  }

  console.log("test");
  console.log(food.name);

  res.render("food_delete", {
    title: "Delete Food",
    food: food,
  });
});

// Handle food delete on POST.
exports.food_delete_post = asyncHandler(async (req, res, next) => {
  await Food.findByIdAndRemove(req.body.foodid);
  res.redirect("/catalog/foods");
});

// Display food update form on GET.
exports.food_update_get = asyncHandler(async (req, res, next) => {
  const [food, allIngredients, category] = await Promise.all([
    Food.findById(req.params.id)
      .populate("ingredients")
      .populate("category")
      .exec(),
    Ingredient.find().exec(),
    Category.find().exec(),
  ]);

  if (food === null) {
    const err = new Error("Food not found");
    err.status = 404;
    return next(err);
  }

  for (const ingredient of allIngredients) {
    for (const food_i of food.ingredients) {
      if (ingredient._id.toString() === food_i._id.toString()) {
        ingredient.checked = "true";
      }
    }
  }

  res.render("food_form", {
    title: "Update Food",
    ingredients: allIngredients,
    category: category,
    food: food,
  });
});

// Handle food update on POST.
exports.food_update_post = [
  (req, res, next) => {
    if (!(req.body.ingredients instanceof Array)) {
      if (typeof req.body.ingredients === "undefined")
        req.body.ingredients = [];
      else req.body.ingredients = new Array(req.body.ingredients);
    }
    next();
  },

  body("name", "Name must not be empty.").trim().isLength({ min: 3 }).escape(),
  body("category.*").escape(),
  body("ingredients.*").escape(),
  body("price", "Price must not be empty.").trim().isInt().escape(),
  body("stock", "Stock must not be empty.").trim().isInt().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const food = new Food({
      name: req.body.name,
      category: req.body.category,
      ingredients: req.body.ingredient,
      price: req.body.price,
      stock: req.body.stock,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const [allIngredients, allCategories] = await Promise.all([
        Ingredient.find().exec(),
        Category.find().exec(),
      ]);

      for (const ingredient of allIngredients) {
        if (food.ingredients.indexOf(ingredient._id) > -1) {
          ingredient.checked = "true";
        }
      }

      res.render("food_form", {
        title: "Update Food",
        categories: allCategories,
        ingredients: allIngredients,
        food: food,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedFood = await Food.findByIdAndUpdate(req.params.id, food, {});
      res.redirect(updatedFood.url);
    }
  }),
];
