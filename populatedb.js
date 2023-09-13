#! /usr/bin/env node

console.log(
  "This script populates some test food, categories, and ingredients to your database. Specified database as argument"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Food = require("./models/food");
const Ingredient = require("./models/ingredient");
const Category = require("./models/category");

const foodList = [];
const ingredientList = [];
const categoryList = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createIngredients();
  await createCategories();
  await createFoods();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// category[0] will always be the Cookie category, regardless of the order
// in which the elements of promise.all's argument complete.
async function createCatergory(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categoryList[index] = category;
  console.log(`Added category: ${name}`);
}

async function createIngredient(index, name, stock) {
  const ingredientdetail = {
    name: name,
  };
  if (stock != false) {
    ingredientdetail.stock = stock;
  } else {
    ingredientdetail.stock = 0;
  }

  const ingredient = new Ingredient(ingredientdetail);
  await ingredient.save();
  ingredientList[index] = ingredient;
  console.log(`Added ingredient: ${name}`);
}

async function createFood(index, name, category, ingredients, price, stock) {
  const fooddetail = {
    name: name,
    category: category,
    price: price,
  };
  if (stock != false) {
    fooddetail.stock = stock;
  } else {
    fooddetail.stock = 0;
  }
  if (ingredients != false) fooddetail.ingredients = ingredients;

  const food = new Food(fooddetail);
  await food.save();
  foodList[index] = food;
  console.log(`Added food: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    createCatergory(0, "Cookie"),
    createCatergory(1, "Muffin"),
    createCatergory(2, "Cake"),
  ]);
}

async function createIngredients() {
  console.log("Adding Ingredients");
  await Promise.all([
    createIngredient(0, "Sugar", 2),
    createIngredient(1, "Flour", 2),
    createIngredient(2, "Eggs", 12),
    createIngredient(3, "Butter", 1),
    createIngredient(4, "Chocolate", 1),
    createIngredient(5, "Baking Soda", 0.5),
    createIngredient(6, "Banana", 8),
  ]);
}

async function createFoods() {
  console.log("Adding Food");
  await Promise.all([
    createFood(
      0,
      "Chocolate Chip Cookie",
      categoryList[0],
      [
        ingredientList[0],
        ingredientList[1],
        ingredientList[2],
        ingredientList[3],
        ingredientList[4],
        ingredientList[5],
      ],
      200,
      0
    ),
    createFood(
      1,
      "Banana Chocolate Chip Muffin",
      categoryList[1],
      [
        ingredientList[0],
        ingredientList[1],
        ingredientList[2],
        ingredientList[3],
        ingredientList[4],
        ingredientList[5],
        ingredientList[6],
      ],
      400,
      0
    ),
    createFood(
      1,
      "Banana Bread",
      categoryList[2],
      [
        ingredientList[0],
        ingredientList[1],
        ingredientList[2],
        ingredientList[3],
        ingredientList[5],
        ingredientList[6],
      ],
      400,
      0
    ),
  ]);
}
