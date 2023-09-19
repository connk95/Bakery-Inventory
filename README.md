# Bakery Inventory Project

Welcome to the Bakery Inventory project! This is a database using MongoDB which stores the ingredients and food items at your local bakery.

## Table of Contents

- [Features](https://github.com/connk95/Bakery-Inventory/blob/main/README.md#features)
- [Demo](https://github.com/connk95/Bakery-Inventory/blob/main/README.md#features)
- [Installation](https://github.com/connk95/Bakery-Inventory/blob/main/README.md#installation)
- [Code Description](https://github.com/connk95/Bakery-Inventory/blob/main/README.md#code-description)
- [Usage](https://github.com/connk95/Bakery-Inventory/blob/main/README.md#usage)
- [Contributing](https://github.com/connk95/Bakery-Inventory/blob/main/README.md#contributing)
- [License](https://github.com/connk95/Bakery-Inventory/blob/main/README.md#license)
- [Acknowledgements](https://github.com/connk95/Bakery-Inventory/blob/main/README.md#acknowledgements)

## Features

- Browse the Foods, Ingredients, and Category tabs.
- Add foods, ingredients, and categories to expand your bakery inventory.
- The food page displays a list of all ingredients used in the food, which links to the ingredient page, and information about stock and price.

## Demo

https://bakery-inventory-production.up.railway.app/catalog

## Installation

1. Clone this repository using the following command:

   ```
   git clone https://github.com/connk95/Bakery-Inventory.git
   ```

2. Navigate to the project directory:

   ```
   cd Bakery-Inventory
   ```

3. Run the app and view in your browser:
   ```
   npm start
   ```

## Code Description

[App.js](https://github.com/connk95/Bakery-Inventory/blob/main/app.js) - Includes the setup and middleware for the project.

[Models](https://github.com/connk95/Bakery-Inventory/tree/main/models) - Contains the three models for this inventory. The Food model includes a name, category (which links to the category model), ingredients (which links to an array of ingredients), price, and stock. The Category model includes a name. The Ingredient model includes a name and stock.

[Controllers](https://github.com/connk95/Bakery-Inventory/tree/main/controllers) - Contains the three controllers for this inventory. Each controller includes functions to display a list of each item in a model, a detail page for each item, and the ability to create, update, and delete each item.

[Routes](https://github.com/connk95/Bakery-Inventory/tree/main/routes) - Contains the routes for all pages in the project. Catalog.js contains all routes for functions defined in the controllers.

[Views](https://github.com/connk95/Bakery-Inventory/tree/main/views) - Contains the views for all routes of the project, and a static sidebar. Each of the foods, categories, and ingredients uses a list, detail, form, and delete view.

## Usage

1. Click on any of the "Foods", "Categories", or "Ingredients" buttons to view a list of all items in that model.
2. Click on an individual item to view its details.
3. From the detail page you can view any related items, delete, or update an item.
4. Click on "Create new..." to add an entry into any of the three models.
5. Keep in mind, you must add a category or an ingredient before you create a food item using that category or ingredient.

## Contributing

Contributions to this project are welcome! If you find any bugs or have ideas for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- This project was created by Connor Ketcheson.

If you have any questions or feedback, please don't hesitate to contact us.

---
