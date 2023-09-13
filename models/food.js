const mongoose = require("mongoose");
const IngredientSchema = require("./ingredient");

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  price: { type: Number, required: true },
  stock: { type: Number },
});

// Virtual for food's url
FoodSchema.virtual("url").get(function () {
  return `/catalog/food/${this._id}`;
});

// Export model
module.exports = mongoose.model("Food", FoodSchema);
