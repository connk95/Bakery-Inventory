const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  stock: { type: Number, required: true },
});

// Virtual for ingredient url
IngredientSchema.virtual("url").get(function () {
  return `/catalog/ingredients/${this._id}`;
});

// Export model
module.exports = mongoose.model("Ingredient", IngredientSchema);
