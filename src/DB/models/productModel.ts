import { Document, Schema, Types } from "mongoose";
import { ICategory } from "./categoryModel";
import { ISubCategory } from "./subCategoryModel";

interface IProduct extends Document {
  category: Types.ObjectId | ICategory;
  subcategory: Types.ObjectId | ISubCategory;
  name: string;
  description?: string;
  price: number;
  newPrice: number | null;
  rating: number;
  reviewsCount: number;
  images: string[];
}

export const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewsCount: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export type { IProduct };
