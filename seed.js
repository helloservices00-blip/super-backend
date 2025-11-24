// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";

import Module from "./models/Module.js";
import Shop from "./models/Shop.js";
import Category from "./models/Category.js";
import Subcategory from "./models/Subcategory.js";
import Product from "./models/Product.js";
import Vendor from "./models/Vendor.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error(err));

async function seedDatabase() {
  try {
    // Clean existing data
    await Module.deleteMany({});
    await Shop.deleteMany({});
    await Category.deleteMany({});
    await Subcategory.deleteMany({});
    await Product.deleteMany({});
    await Vendor.deleteMany({});

    console.log("Old data cleared");

    // 1️⃣ Modules
    const restaurantsModule = await Module.create({ name: "Restaurants" });
    const groceryModule = await Module.create({ name: "Grocery" });

    // 2️⃣ Shops
    const restaurantShop = await Shop.create({
      name: "A Restaurant",
      moduleId: restaurantsModule._id,
    });
    const groceryShop = await Shop.create({
      name: "A Grocery",
      moduleId: groceryModule._id,
    });

    // 3️⃣ Categories
    const vegCategory = await Category.create({
      name: "Veg",
      shopId: restaurantShop._id,
    });
    const nonVegCategory = await Category.create({
      name: "Non-Veg",
      shopId: restaurantShop._id,
    });
    const flourCategory = await Category.create({
      name: "Flour",
      shopId: groceryShop._id,
    });

    // 4️⃣ Subcategories
    const biryaniSub = await Subcategory.create({
      name: "Biryani",
      categoryId: nonVegCategory._id,
    });
    const oilSub = await Subcategory.create({
      name: "Cooking Oil",
      categoryId: flourCategory._id,
    });

    // 5️⃣ Vendors
    const vendorA = await Vendor.create({
      name: "Vendor A",
      description: "Main vendor",
    });

    // 6️⃣ Products
    await Product.create({
      name: "Chicken Biryani",
      price: 10,
      categoryId: nonVegCategory._id,
      vendorId: vendorA._id,
      description: "Delicious chicken biryani",
    });
    await Product.create({
      name: "Wheat Flour",
      price: 5,
      categoryId: flourCategory._id,
      vendorId: vendorA._id,
      description: "High-quality wheat flour",
    });

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDatabase();
