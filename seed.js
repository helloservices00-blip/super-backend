import mongoose from "mongoose";
import dotenv from "dotenv";

import Module from "./models/Module.js";
import Shop from "./models/Shop.js";
import Category from "./models/Category.js";
import Subcategory from "./models/Subcategory.js";
import Vendor from "./models/Vendor.js";
import Product from "./models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error(err));

async function seed() {
  try {
    // Clear existing data
    await Module.deleteMany({});
    await Shop.deleteMany({});
    await Category.deleteMany({});
    await Subcategory.deleteMany({});
    await Vendor.deleteMany({});
    await Product.deleteMany({});

    // --------------------
    // MODULES
    // --------------------
    const restaurantsModule = await Module.create({ name: "Restaurants" });
    const groceryModule = await Module.create({ name: "Grocery" });

    // --------------------
    // SHOPS
    // --------------------
    const shopA = await Shop.create({ name: "Shop A", moduleId: restaurantsModule._id });
    const shopB = await Shop.create({ name: "Shop B", moduleId: groceryModule._id });

    // --------------------
    // CATEGORIES
    // --------------------
    const catFood = await Category.create({ name: "Food", shopId: shopA._id });
    const catVeg = await Category.create({ name: "Vegetables", shopId: shopB._id });

    // --------------------
    // SUBCATEGORIES
    // --------------------
    const subCatBiryani = await Subcategory.create({ name: "Biryani", categoryId: catFood._id });
    const subCatAtta = await Subcategory.create({ name: "Atta", categoryId: catVeg._id });

    // --------------------
    // VENDORS
    // --------------------
    const vendorX = await Vendor.create({ name: "Vendor X", description: "Tasty food" });
    const vendorY = await Vendor.create({ name: "Vendor Y", description: "Fresh grocery" });

    // --------------------
    // PRODUCTS
    // --------------------
    await Product.create([
      { name: "Chicken Biryani", price: 250, categoryId: catFood._id, vendorId: vendorX._id, description: "Delicious biryani" },
      { name: "Atta 5kg", price: 300, categoryId: catVeg._id, vendorId: vendorY._id, description: "Fresh wheat flour" },
    ]);

    console.log("Seeding completed!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Seeding error:", err);
    mongoose.disconnect();
  }
}

seed();
