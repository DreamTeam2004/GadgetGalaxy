import mongoose from "mongoose";
import { ICategory, categorySchema } from "../models/categoryModel";
import { IProduct, productSchema } from "../models/productModel";
import { ISubCategory, subCategorySchema } from "../models/subCategoryModel";
import { IUser, userSchema } from "../models/userModel";

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

const UserModel: mongoose.Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

const CategoryModel: mongoose.Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", categorySchema);

const SubCategoryModel: mongoose.Model<ISubCategory> =
  mongoose.models.SubCategory ||
  mongoose.model<ISubCategory>("SubCategory", subCategorySchema);

const ProductModel: mongoose.Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export {
  connectMongoDB,
  UserModel,
  CategoryModel,
  SubCategoryModel,
  ProductModel,
};
