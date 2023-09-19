const Ingredient = require("../models/ingredient");
const Food = require("../models/food");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display list of all ingredients.
exports.ingredient_list = asyncHandler(async (req, res, next) => {
  const allIngredients = await Ingredient.find()
    .sort({ name: 1 })
    .populate("name")
    .exec();

  res.render("ingredient_list", {
    title: "Ingredient List",
    ingredient_list: allIngredients,
  });
});

// Display detail page for a specific ingredient.
exports.ingredient_detail = asyncHandler(async (req, res, next) => {
  const [ingredient, allFoodsWithIngredient] = await Promise.all([
    Ingredient.findById(req.params.id).populate("stock").exec(),
    Food.find({ ingredients: req.params.id }).populate("name").exec(),
  ]);

  if (ingredient === null) {
    const err = new Error("Ingredient not found");
    err.status = 404;
    return next(err);
  }

  res.render("ingredient_detail", {
    title: ingredient.name,
    ingredient: ingredient,
    ingredient_foods: allFoodsWithIngredient,
  });
});

// Display ingredient create form on GET.
exports.ingredient_create_get = (req, res, next) => {
  res.render("ingredient_form", { title: "Create Ingredient" });
};

// Handle ingredient create on POST.
exports.ingredient_create_post = [
  body("name").trim().isLength({ min: 3 }).escape(),
  body("stock")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Stock must be specified.")
    .isInt()
    .withMessage("Stock must be a number."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const ingredient = new Ingredient({
      name: req.body.name,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      res.render("ingredient_form", {
        title: "Create Ingredient",
        ingredient: ingredient,
        errors: errors.array(),
      });
      return;
    } else {
      await ingredient.save();
      res.redirect(ingredient.url);
    }
  }),
];

// Display ingredient delete form on GET.
exports.ingredient_delete_get = asyncHandler(async (req, res, next) => {
  const [ingredient, allFoodsWithIngredient] = await Promise.all([
    Ingredient.findById(req.params.id).exec(),
    Food.find({ ingredients: req.params.id }).exec(),
  ]);

  if (ingredient === null) {
    res.redirect("/catalog/ingredients");
  }

  res.render("ingredient_delete", {
    title: "Delete Ingredient",
    ingredient: ingredient,
    ingredient_foods: allFoodsWithIngredient,
  });
});

// Handle ingredient delete on POST.
exports.ingredient_delete_post = asyncHandler(async (req, res, next) => {
  const [ingredient, allFoodsWithIngredient] = await Promise.all([
    Ingredient.findById(req.params.id).exec(),
    Food.find({ ingredients: req.params.id }, "name").exec(),
  ]);

  if (allFoodsWithIngredient.length > 0) {
    res.render("ingredient_delete", {
      title: "Delete Ingredient",
      ingredient: ingredient,
      ingredient_foods: allFoodsWithIngredient,
    });
    return;
  } else {
    await Ingredient.findByIdAndRemove(req.body.ingredientid);
    res.redirect("/catalog/ingredients");
  }
});

// Display ingredient update form on GET.
exports.ingredient_update_get = asyncHandler(async (req, res, next) => {
  const ingredient = await Ingredient.findById(req.params.id).exec();

  if (ingredient === null) {
    const err = new Error("Ingredient not found");
    err.status = 404;
    return next(err);
  }

  res.render("ingredient_form", {
    title: "Update Ingredient",
  });
});

// Handle ingredient update on POST.
exports.ingredient_update_post = [
  body("name").trim().isLength({ min: 3 }).escape(),
  body("stock")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Stock must be specified.")
    .isInt()
    .withMessage("Stock must be a number."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const ingredient = new Ingredient({
      name: req.body.name,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      res.render("ingredient_form", {
        title: "Update Ingredient",
        ingredient: ingredient,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedIngredient = await Ingredient.findbyIdandUpdate(
        req.params.id,
        ingredient,
        {}
      );
      res.redirect(updatedIngredient.url);
    }
  }),
];
